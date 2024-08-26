import React, { useEffect } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { DeviceSateContext } from './deviceStateContext';
import { useDeviceData } from '@hooks/useDeviceData';

import 'antd-mobile/es/global';
import '@icons/themes/global.less';
import './style.less';
import './theme.less';
import '@icons/themes/icons/svg/air-conditioner';

import { Home } from './views/home/home';
import { More } from './views/more/more';
import Timer from './views/timer/timer';
import { QuicknessMode } from '@components/base/quicknessMode';

export const App = QuicknessMode(() => {
  const [state, { onDeviceDataChange, onDeviceStatusChange }]: any =    useDeviceData(sdk);

  // 获取设备模型数据
  const getDeviceData = (deviceId: string) => {
    sdk.getDeviceData({ deviceId });
  };
  getDeviceData(sdk.deviceId);

  // WebSocket 监听
  useEffect(() => {
    // H5 页面切前台时，刷新页面标题的设备名称
    sdk.on('pageShow', async () => {
      const deviceInfo = await sdk.getDeviceInfo();

      // 设备展示名称
      const deviceDisplayName = sdk.groupName||deviceInfo.AliasName || sdk.productInfo.Name;
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
      <HashRouter>
        <Redirect exact from="/" to="/home"></Redirect>
        <Switch>
          {/* 更多页*/}
          <Route path="/more" render={() => <More></More>}></Route>

          {/* 云定时*/}
          <Route path="/timer" render={() => <Timer></Timer>}></Route>

          {/* 首页*/}
          <Route
            path="/home"
            render={() => <Home></Home>
            }
          ></Route>
        </Switch>
      </HashRouter>
    </DeviceSateContext.Provider>
  );
});
