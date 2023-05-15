
import { useEffect, useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

const SCENE_API = {
  UPDATE: 'AppModifyScene',
  LIST: 'AppGetSceneList',
  DELETE: 'AppDeleteScene',
};

export const requestTokenApi = (action: string, data = {} as any) => {
  const { ProductId, DeviceName, UserID, FamilyId } = sdk.deviceInfo;
  let param = {
    // UserID,
    // ProductId,
    // DeviceName,
    FamilyId,
    Offset: 0,
    Limit: 50,
    ...data,
  };
  console.log('requestTokenApi==============', action, param);
  return sdk.requestTokenApi(action, param);
};

export const useScene = () => {

  const [scenes, setScenes] = useState({});

  useEffect(() => {
    refreshSceneList();
  }, []);

  // 转换需要的数据
  const totalDevice = (Actions) => {
    if (Actions && Actions.length) {
      let keys = [];
      Actions.forEach(element: any => {
        keys.push(element?.DeviceName)
      });
      return [... new Set(keys)].filter(v => !!v).length;
    }
    return 0;
  }

  const refreshSceneList = async () => {
    const sceneList = await requestTokenApi(SCENE_API.LIST);

    let list = sceneList.SceneList.map((item) => {
      return { ...item, deviceCount: totalDevice(item.Actions) }
    })
    
    let result = { ...sceneList, SceneList: list };
    setScenes(result);

    console.log('requestTokenApi===== SceneList =========', result);
  };


  const doScene = async (action: string, data = {} as any) => {
    const result = await requestTokenApi(action, data);
    await refreshSceneList();
    return result;
  };

  return [{ scenes, SCENE_API, doScene }];
};
