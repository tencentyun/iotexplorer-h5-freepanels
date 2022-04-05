/**
 * 多路开关
 */
import React, { useEffect } from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import { QuicknessMode } from '@components/base';
import { Home } from './views/home/home';
import Timer from './views/timer/timer';
import { DeviceSateContext } from './deviceStateContext';
import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import './style.less';
import './themes.less';

export const App = QuicknessMode(() => {
  const [state, { onDeviceDataChange, onDeviceStatusChange }] =    useDeviceData(sdk);
  console.log('state===============', state);

  // WebSocket 监听
  useEffect(() => {
    const handleWsControl = ({ deviceId, deviceData }) => {
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };

    const handleWsReport = ({ deviceId, deviceData }) => {
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };

    const handleWsStatusChange = ({ deviceId, deviceStatus }) => {
      console.log('handleWsStatusChange>>>>', deviceStatus);
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
        <HashRouter>
          <Redirect exact from="/" to="/home"></Redirect>
          <Switch>
            {/* 首页 */}
            <Route
              path="/home"
              render={() => (
                <Home />
              )}>
            </Route>
            <Route
              path="/timing"
              render={() => (
                <Timer />
              )}>
            </Route>
          </Switch>
        </HashRouter>
      </DeviceSateContext.Provider>
    </article>
  );
});
