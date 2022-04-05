import React, { useEffect, useState } from 'react';
import { onControlDevice } from '@hooks/useDeviceData';
import './content.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Content() {
  const [brightness, setBrightness] = useState(sdk.deviceData.brightness ? sdk.deviceData.brightness : 80);
  useEffect(() => {
    setBrightness(sdk.deviceData.brightness ? sdk.deviceData.brightness : 80);
  }, [sdk.deviceData.brightness]);

  const handleSelectColor = (e: React.MouseEvent) => {
    const wrap = document.getElementById('rotundity');
    const point = document.getElementById('rotundity-point');
    const wrap_y = document.getElementById('rotundity').getBoundingClientRect().y;
    let x = e.clientX - wrap.offsetLeft - point.clientWidth / 2;
    let y = e.clientY - wrap_y - document.body.offsetTop - point.clientHeight / 2;
    if (x < 0) x = 0;
    if (y < 0) y = 0;

    const cx = e.clientX - wrap.offsetLeft;
    const cy = e.clientY - wrap_y - document.body.offsetTop;
    const ox = wrap?.clientWidth / 2;
    const oy = wrap?.clientHeight / 2;
    const theta = Math.atan2(cy - oy, cx - ox) * 180 / Math.PI;
    let clr = calColor(theta);
    // console.log(clr);
    const cr = Math.sqrt((cx - ox) * (cx - ox) + (cy - oy) * (cy - oy));
    const r = cr / (wrap?.clientWidth / 2);
    const clr_r = parseInt(r * clr[0] + (1 - r) * 255);
    const clr_g = parseInt(r * clr[1] + (1 - r) * 255);
    const clr_b = parseInt(r * clr[2] + (1 - r) * 255);
    clr = [clr_r, clr_g, clr_b];
    const hsv = rgb2hsv(clr);
    onControlDevice('color_value', hsv);
    // console.log(clr);
    // document.body.style.backgroundColor = rgb(clr_r,clr_g,clr_b);

    const borderDiff = document.body.clientWidth / 1125.0 * 20;
    if (x > wrap?.clientWidth - point.clientWidth - borderDiff) x = wrap?.clientWidth - point.clientWidth - borderDiff;
    if (y > wrap?.clientHeight - point.clientHeight - borderDiff) y = wrap?.clientHeight - point.clientHeight - borderDiff;
    point.style.marginLeft = `${x}px`;
    point.style.marginTop = `${y}px`;
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
    <article id={'content'} className={classNames('content')}>
      <div id={'rotundity'} style={{ opacity: brightness / 100 }} className="rotundity" onClick={handleSelectColor}>
        <div
          id={'rotundity-point'}
          className={classNames('rotundity-point')}
        ></div>
      </div>
    </article>
  );
}

export default Content;
