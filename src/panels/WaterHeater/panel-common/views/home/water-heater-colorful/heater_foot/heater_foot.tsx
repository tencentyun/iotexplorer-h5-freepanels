import React from 'react';
import './heater_foot.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Normal_Foot() {
  const stateSrc = (state: string) => {
    switch (state) {
      case 'standby':
        return '待机';
      case 'heating':
        return '加热';
      case 'warm':
        return '取暖';
      default:
        return '待机';
    }
  };
  return (
    <article id={'colorful_foot'} className={classNames('colorful_foot')}>
      <div className="foot_card">
        <div className="foot_size">
          <div id={'state-title'} className="state">
            <div className="state_span">
              <div className="span_top">{sdk.deviceData.water_left ? sdk.deviceData.water_left : 0}L</div>
              <div className="soan_foot">剩余水量</div>
            </div>
            <div className="state_span">
              <div className="span_top">{sdk.deviceData.work_state ? stateSrc(sdk.deviceData.work_state) : '待机'}</div>
              <div className="soan_foot">工作状态</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Normal_Foot;

