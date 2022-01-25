/*
 * @Description: 取暖器
 */
import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDeviceData } from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { DeviceContext } from './deviceContext';

import 'antd-mobile/es/global';
import '../../themes/global.less';
import './style.less';

import { Home } from './views/home';
import { Details } from './views/details';
import { Timing } from './views/timing';
import { QuicknessMode } from '@components/base/quicknessMode';

export const App = QuicknessMode(function App() {
  const isBluetoothDevice = true;
  // eslint-disable-next-line no-undef
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

  const [state, { onDeviceDataChange, onDeviceStatusChange }] =
    useDeviceData(sdk);

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
    <DeviceContext.Provider value={state}>
      <HashRouter basename={basename}>
        <Redirect exact from="/" to="/home"></Redirect>
        <Switch>
          {/* 取暖器首页 */}
          <Route path="/home" render={() => <Home></Home>}></Route>
          {/* 设备详情页 */}
          <Route path="/details" render={() => <Details></Details>}></Route>
          {/* 云端定时 */}
          <Route path="/timing" render={() => <Timing></Timing>}></Route>
        </Switch>
      </HashRouter>
    </DeviceContext.Provider>
  );
});