import React, {useState} from 'react';
import './scenario_progress_bar.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {onControlDevice} from '@hooks/useDeviceData';

export function Scenario_progress_bar() {
  const [styleFlag, onToggleStyleFlag] = useState(
    sdk.deviceData.scene ? sdk.deviceData.scene : 3
  );

  const lineArray = () => {
    let lines = [];
    for (let i = 1; i <= 40; i++) {
      if (i == 10 || i == 20 || i == 30) {
        lines.push({id: i, name: 'scenario-progress-bar-tick2'});
      } else {
        lines.push({id: i, name: 'scenario-progress-bar-tick1'});
      }
    }

    return lines;
  }

  const onSelectStyle = (flag: number) => {
    onToggleStyleFlag(flag);
    onControlDevice('scene', flag);
  }

  const renderLine = (item: LineProps, index: number) => {
    return (
      <div
        key={item.id}
        className={item.name}
      ></div>
    )
  }
  return (
    <article id={'scenario-progress-bar'} className={classNames('scenario-progress-bar')}>
      <div className="scenario-progress-bar-font">
        <div className={classNames("scenario-progress-bar-font1", styleFlag == 2 && "font_select" || "")}
             onClick={() => {
               onSelectStyle(2)
             }}>睡眠
        </div>
        <div className={classNames("scenario-progress-bar-font2", styleFlag == 3 && "font_select" || "")}
             onClick={() => {
               onSelectStyle(3)
             }}>休闲
        </div>
        <div className={classNames("scenario-progress-bar-font3", styleFlag == 4 && "font_select" || "")}
             onClick={() => {
               onSelectStyle(4)
             }}>柔和
        </div>
      </div>
      <div className="scenario-progress-bar-tick">
        {lineArray().map(renderLine)}
      </div>
      <div className="scenario-progress-bar-dot">
        <div className={classNames("scenario-progress-bar-font1")}>
          <div className={classNames(styleFlag == 2 && "dot_select" || "")}></div>
        </div>
        <div className={classNames("scenario-progress-bar-font2")}>
          <div className={classNames(styleFlag == 3 && "dot_select" || "")}></div>
        </div>
        <div className={classNames("scenario-progress-bar-font3")}>
          <div className={classNames(styleFlag == 4 && "dot_select" || "")}></div>
        </div>
      </div>
    </article>
  );
};
