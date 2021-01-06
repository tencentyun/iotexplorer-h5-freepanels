import React, { useEffect, useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { HashRouter } from 'react-router-dom';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { entryWrap } from "@src/entryWrap";
import { fetchAllList } from '@src/libs/utillib';
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
  const [editingFenceInfo, setEditingFenceInfo] = useState<DeviceFenceInfo | null>(null);
  const [fenceList, setFenceList] = useState<DeviceFenceInfo[] | null>(null);

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

  const getFenceList = async () => {
    const list = await fetchAllList(async ({ offset, limit }) => models.getFenceList({
      ProductId: sdk.productId,
      DeviceName: sdk.deviceName,
      Offset: offset,
      Limit: limit,
    }));

    setFenceList(list);
    
    return list;
  };

  const handleWsReport = ({ deviceId, deviceData }) => {
    // 监听设备通过物模型 GPS_Ext 或 LBS_BS 上报位置信息
    if (deviceId === sdk.deviceId && (
      deviceData['GPS_Ext'] || deviceData['LBS_BS']
    )) {
      // 拉取最新的设备位置
      getDeviceLocation().catch((err) => {
        console.error('getDeviceLocation fail', err);
      });
    }
  };

  useEffect(() => {
    sdk.on('wsReport', handleWsReport);

    return () => {
      sdk.off('wsReport', handleWsReport);
    };
  }, []);
  
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
      editingFenceInfo,
      setEditingFenceInfo,
      fenceList,
      setFenceList,
      getFenceList,
    }}>
      <HashRouter>
        <LocatorPanel />
      </HashRouter>
    </LocatorPanelContext.Provider>
  );
}

entryWrap(App);
