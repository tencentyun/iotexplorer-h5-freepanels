import React, { useMemo } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { Panel } from './Panel';
import { entryWrap } from "@src/entryWrap";
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import { SocketList } from './SocketList';
import * as wxlib from '@wxlib';
import { getCountdownStrWithoutDevice } from "@components/FuncFooter";
import { CountdownList } from './CountdownList';

function App() {
  const [{
    deviceInfo,
    deviceData,
    productInfo,
    templateMap,
    offline,
    powerOff,
  }, { doControlDeviceData }] = useDeviceInfo();

  const { socketList, usbList } = useMemo(() => {
    const result = {
      socketList: [] as any[],
      usbList: [] as any[],
    };

    if (templateMap) {
      Object.keys(templateMap).forEach((key) => {
        const item = { ...templateMap[key] };

        if (item.id.indexOf('switch_') > -1) {
          const id = item.id.split('switch_')[1];

          item.countdownId = `count_down${id}`;

          result.socketList.push(item);
        } else if (item.id.indexOf('USB_switch') > -1) {
          const id = item.id.split('USB_switch')[1];

          item.countdownId = `USB_count_down${id}`;

          result.usbList.push(item);
        }
      });
    }

    return result;
  }, [templateMap]);
  const totalSocketList = useMemo(
    () => [...socketList, ...usbList],
    [socketList, usbList]
  );

  return (
    <HashRouter
    >
      <div>
        <Switch>
          {/* 蓝牙搜索页 */}
          <Route
            path="/timing-project-list"
          >
            <SocketList
              socketList={totalSocketList.map(item => ({
                id: item.id,
                label: item.name,
              }))}
              onClick={(item) => {
                if (sdk.isMock) {
                  return sdk.tips.showInfo('模拟设备无法访问定时任务');
                }

                wxlib.router.go(
                  '/pages/Device/TimingProject/TimingProjectList/TimingProjectList',
                  {
                    deviceId: deviceInfo.DeviceId,
                    featureId: item.id,
                  },
                );
              }}
            />
          </Route>
          <Route
            path="/countdown-list"
          >
            <CountdownList
              socketList={totalSocketList.map(item => ({
                id: item.id,
                label: item.name,
                text: deviceData[item.countdownId] > 0
                  ? getCountdownStrWithoutDevice(deviceData[item.countdownId], !deviceData[item.id])
                  : '',
                countdownId: item.countdownId,
              }))}
              deviceData={deviceData}
              doControlDeviceData={doControlDeviceData}
            />
          </Route>
          <Route path="/">
            <Panel
              deviceInfo={deviceInfo}
              productInfo={productInfo}
              templateMap={templateMap}
              deviceData={deviceData}
              offline={offline}
              powerOff={powerOff}
              doControlDeviceData={doControlDeviceData}
              socketList={socketList}
              usbList={usbList}
            />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

entryWrap(App);
