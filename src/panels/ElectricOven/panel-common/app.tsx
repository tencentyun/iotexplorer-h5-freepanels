/**
 * 电烤箱
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import { Home } from './views/home/home';
import '@icons/themes/global.less';
import '@icons/themes/icons/svg/electric-oven';
import './style.less';
import './themes.less'; // 4套皮肤 构建前要修改var.less变量文件

export function App() {
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

  // useEffect(() => {
  //   console.log(sdk, 'sdk---------');
  //   sdk
  //     .on('appShow', () => console.log('appShow'))
  //     .on('appHide', () => console.log('appHide'))
  //     .on('pageShow', () => console.log('pageShow'))
  //     .on('pageHide', () => console.log('pageHide'));
  // }, []);
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

  return !sdkReady ? (
    <div>loading...</div>
  ) : (
    <Router basename={basename}>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
