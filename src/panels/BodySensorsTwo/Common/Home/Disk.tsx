/*
 * @Description: 人体传感器-表盘
 */
import React from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';

export interface DiskProps {
  deviceData: any;
  doControlDeviceData: any;
}

export function Disk({
  deviceData,
}: DiskProps) {
  return (
    <div className="disk">
      <div className="content-wrap">
        <div className="content">
          <Icon name="body"/>
        </div>
        <p className={classNames('status-desc', { 'status-active': deviceData.pir_state == 1 })}>
          {deviceData.pir_state == 1 ? '检测有人移动' : '未检测到有人移动'}
        </p>
      </div>
    </div>
  );
}
