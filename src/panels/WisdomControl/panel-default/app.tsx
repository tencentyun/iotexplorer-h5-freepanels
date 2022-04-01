import React, { useEffect, useState } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { entryWrap } from '@src/entryWrap';
import { WisdomControlPanel } from './panel';
import {
  HashRouter,
  Route,
  Redirect,
  Switch,
  useHistory,
} from 'react-router-dom';
import { SubDeviceList } from './SubDeviceList';
import { StatusTip } from '@components/StatusTip';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

function App() {
  const [
    { deviceInfo, deviceData, productInfo, templateMap, offline, powerOff, statusTip },
    { doControlDeviceData },
  ] = useDeviceInfo();
  const [subDeviceList, setSubDeviceList] = useState<any[]>([]);
  const formatSubDeviceList = (list) => {
    list.map((item) => {
      item.icon = item.IconUrl;
      item.text = item.AliasName || item.DeviceName;
      item.clickFun = () => {
        console.log('come click');
        try {
          sdk.goDevicePanelPage(item.DeviceId);
        } catch (err) {
          console.log(err);
        }
      };
    });
    setSubDeviceList(list);
  };
  const getSubDeviceList = async () => {
    const list = await sdk.getSubDeviceList();
    console.log('sdk', list);
    if (list && list.subDeviceList) {
      formatSubDeviceList(list.subDeviceList);
    }
  };
  useEffect(() => {
    getSubDeviceList();
  }, []);
  sdk.on('subDeviceChange', (subDeviceList) => {
    console.log('subdevicechange', subDeviceList, 'test');
    formatSubDeviceList(subDeviceList);
  });
  return statusTip ? <StatusTip {...statusTip} fillContainer/> : (
    <HashRouter>
      <Switch>
        <Redirect exact from="/" to="/panel"></Redirect>
        <Route
          path="/panel"
          render={() => (
            <WisdomControlPanel
              deviceData={deviceData}
              offline={offline}
              powerOff={powerOff}
              doControlDeviceData={doControlDeviceData}
              deviceList={subDeviceList}
            />
          )}
        ></Route>
        <Route
          path="/subDeviceList"
          render={() => (
            <SubDeviceList deviceList={subDeviceList}></SubDeviceList>
          )}
        ></Route>
      </Switch>
    </HashRouter>
  );
}

entryWrap(App);
