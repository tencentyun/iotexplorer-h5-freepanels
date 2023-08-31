import useSWR from 'swr';

export const SWITCH_NAME_MAP = 'SWITCH_NAME_MAP';

const getChineseTextByNum = (num: number) => {
  switch (num) {
    case 0:
      return '零';
    case 1:
      return '一';
    case 2:
      return '二';
    case 3:
      return '三';
    case 4:
      return '四';
    default:
      return '数字错误';
  }
};

export const useSwitchNameMap = ({ switchNum, sdk }) => {
  const swrResult = useSWR<{ [propertyKey: string]: string }>(
    ['AppGetDeviceConfig', SWITCH_NAME_MAP, switchNum],
    async () => {
      const result = {};

      const data = await sdk.requestTokenApi('AppGetDeviceConfig', {
        DeviceId: sdk.deviceId,
        DeviceKey: SWITCH_NAME_MAP,
      });
      const switchNameMap = JSON.parse(data.Configs[SWITCH_NAME_MAP]) || {};

      for (let i = 1; i <= switchNum; i++) {
        const propertyKey = `switch_${i}`;
        result[propertyKey] = switchNameMap[propertyKey] || `开关${getChineseTextByNum(i)}`;
      }

      return result;
    },
  );

  return swrResult;
};
