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
        <p className={classNames('status-desc', { 'status-active': deviceData.motionAlarm_state == 1 })}>
          {deviceData.motionAlarm_state == 1 ? '检测有人移动' : '检测正常'}
        </p>
      </div>
    </div>
  );
}
