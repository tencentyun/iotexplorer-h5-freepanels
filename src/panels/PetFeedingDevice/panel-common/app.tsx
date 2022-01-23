/*
 * @Author: wrq
 * @Date: 2021-10-16 14:45:03
 * @Description: 宠物喂养器
 */
/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

import { useDeviceData } from '@hooks/useDeviceData';
import { DeviceContext } from './deviceContext';

import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import '@icons/themes/icons/svg/pet-feeding-device';
import './style.less';

import { Home } from './views/home';
import { Setting } from './views/setting';
import { Records } from './views/records';
import { Plan } from './views/plan';

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

  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    sdk.sdkReady().then(() => setSdkReady(true));
  }, []);

  return (
    <>
      {!sdkReady ? (
        <div>loading...</div>
      ) : (
        <DeviceContext.Provider value={state}>
          <HashRouter>
            <Redirect exact from="/" to="/home"></Redirect>
            <Switch>
              <Route
                path="/setting"
                render={() => (
                  <Setting></Setting>
                )}>
              </Route>
              <Route
                path="/record"
                render={() => (
                  <Records></Records>
                )}>
              </Route>
              <Route
                path="/plan"
                render={() => (
                  <Plan></Plan>
                )}>
              </Route>
              {/* 首页 */}
              <Route
                path="/home"
                render={() => (
                  <Home></Home>
                )}>
              </Route>
            </Switch>
          </HashRouter>
        </DeviceContext.Provider>
      )}
    </>
  );
}
