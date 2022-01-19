import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { DeviceSateContext } from './deviceStateContext';
import { useDeviceData } from '@/hooks/useDeviceData';
import { Home } from './views/home/home';

import '../../themes/global.less';
import './style.less';
import './theme.less';

import { withTheme } from '@/utils/with-theme';
import { More } from '@/products/air-conditioner/views/more/more';
import Timer from '@/products/air-conditioner/views/timer/timer';

function App() {
  const isBluetoothDevice = true;
  // eslint-disable-next-line no-undef
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

  // @ts-ignore
  const [state, { onDeviceDataChange, onDeviceStatusChange }]: any =
    useDeviceData(sdk);

  // 获取设备模型数据
  const getDeviceData = (deviceId: string) => {
    sdk.getDeviceData({ deviceId });
  };
  getDeviceData(sdk.deviceId);

  useEffect(() => {
    sdk.setShareConfig({
      title: sdk.displayName
    });
  }, []);

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

  useEffect(() => {
    // 检查固件更新，若有可升级固件，且设备在线，则弹出提示
    const doCheckFirmwareUpgrade = async () => {
      try {
        await sdk.checkFirmwareUpgrade({
          silent: false // 设置为 true 则只检查，不弹出提示
        });
      } catch (err) {
        //
      }
    };
    doCheckFirmwareUpgrade();
  }, []);

  // 指定要展示大按钮的属性标识符，为 null 则取第一个属性
  let headPanelTemplateId = null;
  if (!headPanelTemplateId && state.templateList.length > 0) {
    headPanelTemplateId = state.templateList[0].id;
  }

  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    sdk.sdkReady().then(() => setSdkReady(true));
  }, []);

  return (
    <>
      {!sdkReady ? (
        <div> loading...</div>
      ) : (
        <DeviceSateContext.Provider value={state}>
          <HashRouter basename={basename}>
            <Redirect exact from="/" to="/home"></Redirect>
            <Switch>
              {/*更多页*/}
              <Route path="/more" render={() => <More></More>}></Route>

              {/*云定时*/}
              <Route path="/timer" render={() => <Timer></Timer>}></Route>

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
      )}
    </>
  );
}

// @ts-ignore
ReactDOM.render(withTheme(<App />), document.getElementById('app'));
