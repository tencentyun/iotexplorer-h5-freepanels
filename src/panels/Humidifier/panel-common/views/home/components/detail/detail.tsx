import React from 'react';
import classNames from 'classnames';
import { DeviceSateContext } from '../../../../deviceStateContext';
import { Power } from './components/power/power';
import SetTemp from './components/set-temp/set-temp';
import { setDomClassActive } from '@libs/utillib';
import './detail.less';

/**
 * 首页-详情盒子
 */
export function Detail() {
  return (
    <DeviceSateContext.Consumer>
      {({ deviceStatus, deviceData }) => (
        <article className={classNames('detail')}>
          {/*电源操作栏*/}
          <Power />
          {/*温度和湿度*/}
          <section className={classNames('environment')}>
            <div className={'environment-wrap'}>
              <div className={classNames('temperature')}>
                <strong
                  className={classNames(
                    'environment-value',
                    setDomClassActive(deviceStatus)
                  )}
                  aria-disabled
                >
                  {deviceData.current_temp || 0}{deviceData.temp_unit_convert === 1 ? '°F' : '°C'}
                </strong>
                <div className='environment-label'>环境温度</div>
              </div>
              <span className="line" />
              <div className={classNames('humidity')}>
                <strong
                  className={classNames(
                    'environment-value',
                    setDomClassActive(deviceStatus)
                  )}
                >
                  {deviceData.current_humidity || 0}%
                </strong>
                <div className='environment-label'>环境湿度</div>
              </div>
            </div>
          </section>
          {/*温度设置*/}
          <SetTemp />
          {/*地理信息部分*/}
          <div className={classNames('position-wrap', 'text-align-center')}>
            <ul className={classNames('flex', 'space-between')}>
              <li>
                <strong
                  className={classNames(
                    setDomClassActive(deviceStatus)
                  )}
                >
                  {deviceData.eco2 || 0}ppm
                </strong>
                <span className='label'>eCO2</span>
              </li>
              <li>
                <strong
                  className={classNames(
                    setDomClassActive(deviceStatus)
                  )}
                >
                  {deviceData.pm25 || 0}
                </strong>
                <span className='label'>PM2.5</span>
              </li>
              <li>
                <strong
                  className={classNames(
                    setDomClassActive(deviceStatus)
                  )}
                >
                  {deviceData.tvoc || 0}ppm
                </strong>
                <span className='label'>TVOC</span>
              </li>
            </ul>
          </div>
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
