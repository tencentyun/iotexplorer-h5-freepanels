/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-13 18:58:24
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import './device.less';
import classNames from 'classnames';
// import IconTheme from '@components/common/icon/icon-theme';
import { SvgIcon } from '@components/common/icon';
import { DeviceSateContext } from '../../../../deviceStateContext';
const airDeviceImg = 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/air-conditioner/air_device.bd91b10a.png';
const Device = () => {
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className="device-wrap">
          <img
            className={'icon-theme-air-conditioner'}
            src={airDeviceImg}
            alt=""
          />
          {deviceData.power_switch === 1 && <SvgIcon name="icon-air-cloud" />}
          <section className="content">
            <div className={classNames('text-primary')}>
              <span>
                {deviceData.temp_unit_convert === 'fahrenheit'
                  ? deviceData.temp_set_f || 0
                  : deviceData.temp_set || 0}
              </span>
              <i>&#176;</i>
              <span>C</span>
            </div>
            <div className="label">
              当前温度{' '}
              {deviceData.temp_unit_convert === 'fahrenheit'
                ? deviceData.temp_current_f || 0
                : deviceData.temp_current || 0}
              <i>&#176;</i>
              {deviceData.temp_unit_convert === 'fahrenheit' ? 'F' : 'C'}
            </div>
          </section>
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
};

Device.propTypes = {};

export default Device;
