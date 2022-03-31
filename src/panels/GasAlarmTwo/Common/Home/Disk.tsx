/*
 * @Description: 燃气报警器-表盘
 */
import React from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';

export interface DiskProps {
  deviceData: any;
}

export function Disk({
  deviceData
}: DiskProps) {

  return (
    <div className={classNames('disk', { 'is-alarm': deviceData.gas_sensor_state })}>
      <div className="content">
        <Icon className="disk-icon" name={deviceData.gas_sensor_state ? 'gas-alarm' : 'gas'}></Icon>
        <div className="number">
          {deviceData.gas_sensor_value / 10 || 66.6}%
        </div>
      </div>
      {deviceData.gas_sensor_state && <p className="status-desc">注意！检测到燃起报警</p>}
      <div className={classNames('pulse', 'pulse1', deviceData.gas_sensor_state ? 'pulseAnimation' : '')}></div>
      <div className={classNames('pulse', 'pulse2', deviceData.gas_sensor_state ? 'pulseAnimation' : '')}></div>
      <div className={classNames('pulse', 'pulse3', deviceData.gas_sensor_state ? 'pulseAnimation' : '')}></div>
    </div>
  );
}
