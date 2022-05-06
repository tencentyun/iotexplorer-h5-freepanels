import { getModalName, modifyModalName } from '@src/panels/FiveRoadHub/panel-default/models';
import { useEffect, useState } from 'react';
import { useAsyncFetch } from './useAsyncFetch';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function useSwitchEditName({
  switchList,
  deviceId = sdk.deviceId,
}: {
  switchList: any[],
  deviceId?: string;
}) {
  const deviceKey = `switch_name_map_${deviceId}`;
  const initState = switchList.reduce((prev, current) => ({
    ...prev,
    [current.id]: current.name,
  }), {});
  console.log({ switchList });
  const [switchNames, setSwitchNames] = useState(initState);

  const [res, { statusTip }] = useAsyncFetch({
    initData: switchNames,
    fetch: async () => {
      try {
        const { Configs } =  await getModalName({
          DeviceKey: deviceKey,
        });
        return Configs;
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    if (res.data[deviceKey]) {
      setSwitchNames(JSON.parse(res.data[deviceKey]));
    }
  }, [res.data, deviceKey]);

  const updateSwitchNames = (nameConfig: Record<string, string>) => {
    const newSwitchNames = {
      ...switchNames,
      ...nameConfig,
    };
    modifyModalName({
      DeviceKey: deviceKey,
      DeviceValue: JSON.stringify(newSwitchNames),
    }).then(() => {
      setSwitchNames(newSwitchNames);
    })
      .catch((err) => {
        console.error('修改失败', err);
        sdk.tips.showError('修改失败');
      });
  };
  return {
    switchNames,
    updateSwitchNames,
    statusTip,
  };
}
