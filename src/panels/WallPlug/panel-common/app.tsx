/**
 * 墙壁插头
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import {QuicknessMode} from '@components/base';
import { Container } from './views/container/container';
import { Records } from './views/record/records';
import Timing from './views/timer/timer';
import { DeviceSateContext } from './deviceStateContext';
import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import '@icons/themes/icons/svg/common';
import './style.less';
import './themes.less'; // 4套皮肤 构建前要修改var.less变量文件

export const App = QuicknessMode(function App() {
  const isBluetoothDevice = true;
  const isDev = process.env.NODE_ENV !== 'production';
  //新旧链接的兼容
  const hasScf = /\/scf\//.test(location.href);

  let basename = isDev
    ? `${hasScf ? '/scf' : ''}/h5panel/developing`
    : `${hasScf ? '/scf' : ''}/h5panel`;

  console.log('----basename----', basename);
  // 蓝牙的调试模式下路由需要加上 /live
  if (isBluetoothDevice && isDev) {
    basename += '/live';
  }

  const [state, { onDeviceDataChange, onDeviceStatusChange }] =
    useDeviceData(sdk);
  console.log(state, 'state===============');

  // webSecket 监听
  useEffect(() => {
    const handleWsControl = ({ deviceId, deviceData }) => {
      console.log('wsControl==========', deviceData);
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };
    const handleWsReport = ({ deviceId, deviceData }) => {
      console.log('wsReport==========', deviceData);
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };
    const handleWsStatusChange = ({ deviceId, deviceStatus }) => {
      if (deviceId === sdk.deviceId) {
        onDeviceStatusChange(deviceStatus);
      }
    };

    sdk
      .on('wsControl', handleWsControl)
      .on('wsReport', handleWsReport)
      .on('wsStatusChange', handleWsStatusChange);

    return () => {
      sdk
        .off('wsControl', handleWsControl)
        .off('wsReport', handleWsReport)
        .off('wsStatusChange', handleWsStatusChange);
    };
  }, []);

  return (
        <article>
          <DeviceSateContext.Provider value={state}>
            <Router basename={basename}>
              <Switch>
                {/*定时器*/}
                <Route path="/timing">
                  <Timing />
                </Route>
                {/* 开关日志 */}
                <Route path="/record">
                  <Records />
                </Route>
                {/* 首页 */}
                <Route path="/">
                  <Container />
                </Route>
              </Switch>
            </Router>
          </DeviceSateContext.Provider>
        </article>
  );
});
