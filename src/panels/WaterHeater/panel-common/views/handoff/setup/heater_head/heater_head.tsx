import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './heater_head.less';
import classNames from 'classnames';

export function Setup_head() {
  const waterQualitySrc = (quality: string) => {
    switch (quality) {
      case 'good':
        return '优';
      case 'middle':
        return '中';
      case 'bad':
        return '差';
      default:
        return '-';
    }
  };
  return (
    <article id={'setup_head'} className={classNames('setup_head')}>
      <div className="top">
        <div className="top_span">
          <div className="top_num1">
            {sdk.deviceData.power_consumption ? sdk.deviceData.power_consumption : 0}kW-h
          </div>
          <div className="top_size">
            耗电量
          </div>
        </div>

        <div className="top_span">
          <div className="top_num">
            {sdk.deviceData.gas_consumption ? sdk.deviceData.gas_consumption : 0}
          </div>

          <div className="top_size">
            耗气量
          </div>
        </div>


        <div className="top_span">
          <div className="top_num">
            {sdk.deviceData.runtime_total ? sdk.deviceData.runtime_total : 0}
          </div>

          <div className="top_size">
            累积工作时间
          </div>
        </div>
      </div>

      <div className="foot">
        <div className="top_span">
          <div className="top_num">
            {sdk.deviceData.water_quality ? waterQualitySrc(sdk.deviceData.water_quality) : '-'}
          </div>

          <div className="top_size">
            水质
          </div>
        </div>

        <div className="top_span">
          <div className="top_num">
            {sdk.deviceData.water_flow ? sdk.deviceData.water_flow : 0}
          </div>

          <div className="top_size">
            水流量
          </div>
        </div>


        <div className="top_span">
          <div className="top_num">
            {sdk.deviceData.cur_voltage ? sdk.deviceData.cur_voltage : 0}V
          </div>

          <div className="top_size">
            当前电压
          </div>
        </div>
      </div>
    </article>
  );
}

export default Setup_head;

