import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { DeviceSateContext } from './deviceStateContext';
import { useDeviceData } from '@hooks/useDeviceData';

import { More } from './views/more/more';
import { Home } from './views/home/home';
import Timer from './views/more/timer/timer';

import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import './style.less';
import './themes/themes.less'; // 4套皮肤 构建前要修改var.less变量文件
import '@icons/themes/icons/svg/humidifier';
import { QuicknessMode } from '@components/base/quicknessMode';

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

  const [state, { onDeviceDataChange, onDeviceStatusChange }]: any =
    useDeviceData(sdk);

  // 获取设备模型数据
  const getDeviceData = (deviceId: string) => {
    sdk.getDeviceData({ deviceId });
    console.log('==getDeviceData===', deviceId, state);
  };
  getDeviceData(sdk.deviceId);

  // WebSocket 监听
  useEffect(() => {
    // H5 页面切前台时，刷新页面标题的设备名称
    sdk.on('pageShow', async () => {
      const deviceInfo = await sdk.getDeviceInfo();
      // 设备展示名称
      const deviceDisplayName = deviceInfo.AliasName || sdk.productInfo.Name;
      // 更新页面标题
      window.document.title = deviceDisplayName;
    });

    const handleWsControl = ({ deviceId, deviceData }: any) => {
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };

    const handleWsReport = ({ deviceId, deviceData }: any) => {
      if (deviceId === sdk.deviceId) {
        onDeviceDataChange(deviceData);
      }
    };

    const handleWsStatusChange = ({ deviceId, deviceStatus }: any) => {
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

  // 指定要展示大按钮的属性标识符，为 null 则取第一个属性
  let headPanelTemplateId = null;
  if (!headPanelTemplateId && state.templateList.length > 0) {
    headPanelTemplateId = state.templateList[0].id;
  }

  return (
    <DeviceSateContext.Provider value={state}>
      <HashRouter basename={basename}>
        <Redirect exact from="/" to="/home"></Redirect>
        <Switch>
          {/*定时*/}
          <Route path="/timer" render={() => <Timer></Timer>}></Route>
          {/*更多页*/}
          <Route path="/more" render={() => <More></More>}></Route>
          {/*首页*/}
          <Route
            path="/home"
            render={() =>
              <Home></Home>
            }
          ></Route>
        </Switch>
      </HashRouter>
    </DeviceSateContext.Provider>
  );
});
