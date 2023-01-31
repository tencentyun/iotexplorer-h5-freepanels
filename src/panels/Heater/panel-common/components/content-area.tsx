import React from 'react';
import classNames from 'classnames';
import { DeviceContext } from '../deviceContext';
import './content-area.less';

export function ContentArea() {
  const enumWorkMode: any = {
    0: '智能模式',
    1: '自动模式',
    2: 'ECO模式',
    3: '舒适模式',
    4: '防霜冻模式',
    5: '手动模式',
  };

  const enumWorkState: any = {
    0: '待机',
    1: '加热中',
  };

  const enumGear: any = {
    0: '自动',
    1: '低档',
    2: '中档',
    3: '高档',
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <section
          className={classNames(
            'content-area',
            deviceData.power_switch == 1 ? '' : 'content-disable',
          )}
        >
          <div className="items">
            <div className="item">
              <div className="label">
                {deviceData.work_mode
                  ? enumWorkMode[deviceData.work_mode]
                  : '暂无数据'}
              </div>
              <div className="content">加热状态</div>
            </div>
            <div className="item">
              <div className="label">
                {deviceData.unit_convert === 1
                  ? deviceData.current_f_temp
                    ? deviceData.current_f_temp
                    : '0'
                  : deviceData.current_c_temp
                    ? deviceData.current_c_temp
                    : '0'}
                {!deviceData.unit_convert ? '°C' : '°F'}
              </div>
              <div className="content">当前温度</div>
            </div>
          </div>
          <div className="items">
            <div className="item">
              <div className="label">
                {deviceData.work_state
                  ? enumWorkState[deviceData.work_state]
                  : '暂无数据'}
              </div>
              <div className="content">工作状态</div>
            </div>
            <div className="item">
              <div className="label">
                {deviceData.heat_level
                  ? enumGear[deviceData.heat_level]
                  : '暂无数据'}
              </div>
              <div className="content">档位</div>
            </div>
          </div>
        </section>
      )}
    </DeviceContext.Consumer>
  );
}
