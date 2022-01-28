/*
 * @Author: wrq
 * @Date: 2021-09-22 21:15:26
 * @Description: 香薰机
 */
import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import { DeviceContext } from './deviceContext';
// css
import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import '@icons/themes/icons/svg/aromatherapy-machine';
import './style.less';
// 页面
import { Home } from './views/home';
import { More } from './views/more';
import { Timing } from './views/timing';
import { QuicknessMode } from '@components/base/quicknessMode';

export const App = QuicknessMode(function App() {
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
  );
});