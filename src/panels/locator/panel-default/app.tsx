import React, { useEffect, useReducer } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { HashRouter } from 'react-router-dom';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { entryWrap } from "@src/entryWrap";
import { fetchAllList } from '@src/libs/utillib';
import { LocatorPanel } from './LocatorPanel';
import { LocatorPanelContext } from './LocatorPanelContext';
import { LatLngWithTime, CoordinateType, DeviceFenceInfo } from './types';
import * as models from './models';

interface LocatorPanelState {
  deviceLocation: LatLngWithTime | null;
  fenceList: DeviceFenceInfo[] | null;
}

export enum LocatorPanelReducerAction {
  UpdateDeviceLocation = 'UpdateDeviceLocation',
  UpdateFenceList = 'UpdateFenceList',
  ResetFenceList = 'ResetFenceList',
  ModifyFenceStatus = 'ModifyFenceStatus',
}

function initState() {
  return {
    deviceLocation: null,
    mapViewData: null,
    fenceList: null,
  };
}

function reducer(state: LocatorPanelState, action: ReducerAction<LocatorPanelReducerAction>) {
  const { type, payload = {} } = action;

  const nextState = (() => {
    switch (type) {
      case LocatorPanelReducerAction.UpdateDeviceLocation: {
        return {
          ...state,
          deviceLocation: payload.deviceLocation,
        };
      }
      case LocatorPanelReducerAction.UpdateFenceList: {
        return {
          ...state,
          fenceList: payload.fenceList,
        };
      }
      case LocatorPanelReducerAction.ResetFenceList: {
        return {
          ...state,
          fenceList: null,
        };
      }
      case LocatorPanelReducerAction.ModifyFenceStatus: {
        if (!state.fenceList) {
          return state;
        }

        const { fenceId, fenceEnable } = payload;
        const index = state.fenceList.findIndex(fence => fence.FenceId === fenceId);
        if (index === -1) {
          return state;
        }

        const list = state.fenceList.slice();
        list[index] = {
          ...list[index],
          FenceEnable: fenceEnable,
        };

        return {
          ...state,
          fenceList: list,
        };
      }
      default:
        return state;
    }
  })();

  return nextState as LocatorPanelState;
}

function App() {
  const [{
    deviceInfo,
    deviceData,
    templateMap,
  }, { doControlDeviceData }] = useDeviceInfo();

  const [state, dispatch] = useReducer(reducer, null, initState);

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

    dispatch({
      type: LocatorPanelReducerAction.UpdateDeviceLocation,
      payload: {
        deviceLocation,
      },
    });

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

    dispatch({
      type: LocatorPanelReducerAction.UpdateFenceList,
      payload: {
        fenceList: list,
      },
    });
    
    return list;
  };

  const resetFenceList = () => {
    dispatch({
      type: LocatorPanelReducerAction.ResetFenceList,
      payload: {},
    });
  };

  const modifyFenceStatus = ({
    fenceId,
    fenceEnable,
  }: {
    fenceId: number;
    fenceEnable: boolean;
  }) => {
    dispatch({
      type: LocatorPanelReducerAction.ResetFenceList,
      payload: {
        fenceId,
        fenceEnable, 
      },
    });
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
      deviceLocation: state.deviceLocation,
      getDeviceLocation,
      getUserLocation,
      fenceList: state.fenceList,
      getFenceList,
      resetFenceList,
      modifyFenceStatus,
    }}>
      <HashRouter>
        <LocatorPanel />
      </HashRouter>
    </LocatorPanelContext.Provider>
  );
}

entryWrap(App);
