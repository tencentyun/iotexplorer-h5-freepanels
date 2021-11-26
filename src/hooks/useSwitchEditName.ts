import { getModalName } from '@src/panels/FiveRoadHub/panel-default/models';
import { useAsyncFetch } from './useAsyncFetch';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
export function useSwitchEditName({
  onChangeSwitchNames,
  switchList,
}: {
  onChangeSwitchNames: (names) => void,
  switchList: any[],
}) {
  const switchs = localStorage.getItem(`switchNames${sdk.deviceId}`);
  const [switchNames, { updateAsyncFetch, statusTip }] = useAsyncFetch({
    initData: switchs || {},
    fetch: async ({ reload = false, id } = {}) => {
      const names = (switchs && JSON.parse(switchs)) || {};
      if (!id && switchs) { // 名称只能通过updateAsyncFetch改变然后更新本地缓存中的值
        onChangeSwitchNames(names);
        return names;
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const value of switchList) {
        if (id !== value.id) continue;
        const { Configs } = await getModalName({
          DeviceKey: value.id,
        });
        const name = Configs[value.id] || '';
        names[value.id] = name ? name : value.name;
      }
      localStorage.setItem(`switchNames${sdk.deviceId}`, JSON.stringify(names)); // 缓存
      onChangeSwitchNames(names);
      return names;
    },
  });
  return {
    switchNames,
    statusTip,
    updateAsyncFetch,
  };
}
