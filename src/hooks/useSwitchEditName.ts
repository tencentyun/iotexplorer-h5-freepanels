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
    initData: switchs,
    fetch: async ({ reload = false, id } = {}) => {
      const names = (switchs && JSON.parse(switchs)) || {};
      if (!id && switchs && switchs !== '{}') { // 不重复拉，用localstorage中的数据
        onChangeSwitchNames(names);
        return names;
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const value of switchList) {
        if (id && (id !== value.id)) continue;
        let Configs = [];
        try {
          ({ Configs } = await getModalName({
            DeviceKey: value.id,
          }));
        } catch (err) {
          //
          console.log(err.msg);
        }
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
