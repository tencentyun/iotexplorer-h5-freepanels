import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './normal_progress_bar.less';
import classNames from 'classnames';

export function Normal_progress_bar() {
  const [dataUser] = useState(
    sdk.deviceData.battery_percentage ? sdk.deviceData.battery_percentage : 50
  );
  const lineArray = () => {
    let val = dataUser;
    let lines = [];
    for(let i=0;i<=40;i++){
      let styleName = '';
      if(i==20){
        styleName = 'normal-progress-bar-tick3';
      }
      else if(i%10==0){
        styleName = 'normal-progress-bar-tick2';
      }else{
        styleName = 'normal-progress-bar-tick1';
      }
      if(i*2.5<=val){
        lines.push({id:i,names:[styleName,'over-val']});
      }else{
        lines.push({id:i,names:[styleName]});
      }
    }

    return lines;
  }

  const renderLine = (item: LineProps, index: number) => {
    return (
      <div
      key={item.id}
        className={classNames(item.names)}
      ></div>
    )
  }

  // const [lampSrc] = useState(lampIcon);
  return (
        <article id={'normal-progress-bar'} className={classNames('normal-progress-bar')}>
          <div className="normal-progress-bar-font">
            <div className={classNames("normal-progress-bar-font1")}>0</div>
            <div className={classNames("normal-progress-bar-font1")}>25</div>
            <div className={classNames("normal-progress-bar-font1")}>50</div>
            <div className={classNames("normal-progress-bar-font1")}>75</div>
            <div className={classNames("normal-progress-bar-font1")}>100</div>
          </div>
          <div className="normal-progress-bar-tick">
            {lineArray().map(renderLine)}
          </div>
          <div className="normal-progress-bar-dot">
            电池电量
          </div>
        </article>
  );
};

export default Normal_progress_bar;

