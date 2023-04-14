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
      <div className="hoz"></div>
      <div className="ver"></div>
      <div className="center">
        <div className="content">
          <div className="item">
            <div className="item-content">
              <div className="number">{deviceData?.temperature?.current || 0}</div>
              <div className="unit-1">c</div>
            </div>
            <div className="title">环境温度</div>
          </div>
          <div className="item">
            <div className="item-content">
              <div className="number">{deviceData?.humidity?.current || 0}</div>
              <div className="unit-2">%</div>
            </div>
            <div className="title">环境湿度</div>
          </div>
        </div>
      </div>
      {/* <div className="content-wrap">
        <div className="content">
          <Icon name="body"/>
        </div>
        <p className={classNames('status-desc', { 'status-active': deviceData.motionAlarm_state == 1 })}>
          {deviceData.motionAlarm_state == 1 ? '检测有人移动' : '检测正常'}
        </p>
      </div> */}
    </div>
  );
}
