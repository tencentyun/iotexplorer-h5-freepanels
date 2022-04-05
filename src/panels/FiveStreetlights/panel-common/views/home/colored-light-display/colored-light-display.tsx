import React, { useEffect, useState } from 'react';
import { onControlDevice } from '@hooks/useDeviceData';
import './colored-light-display.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { rgb } from 'd3';
import { LampSvg } from '@components/common/lampsvg';

export function ColoredLightDisplay() {
  const [color_temp, setColorTemp] = useState(7000);
  const [lamp_color, setLampColor] = useState(rgb(240, 67, 61, (color_temp - 2000) / (7000 - 2000))); // useState('#E9433D');
  const [brightness, setBrightness] = useState(sdk.deviceData.brightness ? sdk.deviceData.brightness : 80);

  useEffect(() => {
    setBrightness(sdk.deviceData.brightness);
  }, [sdk.deviceData.brightness]);

  useEffect(() => {
    console.log(lamp_color);
    setColorTemp(sdk.deviceData.color_temp);
    console.log(lamp_color.opacity);
    const temp_r = (sdk.deviceData.color_temp - 2000) / (7000 - 2000);
    setLampColor(rgb(lamp_color.r, lamp_color.g, lamp_color.b, temp_r));
  }, [sdk.deviceData.color_temp]);

  const moveDisplayDot = (clientX, clientY, endTouch) => {
    const wrap = document.getElementById('colored-light-display-content');
    const point = document.getElementById('colored-light-display-dot');
    const wrap_y = document.getElementById('colored-light-display-content').getBoundingClientRect().y;
    let x = clientX - wrap.offsetLeft - point.clientWidth / 2;
    let y = clientY - wrap_y - document.body.offsetTop - point.clientHeight / 2;
    if (x < 0) x = 0;
    if (y < 0) y = 0;

    const cx = clientX - wrap.offsetLeft;
    const cy = clientY - wrap_y - document.body.offsetTop;
    const ox = wrap?.clientWidth / 2;
    const oy = wrap?.clientHeight / 2;

    const theta = Math.atan2(cy - oy, cx - ox);
    const borderDiff = document.body.clientWidth / 1125.0 * 10;
    // x = Math.cos(theta) * (wrap?.clientWidth - point.clientWidth + borderDiff);
    // y = Math.sin(theta) * (wrap?.clientWidth - point.clientWidth + borderDiff);
    x = Math.cos(theta) * (wrap?.clientWidth / 2 - point.clientWidth / 2) + ox - point.clientWidth / 2 - borderDiff;
    y = Math.sin(theta) * (wrap?.clientWidth / 2 - point.clientWidth / 2) - oy + borderDiff;

    let clr = calColor(theta * 180 / Math.PI);
    setLampColor(rgb(clr[0], clr[1], clr[2], (color_temp - 2000) / (7000 - 2000)));
    // console.log(clr);
    const r = 1;
    const clr_r = parseInt(r * clr[0] + (1 - r) * 255);
    const clr_g = parseInt(r * clr[1] + (1 - r) * 255);
    const clr_b = parseInt(r * clr[2] + (1 - r) * 255);
    clr = [clr_r, clr_g, clr_b];
    if (endTouch) {
      const hsv = rgb2hsv(clr);
      onControlDevice('color_value', hsv);
    }
    // console.log(clr);
    // document.body.style.backgroundColor = rgb(clr_r,clr_g,clr_b);

    // let borderDiff = document.body.clientWidth/1125.0*20;
    // if (x > wrap?.clientWidth - point.clientWidth-borderDiff)
    //   x = wrap?.clientWidth - point.clientWidth-borderDiff;
    // if (y > wrap?.clientHeight - point.clientHeight-borderDiff)
    //   y = wrap?.clientHeight - point.clientHeight-borderDiff;
    point.style.marginLeft = `${x}px`;
    point.style.marginTop = `${y}px`;
  };

  const handleSelectColor = (e: React.MouseEvent) => {
    moveDisplayDot(e.clientX, e.clientY, true);
  };

  const handleMoveColor = function (e: React.MouseEvent) {
    moveDisplayDot(e.changedTouches[0].clientX, e.changedTouches[0].clientY, false);
  };

  const handleEndMoveColor = function (e: React.MouseEvent) {
    moveDisplayDot(e.changedTouches[0].clientX, e.changedTouches[0].clientY, true);
  };

  const rgb2hsv = (arr) => {
    let h = 0; let s = 0; let v = 0;
    const r = arr[0]; const g = arr[1]; const b = arr[2];
    arr.sort((a, b) => a - b);
    const max = arr[2];
    const min = arr[0];
    v = max / 255;
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - (min / max);
    }
    if (max === min) {
      h = 0;
    } else if (max === r && g >= b) {
      h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
      h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
      h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
      h = 60 * ((r - g) / (max - min)) + 240;
    }
    h = parseInt(h);
    s = parseInt(s * 100);
    v = parseInt(v * 100);
    return [h, s, v];
  };

  const calColor = (theta) => {
    // console.log(theta);
    // #493cfb,     #76ec85,      #EBE551,     #fc3c49,      #eb3cc6
    // 73,60,251=>90  118,236,133    235,229,81    252,60,73   235,60,198
    // 235,60,198, 73,60,251=>90  118,236,133    235,229,81    252,60,73
    const arr = [[-90 - 72, 235, 60, 198], [-90, 73, 60, 251], [-90 + 72, 118, 236, 133], [-90 + 72 * 2, 235, 229, 81], [-90 + 72 * 3, 252, 60, 73]];
    let r; let g; let b;
    for (let i = 0; i < arr.length - 1; i++) {
      if (theta >= arr[i][0] && theta <= arr[i + 1][0]) {
        const rdiff = (theta - arr[i][0]) / (arr[i + 1][0] - arr[i][0]);
        r = rdiff * (arr[i + 1][1] - arr[i][1]) + arr[i][1];
        g = rdiff * (arr[i + 1][2] - arr[i][2]) + arr[i][2];
        b = rdiff * (arr[i + 1][3] - arr[i][3]) + arr[i][3];
        return [r, g, b];
      }
    }

    if (theta < 0) theta += 360;
    const colorA = arr[arr.length - 1];
    const colorB = arr[0];
    colorB[0] += 360;
    const rdiff = (theta - colorA[0]) / (colorB[0] - colorA[0]);
    r = rdiff * (colorB[1] - colorA[1]) + colorA[1];
    g = rdiff * (colorB[2] - colorA[2]) + colorA[2];
    b = rdiff * (colorB[3] - colorA[3]) + colorA[3];
    return [r, g, b];
  };
  return (
    <article id={'colored-light-display-wrap'} className={classNames('colored-light-display-wrap')}>
      <div id={'colored-light-display-content'} className={classNames('colored-light-display-content')}
           onClick={handleSelectColor} onTouchMove={handleMoveColor} onTouchEnd={handleEndMoveColor}>
        <div className="rotundity">
          {/* <SvgIcon name={'icon-five-bw-bulb-'+themeType+'2'} color="#000000" width={189.38} height={340.91}/> */}
          <LampSvg color={lamp_color} opacity={brightness / 100}/>
        </div>
        <div id={'colored-light-display-dot'} className={classNames('colored-light-display-dot')}></div>
      </div>
    </article>
  );
}
