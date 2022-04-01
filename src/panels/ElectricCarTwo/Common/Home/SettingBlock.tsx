/*
 * @Description: 首页-设置按钮
 */
import React from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';

export interface SettingBlockProps {
  deviceData?: any;
  doControlDeviceData: (id, value) => any;
}

export function SettingBlock({
  deviceData,
  doControlDeviceData,
}: SettingBlockProps) {
  // 报警
  const handleAlarm = () => {
    doControlDeviceData('alert_status', Number(!deviceData.alert_status));
  };

  // 静音
  const handleMute = () => {
    doControlDeviceData('search', deviceData.search !== 'sound' ? 'sound' : '');
  };

  return (
    <div className="setting-block">
      <div
        className={classNames(
          'setting-button',
          deviceData.bluetooth === 1 ? 'active' : '',
        )}
        onClick={() => {
          doControlDeviceData('bluetooth', Number(!deviceData.bluetooth));
        }}>
        <Icon
          name="bluetooth"
        />
        <p className="button-name">蓝牙未连接</p>
      </div>
      <div
        className={classNames(
          'setting-button',
          deviceData.alert_status === 1 ? 'active' : '',
        )}
        onClick={handleAlarm}
      >
        <Icon
          name={deviceData.alert_status === 1 ? 'alarm-selected' : 'alarm'}
        />
        <p className="button-name">
          {deviceData.alert_status === 1 ? '报警已开' : '报警未开'}
        </p>
      </div>
      <div
        className={classNames(
          'setting-button',
          deviceData.search === 'sound' ? 'active' : '',
        )}
        onClick={handleMute}
      >
        <Icon
          name={deviceData.search === 'sound' ? 'mute-selected' : 'mute'}
        />
        <p className="button-name">
          {deviceData.search !== 'sound' ? '鸣笛寻车' : '鸣笛中'}
        </p>
      </div>
    </div>
  );
}
