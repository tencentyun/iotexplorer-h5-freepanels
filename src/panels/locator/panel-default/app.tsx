import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { HashRouter } from 'react-router-dom';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { entryWrap } from "@src/entryWrap";
import { LocatorPanel } from './LocatorPanel';
import { LocatorPanelContext } from './LocatorPanelContext';
import { LatLngWithTime, CoordinateType, DeviceFenceInfo } from './types';
import * as models from './models';

function App() {
  const [{
    deviceInfo,
    deviceData,
    templateMap,
  }, { doControlDeviceData }] = useDeviceInfo();
  const [deviceLocation, setDeviceLocation] = useState<LatLngWithTime | null>(null);
  const [locationHistory, setLocationHistory] = useState<LatLngWithTime[] | null>(null);
  const [fenceInfo, setFenceInfo] = useState<DeviceFenceInfo | null>(null);

  const getDeviceLocation = async () => {
    const resp = await models.getDeviceLocation({
      DeviceId: deviceInfo.DeviceId,
      CoordType: CoordinateType.GCJ02,
    });

    if (!resp.CreateTime) {
      // CreateTime 为 0 表示无数据
      return Promise.reject({ msg: '设备无当前位置信息' });
    }

    const deviceLocation: LatLngWithTime = {
      lat: resp.Location.Latitude,
      lng: resp.Location.Longitude,
      time: resp.CreateTime,
    };

    setDeviceLocation(deviceLocation);
    return deviceLocation;
  };

  const getUserLocation = async () => {
    await sdk.wxSdkReady();
    return new Promise<LatLngWithTime>((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          resolve({
            lat: res.latitude,
            lng: res.longitude,
            time: Date.now(),
          });
        },
        fail: (err) => { reject(err); },
      });
    });
  };
  
  return (
    <LocatorPanelContext.Provider value={{
      deviceInfo,
      deviceData,
      templateMap,
      doControlDeviceData,
      deviceLocation,
      getDeviceLocation,
      getUserLocation,
      locationHistory,
      setLocationHistory,
      fenceInfo,
      setFenceInfo,
    }}>
      <HashRouter>
        <LocatorPanel />
      </HashRouter>
    </LocatorPanelContext.Provider>
  );
}

entryWrap(App);
