/**
 * 多路开关
 */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import {QuicknessMode} from '@components/base';
import { Home } from './views/home/home';
import Timer from './views/timer/timer';
import { DeviceSateContext } from './deviceStateContext';
import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import './style.less';
import './themes.less'; // 4套皮肤 构建前要修改var.less变量文件

export const App = QuicknessMode(function App() {
  const isBluetoothDevice = true;
  // eslint-disable-next-line no-undef
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
        <Router basename={basename}>
          <Switch>
            {/*更多页*/}
            <Route path="/timing">
              <Timer />
            </Route>
            {/*首页*/}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </DeviceSateContext.Provider>
    </article>
  );
});
