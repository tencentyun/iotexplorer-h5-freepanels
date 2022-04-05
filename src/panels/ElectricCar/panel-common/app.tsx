/*
 * @Description: 电动车
 */
import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';

import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import '@icons/themes/icons/svg/electric-car';
import './style.less';

import { Home } from './views/home';
import { SenselessUnlock } from './views/senseless-unlock';
import { Settings } from './views/settings';
import { QuicknessMode } from '@components/base/quicknessMode';

export const App = QuicknessMode(() => {
  const isBluetoothDevice = true;
  const isDev = process.env.NODE_ENV !== 'production';
  // 新旧链接的兼容
  const hasScf = /\/scf\//.test(location.href);

  let basename = isDev
    ? `${hasScf ? '/scf' : ''}/h5panel/developing`
    : `${hasScf ? '/scf' : ''}/h5panel`;

  // 蓝牙的调试模式下路由需要加上 /live
  if (isBluetoothDevice && isDev) {
    basename += '/live';
  }

  const [state, { onDeviceDataChange, onDeviceStatusChange }] =    useDeviceData(sdk);
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
    <HashRouter basename={basename}>
      <Redirect exact from="/" to="/home"></Redirect>
      <Switch>
        {/* 首页 */}
        <Route
          path="/home"
          render={() => <Home></Home>}
        ></Route>
        <Route
          path="/unlock"
          render={() => <SenselessUnlock></SenselessUnlock>}
        ></Route>
        <Route
          path="/settings"
          render={() => <Settings></Settings>}
        ></Route>
      </Switch>
    </HashRouter>
  );
});
