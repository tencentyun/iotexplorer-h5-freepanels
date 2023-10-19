import useSWR from 'swr';
import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';
import { useSwitchNum } from '@src/panels-next/ZeroFireSwitch/hooks/useSwitchNum';

export const SWITCH_NAME_MAP = 'SWITCH_NAME_MAP';

const getZhCNTextByNum = (num: number) => {
  switch (num) {
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

export const useSwitchNameMap = () => {
  const switchNum = useSwitchNum();

  const getDefaultSwitchNameMap = (switchNum: number) => {
    const result = {};
    for (let i = 1; i <= switchNum; i++) {
      const propertyKey = `switch_${i}`;
      result[propertyKey] = `开关${getZhCNTextByNum(i)}`;
    }
    return result;
  }

  const swrResult = useSWR<{ [propertyKey: string]: string }>(
    ['AppGetDeviceConfig', SWITCH_NAME_MAP, switchNum],
    async () => {
      const result = {};

      const data = await h5PanelSdk.requestTokenApi('AppGetDeviceConfig', {
        DeviceId: h5PanelSdk.deviceId,
        DeviceKey: SWITCH_NAME_MAP,
      });
      const switchNameMap = JSON.parse(data.Configs[SWITCH_NAME_MAP]) || {};

      for (let i = 1; i <= switchNum; i++) {
        const propertyKey = `switch_${i}`;
        result[propertyKey] = switchNameMap[propertyKey] || `开关${getZhCNTextByNum(i)}`;
      }

      return result;
    },
  );

  return {
    ...swrResult,
    switchNameMap: swrResult.data || getDefaultSwitchNameMap(switchNum),
  };
};

