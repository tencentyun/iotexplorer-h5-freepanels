/*
 * @Author: wrq
 * @Date: 2021-10-16 14:44:49
 * @Description: 门磁
 */
import React, { useEffect, useState } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';

import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import '@icons/themes/icons/svg/magnetic-door';
import './style.less';

import { Home } from './views/home';
import { Records } from './views/records';

export function App() {
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

  // 急速渲染适配
  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    sdk.sdkReady().then(() => setSdkReady(true));
  }, []);

  return !sdkReady ? (
    <div> loading...</div>
  ) : (
    <HashRouter>
      <Redirect exact from="/" to="/home"></Redirect>
      <Switch>
        {/* 首页 */}
        <Route
          path="/home"
          render={() => (
            <Home></Home>
          )}>
        </Route>
        <Route
          path="/records"
          render={() => (
            <Records></Records>
          )}>
        </Route>
      </Switch>
    </HashRouter>
  );
}
