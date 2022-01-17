/**
 * 三孔单插
 */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import { Home } from './views/home/home';
import Timer from './views/timer/timer';
import { DeviceSateContext } from './deviceStateContext';
import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import './style.less';
import './themes.less'; // 4套皮肤 构建前要修改var.less变量文件

export function App() {
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
  console.log(state, 'state===============');

  // WebSocket 监听
  useEffect(() => {
    // 监听 H5 页面切前台
    sdk.on('pageShow', () => {
      console.log('on pageShow');
    });

    // 监听 H5 页面切后台
    sdk.on('pageHide', () => {
      console.log('on pageHide');
    });

    // 监听小程序切前台
    sdk.on('appShow', () => {
      console.log('on appShow');
    });

    // 监听小程序切后台
    sdk.on('appHide', () => {
      console.log('on appHide');
    });

    // H5 页面切前台时，刷新页面标题的设备名称
    sdk.on('pageShow', async () => {
      const deviceInfo = await sdk.getDeviceInfo();

      // 设备展示名称
      const deviceDisplayName = deviceInfo.AliasName || sdk.productInfo.Name;
      // 更新页面标题
      window.document.title = deviceDisplayName;
    });

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

  useEffect(() => {
    // 检查固件更新，若有可升级固件，且设备在线，则弹出提示
    const doCheckFirmwareUpgrade = async () => {
      try {
        const upgradeInfo = await sdk.checkFirmwareUpgrade({
          silent: false // 设置为 true 则只检查，不弹出提示
        });
        console.log('firmware upgrade info', upgradeInfo);
      } catch (err) {
        console.error('checkFirmwareUpgrade fail', err);
      }
    };
    doCheckFirmwareUpgrade();
  }, []);
  //
  // const onControlDeviceData = (id, value) =>
  //   sdk.controlDeviceData({ [id]: value });
  //
  // const onControlPanelItem = item => {
  //   console.log('onControlPanelItem', item);
  // };
  //
  // // 一般非在线状态（state.deviceStatus === 0）需要禁止控制
  // const disabled = false; // !state.deviceStatus;

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
        <div>loading...</div>
      ) : (
        <article>
          <DeviceSateContext.Provider value={state}>
            <Router basename={basename}>
              <Switch>
                {/*定时器*/}
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
      )}
    </>
  );
}
