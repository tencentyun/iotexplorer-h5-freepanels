/*
 * @Description: 首页
 */

import React from 'react';
import classNames from 'classnames';
import {
  StandardBleConnectStatusStr,
  StandardBleConnectStatus,
  useStandardBleConnector
} from '../../../../hooks/useStandardBleConnector';
import { SvgIcon } from '../components/common';
import { Block } from '../components/layout';
// import { useHistory } from 'react-router-dom';
// import { Cell } from '@/components/base';
import { HeaderBlock } from '../components/header-block';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

// @ts-ignore
import Lock from '../assets/images/electric-car/lock.svg';
// @ts-ignore
import Unlock from '../assets/images/electric-car/unlock.svg';

const buttonProps = {
  width: 295,
  height: 300
};

export function Home() {
  // 连接蓝牙
  const [
    connectStatusInfo,
    { connectDevice }
  ] = useStandardBleConnector({
    deviceId: sdk.deviceId,
    familyId: sdk.familyId
  });

  // useEffect(() => {
  //   if (connectStatusInfo.status === StandardBleConnectStatus.CONNECTED) {
  //     // 模拟设置电量，上线前删掉
  //     controlDevice({
  //       deviceData: {
  //         battery_value: Math.floor(Math.random() * 100)
  //       }
  //     });
  //   }
  // }, [connectStatusInfo]);

  const onControlDevice = (id: string, value: any) => {
    if (connectStatusInfo.status !== StandardBleConnectStatus.CONNECTED) {
      sdk.tips.show('请先点击蓝牙按钮 与设备建立连接');
      return;
    }

    console.log(id, value);
    sdk.controlDeviceData({ [id]: value });
  };

  // 处理开锁/关锁
  const handleLock = () => {
    onControlDevice('lock_switch', Number(!sdk.deviceData.lock_switch));
  };

  // 处理设备连接
  const handleConnect = () => {
    if (
      connectStatusInfo.status === StandardBleConnectStatus.CONNECTING ||
      connectStatusInfo.status === StandardBleConnectStatus.CONNECTED
    ) {
      return;
    } else {
      connectDevice();
    }
  };

  // 报警
  const handleAlarm = () => {
    if (sdk.deviceData.lock_switch) {
      console.warn('已开启，不报警')
      return;
    }
    onControlDevice('alert_status', Number(!sdk.deviceData.alert_status));
  };

  // 鸣笛寻车
  const handleMute = () => {
    if (sdk.deviceData.lock_switch) {
      console.warn('已开启，不报警')
      return;
    }
    if (sdk.deviceData.sound === 'sound') {
      return;
    }
    onControlDevice('sound', 'sound');
    setTimeout(() => {
      onControlDevice('sound', '');
    }, 5000);
  };

  return (
    <main className="electric-car">
      <HeaderBlock></HeaderBlock>

      <Block
        className={classNames(
          'status-block',
          sdk.deviceData.lock_switch === 1 ? 'active' : ''
        )}
        onClick={handleLock}
      >
        {sdk.deviceData.lock_switch === 1 ? (
          <img className="icon-unlock" src={Unlock}></img>
        ) : (
          <img className="icon-unlock" src={Lock}></img>
        )}
        <p className="status-name">
          {sdk.deviceData.lock_switch === 1 ? '已开启' : '已关闭'}
        </p>
      </Block>

      <div className="electric-car-setting">
        <Block
          className={classNames(
            'setting-button',
            connectStatusInfo.status === StandardBleConnectStatus.CONNECTED
              ? 'active'
              : ''
          )}
          {...buttonProps}
          onClick={handleConnect}
        >
          <SvgIcon
            className="button-icon icon-bluetooth"
            name="icon-bluetooth"
            color={
              connectStatusInfo.status === StandardBleConnectStatus.CONNECTED
                ? '#FFFFFF'
                : '#000000'
            }
          />
          <p className="button-name font_line_2 color_3">
            {StandardBleConnectStatusStr[connectStatusInfo.status]}
          </p>
        </Block>

        <Block
          className={classNames(
            'setting-button',
            sdk.deviceData.alert_status === 1 ? 'active' : ''
          )}
          {...buttonProps}
          onClick={handleAlarm}
        >
          {sdk.deviceData.alert_status === 1 ? (
            <SvgIcon
              className="button-icon icon-alarm"
              name="icon-alarm"
              color="#FFFFFF"
            />
          ) : (
            <SvgIcon
              className="button-icon icon-alarm"
              name="icon-alarm"
              color="#000000"
            />
          )}
          <p className="button-name font_line_2 color_3">
            {sdk.deviceData.alert_status === 1 ? '报警已开' : '报警未开'}
          </p>
        </Block>
        <Block
          className={classNames(
            'setting-button',
            sdk.deviceData.sound === 'sound' ? 'active' : ''
          )}
          {...buttonProps}
          onClick={handleMute}
        >
          {sdk.deviceData.sound !== 'sound' ? (
            <SvgIcon
              className="button-icon icon-mute"
              name="icon-mute"
              color="#000000"
            />
          ) : (
            <SvgIcon
              className="button-icon icon-whistle"
              name="icon-whistle"
              color="#FFFFFF"
            />
          )}
          <p className="button-name font_line_2 color_3">
            {sdk.deviceData.sound !== 'sound' ? '鸣笛寻车' : '鸣笛中'}
          </p>
        </Block>
      </div>

      {/* <footer className="footer-block">
        <Cell title="无感解锁" size="medium" onClick={handleUnlock}></Cell>
      </footer> */}
    </main>
  );
}
