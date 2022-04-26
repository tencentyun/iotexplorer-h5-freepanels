/*
 * @Description: 烟雾报警器-表盘
 */
import React from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';

export interface DiskProps {
  deviceData: any;
}

export function Disk({
  deviceData,
}: DiskProps) {
  const bubbles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <div className={classNames('disk', { 'is-alarm': deviceData.smoke_sensor_state })}>
      <div className="content">
        <Icon className="disk-icon" name={deviceData.smoke_sensor_state ? 'smoke-alarm' : 'smoke'}></Icon>
        <div className="number">{deviceData.gas_sensor_value / 10 || 66.6}</div>
        <div className="unit">ppm</div>
      </div>
      {deviceData.smoke_sensor_state == 1 && <p className="status-desc">注意！检测到烟雾</p>}
      <ul className={classNames('bg-bubbles')}>
        {bubbles.map(value => (
          <li
            className={classNames(deviceData.smoke_sensor_state ? 'animation' : '')}
            key={value}
          >
            <span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
