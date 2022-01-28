import React, {useEffect, useState} from 'react';
import {onControlDevice} from '@hooks/useDeviceData';
import './white-light-display.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {LampSvg} from '@components/common/lampsvg';
import {rgb} from 'd3';
import { hsv2rgb, rgb2hsv } from '@libs/utillib';

export function WhiteLightDisplay() {
  const [lamp_color, setLampColor] = useState(hsv2rgb(sdk.deviceData.color_value?sdk.deviceData.color_value : [31,62,93]));
  const [brightness, setBrightness] = useState(sdk.deviceData.brightness ? sdk.deviceData.brightness : 80);

  useEffect(() => {
    setBrightness(sdk.deviceData.brightness);
  }, [sdk.deviceData.brightness])

  const moveDisplayDot = (clientX, clientY, endTouch) => {
    let wrap = document.getElementById('white-light-content');
    let point = document.getElementById('white-light-display-dot');
    let wrap_y = document.getElementById("white-light-content").getBoundingClientRect().y;
    let x = clientX - wrap.offsetLeft - point.clientWidth / 2;
    let y = clientY - wrap_y - document.body.offsetTop - point.clientHeight / 2;
    if (x < 0) x = 0;
    if (y < 0) y = 0;

    let cx = clientX - wrap.offsetLeft;
    let cy = clientY - wrap_y - document.body.offsetTop;
    // console.log(cx)
    // console.log(cy)
    let ox = wrap?.clientWidth / 2;
    let oy = wrap?.clientHeight / 2;
    // console.log(ox)
    // console.log(oy)
    let theta = Math.atan2(cy - oy, cx - ox);
    // console.log(theta*180/Math.PI)
    let borderDiff = document.body.clientWidth / 1125.0 * 10;
    // x = Math.cos(theta) * (wrap?.clientWidth - point.clientWidth + borderDiff);
    // y = Math.sin(theta) * (wrap?.clientWidth - point.clientWidth + borderDiff);
    x = Math.cos(theta) * (wrap?.clientWidth/2 - point.clientWidth/2) + ox - point.clientWidth/2 - borderDiff;
    y = Math.sin(theta) * (wrap?.clientWidth/2 - point.clientWidth/2) - oy + borderDiff;
    // console.log(x)
    // console.log(y)

    let clr = calColor(theta * 180 / Math.PI);
    setLampColor(rgb(clr[0], clr[1], clr[2]));
    // console.log(clr)
    // document.body.style.backgroundColor = rgb(clr[0],clr[1],clr[2]);
    // console.log(clr);
    let hsv = rgb2hsv(clr);
    if(endTouch){
      onControlDevice('color_value', hsv);
    }
    // let borderDiff = document.body.clientWidth/1125.0*20;
    // if (x > wrap?.clientWidth - point.clientWidth-borderDiff)
    //   x = wrap?.clientWidth - point.clientWidth-borderDiff;
    // if (y > wrap?.clientHeight - point.clientHeight-borderDiff)
    //   y = wrap?.clientHeight - point.clientHeight-borderDiff;
    point.style.marginLeft = x + 'px';
    point.style.marginTop = y + 'px';
    // console.log(y);
  }

  const toggleClick = (e: React.MouseEvent) => {
    moveDisplayDot(e.clientX, e.clientY, true);
  }

  const calColor = (theta) => {
    // console.log(theta);
    // #493cfb,     #76ec85,      #EBE551,     #fc3c49,      #eb3cc6
    // 73,60,251=>90  118,236,133    235,229,81    252,60,73   235,60,198
    // 235,60,198, 73,60,251=>90  118,236,133    235,229,81    252,60,73

    // #EDA656 0%,     #FFFFFF 50%,      #C3D3FB 100%
    // 237,166,86     255,255,255        195,211,251
    let c1 = [237, 166, 86];
    let c2 = [255, 255, 255];
    let c3 = [195, 211, 251];
    let p, x, y;
    // console.log(theta);
    if (theta >= -180 && theta <= -90) {
      x = c1;
      y = c2;
      p = (theta + 180) / 90.0;
    } else if (theta >= 90 && theta <= 180) {
      x = c2;
      y = c1;
      p = (theta - 90) / 90.0;
    } else if (theta >= -90 && theta <= 0) {
      x = c2;
      y = c3;
      p = (theta + 90) / 90.0;
    } else { //if(theta>=0&&theta<=90)
      x = c3;
      y = c2;
      p = theta / 90.0;
    }
    // console.log(p);
    // console.log(x);
    // console.log(y);
    let r = (1 - p) * x[0] + p * y[0];
    let g = (1 - p) * x[1] + p * y[1];
    let b = (1 - p) * x[2] + p * y[2];

    return [r, g, b];
  }

  const handleMoveColor = function (e: React.MouseEvent){
    moveDisplayDot(e.changedTouches[0].clientX, e.changedTouches[0].clientY, false);
  }

  const handleEndMoveColor = function (e: React.MouseEvent){
    moveDisplayDot(e.changedTouches[0].clientX, e.changedTouches[0].clientY, true);
  }
  return (
    <article id={'white-light-wrap'} className={classNames('white-light-wrap')}>
      <div id={'white-light-content'} className={classNames('white-light-content')} onClick={toggleClick} onTouchMove={handleMoveColor} onTouchEnd={handleEndMoveColor}>
        <div className="color_circles">
          <LampSvg color={lamp_color} opacity={brightness / 100}/>
        </div>
        <div id={'white-light-display-dot'} className={classNames('white-light-display-dot')}></div>
      </div>
    </article>
  );
};
