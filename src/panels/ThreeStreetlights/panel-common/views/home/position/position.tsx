import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import './position.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {onControlDevice} from '@hooks/useDeviceData';

export function Position() {
  const [curRatio, setCurRatio] = useState(0)
  useEffect(() => {
    let color = getColorValue(curRatio);
    let hsv = rgbToHsv(color);
    onControlDevice('color_value', hsv);
  }, [sdk.deviceData.work_mode])
  useEffect(() => {
    let color = getColorValue(curRatio);
    let hsv = rgbToHsv(color);
    onControlDevice('color_value', hsv);
  }, [sdk.deviceData.color_scene])

  const getColorValue = (x_ratio) => {
    setCurRatio(x_ratio);
    let s;
    if (sdk.deviceData.work_mode == 1) {
      // EDA656;FDFFFF;C3D3FB
      s = 'EDA656;FDFFFF;C3D3FB';
    } else {
      let color_id = sdk.deviceData.color_scene || 2;
      s = scene_color_arr[color_id - 1];
    }
    let c_arr = s.split(';');
    let n = c_arr.length;
    let p = 1.0 / (n - 1);
    let full_arr = [];
    for (let i = 0; i < c_arr.length; i++) {
      full_arr.push(color2RgbVal('#' + c_arr[i]));
    }
    console.log(full_arr);
    let index = Math.floor(x_ratio / p);
    let a = full_arr[index];
    let b = full_arr[index + 1];
    let p1 = (x_ratio / p - index);
    let p2 = (index + 1 - x_ratio / p);
    return [a[0] * p2 + b[0] * p1, a[1] * p2 + b[1] * p1, a[2] * p2 + b[2] * p1]
  }

  function rgbToHsv(arr) {
    var h = 0, s = 0, v = 0;
    var r = arr[0], g = arr[1], b = arr[2];
    arr.sort(function (a, b) {
      return a - b;
    })
    var max = arr[2]
    var min = arr[0];
    v = max / 255;
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - (min / max);
    }
    if (max === min) {
      h = 0;//事实上，max===min的时候，h无论为多少都无所谓
    } else if (max === r && g >= b) {
      h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
      h = 60 * ((g - b) / (max - min)) + 360
    } else if (max === g) {
      h = 60 * ((b - r) / (max - min)) + 120
    } else if (max === b) {
      h = 60 * ((r - g) / (max - min)) + 240
    }
    h = parseInt(h);
    s = parseInt(s * 100);
    v = parseInt(v * 100);
    return [h, s, v]
  }

  const handleSelectColor = (e: React.MouseEvent) => {
    let wrap = document.getElementById('position-wrap');
    let point = document.getElementById('position-point');
    let wrap_y = document.getElementById("position-wrap").getBoundingClientRect().y;
    let x = e.clientX - wrap.offsetLeft - point.clientWidth / 2;
    let y = e.clientY - wrap_y - document.body.offsetTop - point.clientHeight / 2;
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    let x_ratio = (e.clientX - wrap.offsetLeft) / wrap?.clientWidth;
    let color = getColorValue(x_ratio);
    // console.log(color);
    // let hsv = rgb2hsv(color);
    // console.log(hsv);
    let hsv = rgbToHsv(color);
    // console.log(hsv);
    // let newcolor = hsvToRgb(hsv);
    // console.log(newcolor);
    onControlDevice('color_value', hsv);

    let borderDiff = document.body.clientWidth / 1125.0 * 20;
    if (x > wrap?.clientWidth - point.clientWidth - borderDiff)
      x = wrap?.clientWidth - point.clientWidth - borderDiff;
    if (y > wrap?.clientHeight - point.clientHeight - borderDiff)
      y = wrap?.clientHeight - point.clientHeight - borderDiff;
    point.style.marginLeft = x + 'px';
    point.style.marginTop = y + 'px';
  };

  let scene_color_arr = [
    '8df363;152c0a',
    '152c0a;ec7daa;f4ed6a;87eef9;8573bb',
    'e95b45;f9dd76;3a59dc;63eefd',
    '8df1fb;4c78e2;f5ee71;e95d44',
    'c2eeff;88e0ff;cff2ff',
    '7299f4;1544f3;bcd1fc',
    'e17c55;f1e270;f6e1a5',
    'f6e1a5;416e26;8ae65b',
    'e34f36;f99f86;ec644e',
    '6f58f1;ea5af9;efadf9',
    '385de2;c4cb66;e44b33;d8ddf7',
    'ecde91;e9a8ad;f3dd8c;d3e4a4',
    '60814c;8194e8;9d51ae;cb6464',
    'f6ec7a;e878d5;baeedd',
    'f6dadd;ec7ff7;e05aea'
  ];
  const getLinearBackGroundColor = (s) => {
    let c_arr = s.split(';');
    let n = c_arr.length;
    let p = 100.0 / (n - 1);
    let full_arr = [];
    full_arr.push('#' + c_arr[0] + ' 0%');
    for (let i = 1; i < c_arr.length - 1; i++) {
      full_arr.push('#' + c_arr[i] + ' ' + (p * i) + '%');
    }
    full_arr.push('#' + c_arr[c_arr.length - 1] + ' 100%');
    return full_arr.join(',');
  }

  const getBackGroundImage = () => {
    let color_id = sdk.deviceData.color_scene || 2;

    let s = scene_color_arr[color_id - 1];
    let full_str = getLinearBackGroundColor(s);
    let bgcolor = 'linear-gradient(90deg, ' + full_str + ')';
    console.log(bgcolor);

    return bgcolor;
    // return 'linear-gradient(90deg, #FBFC7F 0%, #D8FC78 8%, #C3F3AC 20%, #93E3F0 34%, #7CB3F8 48%, #7A8CF6 61%, #C17ED6 72%, #BA81E9 83%, #EC685C 91%, #EFB447 100%)';
  }

  const color2RgbVal = function (c) {
    // 16进制颜色值的正则
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    var color = c.toLowerCase();
    if (reg.test(color)) {
      // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
        var colorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        color = colorNew;
      }
      // 处理六位的颜色值，转为RGB
      var colorChange = [];
      for (var i = 1; i < 7; i += 2) {
        colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
      }
      return colorChange;
    } else {
      return color;
    }
  };

  return (
    <div className='position_card'>
      <div
        id={'position-wrap'}
        className={classNames('position-wrap', sdk.deviceData.work_mode == 1 && 'white-light-mode')}
        style={{backgroundImage: getBackGroundImage()}}
        onClick={handleSelectColor}
      >
        <div></div>
        <div
          id={'position-point'}
          className={classNames('position-point')}
        ></div>
      </div>
    </div>
  );
}
