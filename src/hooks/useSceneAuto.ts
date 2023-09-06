// 自动化场景
import { useEffect, useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

const SCENE_API = {
  UPDATE: 'AppModifyAutomationStatus',
  LIST: 'AppGetAutomationList',
  DETAIL: 'AppDescribeAutomation',
  DELETE: 'AppDeleteScene',
  EXECUTE: 'AppRunScene',
};


const testData = {
  RequestId: 'KS0U5ahUk', SceneList: [
    {
      SceneId: 's_5b4ed698795a46ec94f991944ec59819',
      FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728',
      SceneName: 'a111',
      SceneIcon: 'https://main.qcloudimg.com/raw/a699919a2d7df048757facf781f9449e/scene2.jpg',
      FilterType: '',
      Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":1}' }],
      UserId: '342974119110774784', CreateTime: 1684658774, UpdateTime: 1684659021, Flag: 0, Status: 0,
    },
    { SceneId: 's_dc1722d9e1b8416fab7cbf64b8540f00', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: 'i', SceneIcon: 'https://main.qcloudimg.com/raw/06b9530a8f14b4a9fad2fdd7942d18c2.jpeg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":0}' }], UserId: '342974119110774784', CreateTime: 1684488170, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_070382f4ad59440f859f3dbb7e5374ca', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: '99', SceneIcon: 'https://main.qcloudimg.com/raw/8f40b6329330a24faac28cf746a65840.jpeg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":0}' }], UserId: '342974119110774784', CreateTime: 1684487914, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_9515bc3dbb164939a931c838e9ae5908', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: '12', SceneIcon: 'https://main.qcloudimg.com/raw/c05e0ef33ff62962a089649800cd5ce9/scene1.jpg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":0}' }], UserId: '342974119110774784', CreateTime: 1684487803, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_c2361370a91144b1bf67d9044e499f9f', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: '66', SceneIcon: 'https://main.qcloudimg.com/raw/06b9530a8f14b4a9fad2fdd7942d18c2.jpeg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":0}' }], UserId: '342974119110774784', CreateTime: 1684486351, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_f8d330f9f8be4772a9d5b7e5ba45cb01', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: 'aa', SceneIcon: 'https://main.qcloudimg.com/raw/493cd8e417bb990c3662f5689bf32074/scene4.jpg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":0}' }], UserId: '342974119110774784', CreateTime: 1684483405, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_b31a42889a97491d904b417c18231da2', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: '1', SceneIcon: 'https://main.qcloudimg.com/raw/493cd8e417bb990c3662f5689bf32074/scene4.jpg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":0}' }], UserId: '342974119110774784', CreateTime: 1684483086, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_639b3370c2ac43798ef895beeae2f2a7', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: '跳转1', SceneIcon: 'https://main.qcloudimg.com/raw/06b9530a8f14b4a9fad2fdd7942d18c2.jpeg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":1}' }], UserId: '342974119110774784', CreateTime: 1684482515, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_9e82151ee53648efbc06d13eb138393e', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: 'test4', SceneIcon: 'https://main.qcloudimg.com/raw/c47ad1752ab181f2d76ee62474a9ab8e.jpeg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":1}' }], UserId: '342974119110774784', CreateTime: 1684389287, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_aa91fe41503d41a4836b5bb63fc103c5', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: '测试场景1', SceneIcon: 'https://main.qcloudimg.com/raw/a383821b3bf8eab99ccc4e51935bbf95/scene5.jpg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":1}' }, { ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"switch_1":1}' }], UserId: '342974119110774784', CreateTime: 1684388941, UpdateTime: 1684658743, Flag: 0, Status: 0 }, { SceneId: 's_727962b04f47459686ae170b8f21c4e1', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: '灯带测试', SceneIcon: 'https://main.qcloudimg.com/raw/06b9530a8f14b4a9fad2fdd7942d18c2.jpeg', FilterType: '', Actions: [{ ActionType: 0, ProductId: 'Q19Z8U71GG', DeviceName: 'CWLightStripV4', GroupId: '', Data: '{"power_switch":1}' }, { ActionType: 0, ProductId: 'Q19Z8U71GG', DeviceName: 'CWLightStripV4', GroupId: '', Data: '{"brightness":49}' }, { ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":1}' }, { ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"scene_switch":1}' }], UserId: '342974119110774784', CreateTime: 1684132575, UpdateTime: 1684658743, Flag: 0, Status: 0 }, {
      SceneId: 's_5f6e1df7213b42c784986ab106188edd', FamilyId: 'f_a513aefafe964f13bfa9f859d3d50728', SceneName: '测试场景', SceneIcon: 'https://main.qcloudimg.com/raw/8f40b6329330a24faac28cf746a65840.jpeg', FilterType: '', Actions: [{ ActionType: 0, ProductId: '48UDRJSYRU', DeviceName: 'SwitchTwoV4', GroupId: '', Data: '{"power_switch":1}' }],
      UserId: '342974119110774784', CreateTime: 1684120625, UpdateTime: 1684658743, Flag: 0, Status: 0,
    }], Total: 12,
};

// 自动化数据测试
const testAutoData = {
  List: [
    {
      AutomationId: 'a_cb6a39ee5b864f3db6baf3f1c5aa24ea',
      Icon: 'https://qcloudimg.tencent-cloud.cn/raw/364a67ef4a2fe06307e521ebc97ed5c2.png',
      Name: 'aaa',
      Status: 1,
    },
    {
      AutomationId: 'a_8179738d40ca4915985f2ff7becf857d',
      Icon: 'https://main.qcloudimg.com/raw/5f9afaeee1639558d24fe3bf5a538e64.jpeg',
      Name: '自动测试',
      Status: 1,
    },
  ],
  RequestId: 'u%2NWK-vM',
};


const transData = autoData => (autoData || []).map(item => ({
  ...item,
  SceneId: item?.AutomationId,
  SceneIcon: item?.Icon,
  SceneName: item?.Name,
}));

export const requestTokenApi = (action: string, data = {} as any) => {
  const { FamilyId } = sdk.deviceInfo;
  const param = {
    FamilyId,
    ...data,
  };
  console.log('requestTokenApi==============', action, param);
  return sdk.requestTokenApi(action, param);
};


export const useSceneAuto = (key) => {
  const [scenes, setScenes] = useState({});

  useEffect(() => {
    refreshSceneList();
  }, [key]);

  // 转换需要的数据
  const totalDevice = (Actions) => {
    if (Actions && Actions.length) {
      const keys = [];
      Actions.forEach((element: any) => {
        keys.push(element?.DeviceName);
      });
      return [... new Set(keys)].filter(v => !!v).length;
    }
    return 0;
  };


  const getDetail = async (list) => {
    const promises = [];
    list.forEach((item) => {
      item?.AutomationId && promises.push(requestTokenApi(SCENE_API.DETAIL, { AutomationId: item?.AutomationId }));
    });

    const res = await Promise.all(promises);
    return res.map(item => item?.Data);
  };


  const refreshSceneList = async () => {
    const autoLists = await requestTokenApi(SCENE_API.LIST);
    console.log('自动场景的获取数据', autoLists);

    // 获取设备统计数量 即设备详情
    const details = await getDetail(autoLists.List);

    // const autoList = testAutoData;
    // 转换自动数据和手动一致
    const sceneList = {
      ...autoLists,
      SceneList: transData(details),
    };

    console.log('转换前后的数据', details, sceneList);

    const oScene = {};
    const list = sceneList.SceneList.map((item) => {
      const newItem = { ...item, deviceCount: totalDevice(item.Actions) };
      oScene[item.SceneId] = newItem;
      return newItem;
    });

    const result = { ...sceneList, SceneList: list, oScene };
    setScenes(result);
    console.log('requestTokenApi===== SceneAuotList =========', result);
  };


  const doScene = async (data = {} as any, action?: string) => {
    const param = {
      ...data,
    };
    const result = await requestTokenApi(action || SCENE_API.UPDATE, param);
    console.log('requestTokenApi===== doScene =========', result);
    await refreshSceneList();
    return result;
  };

  const excuteScene = async (scene, data = {}) => {
    const Action = SCENE_API.EXECUTE;
    const param = {
      Action,
      SceneId: scene?.SceneId,
      ...data,
    };

    const result = await sdk.requestTokenApi(Action, param);
    console.log('requestTokenApi===== excuteScene =========', Action, param, result);
  };

  return [{ scenes, SCENE_API, doScene, excuteScene, refreshSceneList }];
};
