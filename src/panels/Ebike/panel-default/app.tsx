/*
 * @Description: 电动车
 */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import VConsole from 'vconsole';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

import { useDeviceData } from '../../../hooks/useDeviceData';
import { useDeviceInfo } from '../../../hooks/useDeviceInfo';

import './themes/global.less';
import './style.less';
import { withTheme } from './utils/with-theme';

import { Home } from './views/home';
// import { SenselessUnlock } from './views/senseless-unlock';
import { StatusTip } from './components/StatusTip';

// const vConsole = new VConsole();

function App() {
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

  const [{ statusTip }] = useDeviceInfo();

  const [state, { onDeviceDataChange, onDeviceStatusChange }] =
    useDeviceData(sdk);
  // sdk.tips.alert('欢迎进入页面');
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

  return statusTip ? (
    <StatusTip {...statusTip} />
  ) : (
    <Router basename={basename}>
      <Switch>
        {/* 首页 */}
        <Route path="/">
          <Home />
          {/* <Settings /> */}
        </Route>
        {/* <Route path="/unlock">
          <SenselessUnlock />
        </Route> */}
      </Switch>
    </Router>
  );
}

ReactDOM.render(withTheme(<App />), document.getElementById('app'));
