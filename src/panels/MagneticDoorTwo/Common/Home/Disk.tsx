/*
 * @Description: 门磁-表盘
 */
import React from 'react';
import classNames from 'classnames';
export interface DiskProps {
  deviceData: any;
  doControlDeviceData: any;
}

export function Disk({
  deviceData,
  doControlDeviceData
}: DiskProps) {

  return (
    <div className="disk">
      <div
        className={classNames('content-wrap', { 'is-open': deviceData.doorsensor_state })}
        onClick={()=>{
          doControlDeviceData('doorsensor_state', Number(!deviceData.doorsensor_state));
        }}>
        <div className="content">
          <div className="left-block"></div>
          <div className="right-block"></div>
        </div>
        <p className="status-desc">
          {deviceData.doorsensor_state ? '开启' : '关闭'}
        </p>
      </div>
    </div>
  );
}
