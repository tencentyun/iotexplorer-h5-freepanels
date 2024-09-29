import { t } from '@locales';
import useSWR from 'swr';

export const SWITCH_NAME_MAP = 'SWITCH_NAME_MAP';

const getChineseTextByNum = (num: number) => {
  switch (num) {
    case 0:
      return t('零');
    case 1:
      return t('一');
    case 2:
      return t('二');
    case 3:
      return t('三');
    case 4:
      return t('四');
    default:
      return t('数字错误');
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
        result[propertyKey] = switchNameMap[propertyKey] || `${t('开关')}${getChineseTextByNum(i)}`;
      }

      return result;
    },
  );

  return swrResult;
};
