import React from 'react';
import './heater_head.less'
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Normal_head() {
  const stateSrc = (state: String) => {
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
    <article id={'morandi_head'} className={classNames('morandi_head')}>
      <div className="img_span">
        <img className="head_img" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/water-heater/water-heater-img-normal.png" alt=""/>
      </div>

      <div className="head_font">
        <div className="top_size">
          {sdk.deviceData.temp_set ? sdk.deviceData.temp_set : 0}℃
        </div>
        <div className="foot_size">
          当前温度 {sdk.deviceData.temp_current ? sdk.deviceData.temp_current : 0}℃
        </div>
      </div>

      <div className="foot_size">
        <div className="state">
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
    </article>
  );
};

export default Normal_head;

