import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import jsonp from 'jsonp';
import { TMapApiKey } from './constants';
import { appendParams } from '@utillib';
import { AlertConditionType, AlertMethodType, CoordinateType, DeviceFenceEvent, DeviceFenceInfo, DevicePosition, GeoJSON, GeoJSONGeometrySubType, GeoJSONGeometryType } from './types';

export const getDeviceLocation = async ({
  DeviceId,
  CoordType,
}: {
  DeviceId: string;
  CoordType: CoordinateType;
}): Promise<DevicePosition> => {
  const { Data } = await sdk.requestTokenApi('AppGetDeviceLocation', {
    DeviceId,
    CoordType,
  });

  return Data;
};

export const getDeviceLocationHistory = async ({
  DeviceId,
  CoordType,
  MinTime,
  MaxTime,
}: {
  DeviceId: string;
  CoordType: CoordinateType;
  MinTime: number;
  MaxTime: number;
}): Promise<DevicePosition[]> => {
  const { Data } = await sdk.requestTokenApi('AppGetDeviceLocationHistory', {
    DeviceId,
    CoordType,
    MinTime,
    MaxTime,
  });

  return Data;
};

export const getFenceList = async ({
  ProductId,
  DeviceName,
  Offset,
  Limit,
}: {
  ProductId?: string;
  DeviceName?: string;
  Offset: number;
  Limit: number;
}): Promise<{
  total: number;
  list: DeviceFenceInfo[];
}> => {
  const resp: {
    List: (Omit<DeviceFenceInfo, 'FenceArea'> & { FenceArea: string; })[];
    Total: number;
  } = await sdk.requestTokenApi('AppGetFenceList', {
    ProductId,
    DeviceName,
    Offset,
    Limit,
  });

  const list: DeviceFenceInfo[] = resp.List.map((fenceInfo) => {
    let fenceArea: GeoJSON | null;

    try {
      const geoJson = JSON.parse(fenceInfo.FenceArea);

      // 只支持圆围栏
      const isValidFenceArea = Boolean(geoJson)
        && Array.isArray(geoJson.features)
        && Boolean(geoJson.features[0])
        && Boolean(geoJson.features[0].geometry)
        && geoJson.features[0].geometry.type === GeoJSONGeometryType.Point
        && geoJson.features[0].properties
        && geoJson.features[0].properties.subType === GeoJSONGeometrySubType.Circle
        && typeof geoJson.features[0].properties.radius === 'number'
        && Array.isArray(geoJson.features[0].geometry.coordinates)
        && geoJson.features[0].geometry.coordinates.length === 2;

      fenceArea = isValidFenceArea ? geoJson : null;
    } catch (err) {
      fenceArea = null;
    }

    return {
      ...fenceInfo,
      FenceArea: fenceArea,
    };
  });

  return {
    total: resp.Total,
    list,
  };
};

export const createFence = async ({
  ProductId,
  DeviceName,
  FenceName,
  FenceArea,
  FenceDesc,
  AlertCondition,
  FenceEnable,
  Method,
}: {
  ProductId: string;
  DeviceName: string;
  FenceName: string;
  FenceArea: GeoJSON;
  FenceDesc: string;
  AlertCondition: AlertConditionType;
  FenceEnable: boolean;
  Method: AlertMethodType;
}): Promise<void> => {
  return sdk.requestTokenApi('AppCreateFence', {
    ProductId,
    DeviceName,
    FenceName,
    FenceArea: JSON.stringify(FenceArea),
    FenceDesc,
    AlertCondition,
    FenceEnable,
    Method,
  });
};

export const modifyFence = async ({
  ProductId,
  DeviceName,
  FenceId,
  FenceName,
  FenceArea,
  FenceDesc,
  AlertCondition,
  FenceEnable,
  Method,
}: {
  ProductId: string;
  DeviceName: string;
  FenceId: number;
  FenceName: string;
  FenceArea: GeoJSON;
  FenceDesc: string;
  AlertCondition: AlertConditionType;
  FenceEnable: boolean;
  Method: AlertMethodType;
}): Promise<void> => {
  return sdk.requestTokenApi('AppModifyFence', {
    ProductId,
    DeviceName,
    FenceId,
    FenceName,
    FenceArea: JSON.stringify(FenceArea),
    FenceDesc,
    AlertCondition,
    FenceEnable,
    Method,
  });
};

export const deleteFence = async ({
  ProductId,
  DeviceName,
  FenceId,
  AlertCondition,
  FenceEnable,
  Method,
}: {
  ProductId: string;
  DeviceName: string;
  FenceId: number;
  AlertCondition: AlertConditionType;
  FenceEnable: boolean;
  Method: AlertMethodType;
}): Promise<void> => {
  return sdk.requestTokenApi('AppDeleteFence', {
    ProductId,
    DeviceName,
    FenceId,
    AlertCondition,
    FenceEnable,
    Method,
  });
};

export const modifyFenceStatus = async ({
  ProductId,
  DeviceName,
  FenceId,
  AlertCondition,
  FenceEnable,
  Method,
}: {
  ProductId: string;
  DeviceName: string;
  FenceId: number;
  AlertCondition: AlertConditionType;
  FenceEnable: boolean;
  Method: AlertMethodType;
}): Promise<void> => {
  return sdk.requestTokenApi('AppModifyFenceStatus', {
    ProductId,
    DeviceName,
    FenceId,
    AlertCondition,
    FenceEnable,
    Method,
  });
};

export const getFenceEventList = async ({
  ProductId,
  DeviceName,
  FenceId,
  StartTime,
  EndTime,
  Offset,
  Limit,
}: {
  ProductId: string;
  DeviceName: string;
  FenceId: number;
  StartTime: number;
  EndTime: number;
  Offset: number;
  Limit: number;
}): Promise<{
  list: DeviceFenceEvent[];
  total: number;
}> => {
  const resp = await sdk.requestTokenApi('AppGetFenceEventList', {
    ProductId,
    DeviceName,
    FenceId,
    StartTime,
    EndTime,
    Offset,
    Limit,
  });

  return {
    list: resp.List,
    total: resp.Total,
  };
};

export const requestTMapWebService = async ({
  action,
  params = {},
}) => {
  const url = appendParams(`https://apis.map.qq.com/ws/${action}`, {
    ...params,
    key: TMapApiKey,
    output: 'jsonp',
  });

  return new Promise((resolve, reject) => {
    jsonp(url, {
      timeout: 20000,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (!data || data.status !== 0) {
          reject(data);
        } else {
          resolve(data);
        }
      }
    });
  });
}

export const getAddressByLatLng = async ({ lat, lng }) => {
  const resp: any = await requestTMapWebService({
    action: 'geocoder/v1/',
    params: {
      location: `${lat},${lng}`,
    },
  });

  return resp.result;
};

export const getIpLocation = async () => {
  const resp: any = await requestTMapWebService({
    action: 'location/v1/ip',
  });

  return resp.result;
};
