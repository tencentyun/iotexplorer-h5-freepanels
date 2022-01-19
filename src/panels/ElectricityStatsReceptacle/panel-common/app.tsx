/*
 * @Description: 电量统计插座
 */
/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

import { useDeviceData } from '@hooks/useDeviceData';
import { DeviceContext } from './deviceContext';

import 'antd-mobile/es/global';
import '../../themes/global.less';
import './style.less';

import { Home } from './views/home';
import { Timing } from './views/timing';
import { Monitoring } from './views/monitoring';

export function App() {
  const isBluetoothDevice = true;
  const isDev = process.env.NODE_ENV !== 'production';
  //新旧链接的兼容
  const hasScf = /\/scf\//.test(location.href);

  let basename = isDev
    ? `${hasScf ? '/scf' : ''}/h5panel/developing`
    : `${hasScf ? '/scf' : ''}/h5panel`;

  // 蓝牙的调试模式下路由需要加上 /live
  if (isBluetoothDevice && isDev) {
    basename += '/live';
  }

  const [state, { onDeviceDataChange, onDeviceStatusChange }] = useDeviceData(sdk);
  console.log(state, 'state===============')

  // webSecket 监听
  useEffect(() => {
    const handleWsControl = ({ deviceId, deviceData }) => {
      console.log('wsControl==========', deviceData)
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };
    const handleWsReport = ({ deviceId, deviceData }) => {
      console.log('wsReport==========', deviceData)
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
        .off("wsControl", handleWsControl)
        .off("wsReport", handleWsReport)
        .off("wsStatusChange", handleWsStatusChange);
    }
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
          <HashRouter basename={basename}>
            <Redirect exact from="/" to="/home"></Redirect>
            <Switch>
              {/* 首页 */}
              <Route
                path="/home"
                render={() => (
                  <Home></Home>
                )}>
              </Route>
              {/* 定时 */}
              <Route
                path="/timing"
                render={() => (
                  <Timing></Timing>
                )}>
              </Route>
              {/* 统计 */}
              <Route
                path="/monitoring"
                render={() => (
                  <Monitoring></Monitoring>
                )}>
              </Route>
            </Switch>
          </HashRouter>
        </DeviceContext.Provider>
      )}
    </>
  );
}
