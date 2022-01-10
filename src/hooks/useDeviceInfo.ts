import { useEffect, useReducer, useRef, Reducer } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { tips } from '@wxlib';
import { StatusTipProps } from '@components/StatusTip';

export interface UseDeviceInfoState {
  deviceInfo: any;
  productInfo: any;
  templateMap: any;
  deviceData: any;
  statusTip?: StatusTipProps | null;
}

export interface UserDeviceInfoData extends UseDeviceInfoState {
  powerOff: boolean;
  offline: boolean;
  isShareDevice?: boolean;
}

export type DoControlDeviceData = (id: string | { [id: string]: any }, value?: any) => void;

export interface UseDeviceInfoHandler {
  doControlDeviceData: DoControlDeviceData;
}

export type UseDeviceInfoResult = [UserDeviceInfoData, UseDeviceInfoHandler];

// declare type Reducer = (state: UseDeviceInfoState, action: ReducerAction<UseDeviceInfoAction>) => UseDeviceInfoState;

export enum UseDeviceInfoAction {
  Init = 'Init',
  UpdateDeviceData = 'UpdateDeviceData',
  UpdateDeviceStatus = 'UpdateDeviceStatus',
}

const getFirstKey = (obj = {}): string => {
  for (const key in obj) {
    return key;
  }
  return '';
};

function reducer(state: UseDeviceInfoState, action: ReducerAction<UseDeviceInfoAction>): UseDeviceInfoState {
  const { type, payload } = action;

  console.log('action => ', action.type, payload);
  console.log('prev state => ', state);

  const nextState = (() => {
    switch (type) {
      case UseDeviceInfoAction.Init: {
        return {
          ...state,
          ...payload,
          statusTip: null,
        };
      }
      case UseDeviceInfoAction.UpdateDeviceData: {
        const deviceData = { ...state.deviceData };

        for (const key in payload.deviceData) {
          if (!deviceData[key] || deviceData[key] !== payload.deviceData[key]) {
            deviceData[key] = payload.deviceData[key];
          }
        }

        return {
          ...state,
          deviceData,
        };
      }
      case UseDeviceInfoAction.UpdateDeviceStatus:
        const { deviceStatus } = payload;

        return {
          ...state,
          deviceInfo: {
            ...state.deviceInfo,
            Status: deviceStatus,
          },
        };
    }

    return state;
  })();

  console.log('next state => ', nextState);

  return nextState;
}

function initState(sdk): UseDeviceInfoState {
  const { deviceInfo, productInfo, dataTemplate, deviceData, deviceStatus } = sdk;

  const result = {
    deviceInfo,
    productInfo,
    templateMap: {},
    deviceData,
    statusTip: null,
  };

  ['events', 'actions', 'properties'].forEach((key) => {
    if (dataTemplate[key] && dataTemplate[key].length) {
      dataTemplate[key].forEach((item) => {
        result.templateMap[item.id] = item;
      });
    }
  });

  result.deviceInfo.Status = deviceStatus;
  result.deviceInfo.isVirtualDevice = deviceInfo.DeviceName === '~virtualDev';

  return result;
}

export const useDeviceInfo = (): UseDeviceInfoResult => {
  // id 为key，设置 setTimeout 避免连续操作
  const controlDeviceDataDebounceMap = useRef({});
  const [state, dispatch] = useReducer<Reducer<UseDeviceInfoState, ReducerAction<any>>>(reducer, {
    deviceInfo: {},
    productInfo: {},
    templateMap: {},
    deviceData: {},
    statusTip: { status: 'loading' },
  });

  const controlDeviceData = async (deviceData) => {
    try {
      await sdk.controlDeviceData(deviceData);
      dispatch({
        type: UseDeviceInfoAction.UpdateDeviceData,
        payload: {
          deviceData,
        },
      });
    } catch (err) {
      await tips.showError(err);
    }
  };

  const doControlDeviceData = (idOrDeviceData, value) => {
    let deviceData;

    if (typeof idOrDeviceData === 'string') {
      deviceData = { [idOrDeviceData]: value };
    } else {
      deviceData = idOrDeviceData;
    }

    // 以第一个key为id
    const id = getFirstKey(deviceData);

    clearTimeout(controlDeviceDataDebounceMap.current[id]);

    controlDeviceDataDebounceMap.current[id] = setTimeout(() => controlDeviceData(deviceData), 100);
  };

  useEffect(() => {
    const handleWsReport = ({ deviceId, deviceData }) => {
      if (deviceId === sdk.deviceId) {
        const data = {};

        for (const key in deviceData) {
          data[key] = deviceData[key].Value;
        }

        dispatch({
          type: UseDeviceInfoAction.UpdateDeviceData,
          payload: { deviceData: data },
        });
      }
    };

    const handleWsStatusChange = ({ deviceId, deviceStatus }) => {
      if (deviceId === sdk.deviceId) {
        dispatch({
          type: UseDeviceInfoAction.UpdateDeviceStatus,
          payload: { deviceStatus },
        });
      }
    };

    sdk
      .on('wsReport', handleWsReport)
      .on('wsStatusChange', handleWsStatusChange);

    sdk.sdkReady().then(() => {
      dispatch({
        type: UseDeviceInfoAction.Init,
        payload: initState(sdk),
      });
    });

    return () => {
      sdk
        .off('wsReport', handleWsReport)
        .off('wsStatusChange', handleWsStatusChange);
    };
  }, []);

  const { deviceInfo, deviceData } = state;

  const offline = !deviceInfo.isVirtualDevice && deviceInfo.Status === 0;
  const powerOff = offline || !deviceData.power_switch;

  return [{
    ...state,
    offline,
    powerOff,
    isShareDevice: sdk.isShareDevice,
  }, { doControlDeviceData }];
};
