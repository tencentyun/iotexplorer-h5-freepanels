import { AlertConditionType, AlertMethodType, DeviceFenceEvent, DeviceFenceInfo, DevicePosition } from './types';
import { convertGCJ02ToWGS84, generateCircleFenceArea } from './utils';

// 请前往 https://lbs.qq.com/ 注册并获取腾讯地图 API Key
// 帮助文档: https://lbs.qq.com/faq/accountQuota/faqKey
export const tMapApiKey = '';

// 涉及位置信息的物模型属性
export const locatorThingModalProperties = {
  GPS_Ext: true,
  LBS_BS: true,
  Cell_Info: true,
  GPS_Info: true,
  GPS_ExtInfo: true,
  Wifi_Info: true,
};

// mock 设备数据
const p1 = {
  Latitude: 22.540366,
  Longitude: 113.934559,
};

const p1Address = '广东省深圳市南山区深南大道10000号';

const p2 = {
  Latitude: 22.522807,
  Longitude: 113.935338,
};

export const getMockDeviceLocation = () => ({
  CreateTime: Date.now(),
  Location: p1,
});

export const getMockDeviceLocationHistory = (now: number): DevicePosition[] => [
  {
    Location: p2,
    CreateTime: now - 10 * 60 * 1000,
  },
  {
    Location: p1,
    CreateTime: now - 5 * 60 * 1000,
  },
];

export const getMockDeviceFenceList = (): Array<DeviceFenceInfo> => {
  const now = Date.now();
  const p1Wgs = convertGCJ02ToWGS84([p1.Longitude, p1.Latitude]);

  return [
    {
      FenceId: 1,
      FenceName: '测试围栏',
      FenceDesc: p1Address,
      FenceArea: generateCircleFenceArea({
        lng: p1Wgs[0],
        lat: p1Wgs[1],
      }, 500),
      FenceEnable: true,
      AlertCondition: AlertConditionType.InOrOut,
      Method: AlertMethodType.Push,
      CreateTime: now,
      UpdateTime: now,
    },
  ];
};

export const getMockFenceEventList = (): DeviceFenceEvent[] => {
  const now = Date.now();
  return [
    {
      EventType: AlertConditionType.In,
      CreateTime: now - 5 * 60 * 1000,
    },
    {
      EventType: AlertConditionType.Out,
      CreateTime: now - 10 * 60 * 1000,
    },
  ];
};
