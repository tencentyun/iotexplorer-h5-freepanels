import { useReducer } from 'react';

export interface DeviceDataState {
  deviceData: unknown;
  deviceStatus: 0 | 1;
  templateMap: unknown;
  templateList: TemplatePropertyConfig[];
}

function reducer(
  state: DeviceDataState,
  action: {
    type: string;
    payload: any;
  }
) {
  const { type, payload } = action;

  switch (type) {
    case 'data': {
      const deviceData: any = state.deviceData;

      Object.keys(payload || {}).forEach(key => {
        deviceData[key] = payload[key].Value;
      });

      return {
        ...state,
        deviceData
      };
    }
    case 'status':
      return {
        ...state,
        deviceStatus: payload
      };
  }

  return state;
}

function initState(sdk: any) {
  const templateMap: any = {};

  // 过滤掉 string 和 timestamp 类型
  const templateList = sdk.dataTemplate.properties.filter(
    (item: TemplatePropertyConfig) => {
      if (item.define.type !== 'string' && item.define.type !== 'timestamp') {
        templateMap[item.id] = item;

        return true;
      }

      return false;
    }
  );

  return {
    templateMap,
    templateList,
    deviceData: sdk.deviceData,
    deviceStatus: sdk.deviceStatus
  };
}

export function useDeviceData(sdk: any) {
  const [state, dispatch] = useReducer(reducer, sdk, initState);

  const onDeviceDataChange = (deviceData: unknown) => {
    dispatch({
      type: 'data',
      payload: deviceData
    });
  };

  const onDeviceStatusChange = (deviceStatus: 0 | 1) => {
    dispatch({
      type: 'status',
      payload: deviceStatus
    });
  };

  return [
    state,
    {
      onDeviceDataChange,
      onDeviceStatusChange
    }
  ];
}

import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
export const apiControlDeviceData = (data: any) => {
  sdk
    .controlDeviceData(data)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.error(err);
    });
};


export function formatDeviceData(templateMap: object) {
  const data: object = {};

  Object.keys(templateMap).forEach((key: string) => {
    const templateData: TemplateData = templateMap[key];
    const { define, id } = templateData;

    if (define.type === 'stringenum') {
      const { mapping } = define;

      data[id] = Object.keys(mapping).map((key: string) => ({
        name: key,
        desc: mapping[key]
      }));
    } else if (define.type === 'int') {
      data[id] = {
        min: +(define.min || 0),
        max: +(define.max || 0),
        start: +(define.start || 0),
        step: +(define.step || 0),
        unit: define.unit
      };
    }
  });

  return data;
}

export function onControlDevice(id: string, value: any) {
  console.log(id, value);
  sdk.controlDeviceData({ [id]: value });
}

