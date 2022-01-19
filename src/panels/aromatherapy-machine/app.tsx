/*
 * @Author: wrq
 * @Date: 2021-09-22 21:15:26
 * @Description: 香薰机
 */
/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '../../hooks/useDeviceData';
import { DeviceContext } from './deviceContext';
// css
import '@/assets/styles/normalize.css';
import './style.less';
import '../../themes/global.less';
import { withTheme } from '@/utils/with-theme';
// 页面
import { Home } from './views/home';
import { More } from './views/more';
import { Timing } from './views/timing';

function App() {
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
            <Route
              path="/more"
              render={() => (
                <More></More>
              )}>
            </Route>
            <Route
              path="/timing"
              render={() => (
                <Timing></Timing>
              )}>
            </Route>
          </Switch>
        </HashRouter>
      </DeviceContext.Provider>
    )}
  </>
  );
}

ReactDOM.render(withTheme(<App />), document.getElementById('app'));
