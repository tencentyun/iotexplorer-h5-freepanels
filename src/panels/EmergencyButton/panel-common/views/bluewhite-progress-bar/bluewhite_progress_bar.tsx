import React, { useState } from 'react';
import './bluewhite_progress_bar.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDidMount } from 'beautiful-react-hooks';
export function Bluewhite_progress_bar() {
  const [dataUser] = useState(sdk.deviceData.battery_percentage ? sdk.deviceData.battery_percentage : 90);
  // const onToggleSetVal = (e: React.MouseEvent) => {
  //   let val = dataUser;
  //   let wrap = document.getElementById('bluewhite-progress-bar-wrap');
  //   let slider = document.getElementById('bluewhite-progress-bar-slider');
  //   slider.style.width=(val*wrap.clientWidth/100.0)+'px';
  // };

  useDidMount(() => {
    const val = dataUser;
    const wrap = document.getElementById('bluewhite-progress-bar-wrap');
    const slider = document.getElementById('bluewhite-progress-bar-slider');
    if (slider && wrap) slider.style.width = `${(val * wrap.clientWidth) / 100.0}px`;
  });

  // const [lampSrc] = useState(lampIcon);
  return (
        <article id={'bluewhite-progress-bar'} className={classNames('bluewhite-progress-bar')}>
          <div className="bluewhite-progress-bar-font">
            <div className={classNames('bluewhite-progress-bar-font1')}>0</div>
            <div className={classNames('bluewhite-progress-bar-font1')}>25</div>
            <div className={classNames('bluewhite-progress-bar-font1')}>50</div>
            <div className={classNames('bluewhite-progress-bar-font1')}>75</div>
            <div className={classNames('bluewhite-progress-bar-font1')}>100</div>
          </div>
          <div id='bluewhite-progress-bar-wrap' className="bluewhite-progress-bar-wrap">
            <div id='bluewhite-progress-bar-slider' className="bluewhite-progress-bar-slider">
              <div className="bluewhite-progress-bar-dot">
              </div>
            </div>
          </div>
          <div className="bluewhite-progress-bar-text">
            电池电量
          </div>
        </article>
  );
}

export default Bluewhite_progress_bar;

