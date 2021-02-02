import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import * as wxlib from '@wxlib';
import { SectionListPageItemProps, SectionListPage } from "@components/SectionList";
import { CountdownListPage, CountdownListPageItemProps } from "@components/CountdownListPage";

export function PanelPageWithMultiFeatures({
  timingProjectList,
  countdownList,
  deviceData,
  doControlDeviceData,
  deviceInfo,
  children
}: {
  timingProjectList: SectionListPageItemProps[];
  countdownList: CountdownListPageItemProps[];
  children: React.ReactNode;
  doControlDeviceData: any;
  deviceData: any;
  deviceInfo: any;
}) {
  return (
    <HashRouter>
      <div>
        <Switch>
          {/* 蓝牙搜索页 */}
          <Route
            path="/timing-project-list"
          >
            <SectionListPage
              list={timingProjectList}
              onClick={(item) => {
                if (sdk.isMock) {
                  return sdk.tips.showInfo('虚拟设备无法访问定时任务');
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
            <CountdownListPage
              list={countdownList}
              deviceData={deviceData}
              doControlDeviceData={doControlDeviceData}
            />
          </Route>
          <Route path="/">
            {children}
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}
