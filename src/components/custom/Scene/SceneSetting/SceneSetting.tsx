import React, { useEffect } from 'react';
import { Switch } from '@custom/Switch';
import { Toast } from 'antd-mobile';
import useSWR from 'swr';
import { Loading } from '@custom/Loading';

const DEVICE_PROPERTY_SCENE_ID_MAP = 'DEVICE_PROPERTY_SCENE_ID_MAP';

export const SceneSetting = ({
  sdk,
  sceneBtnModeProperty = 'mode_switch_4',
  sceneBtnModeDesc = ['单击时', '双击时', '长按时'],
}) => {
  const {
    data: autoSceneList,
    isLoading,
    mutate: mutateAutoSceneList,
  } = useSWR(['AppGetAutomationList', sceneBtnModeProperty], async () => {
    const { List: autoSceneList } = await sdk.requestTokenApi('AppGetAutomationList', { FamilyId: sdk.familyId });
    return autoSceneList;
  });

  const {
    data: devicePropertySceneIdMap,
    mutate: mutateDeviceConfig,
  } = useSWR(['AppGetDeviceConfig', sceneBtnModeProperty], async () => {
    const result = await sdk.requestTokenApi('AppGetDeviceConfig', {
      DeviceId: sdk.deviceId,
      DeviceKey: DEVICE_PROPERTY_SCENE_ID_MAP,
    });
    return JSON.parse(result.Configs[DEVICE_PROPERTY_SCENE_ID_MAP]);
  });

  useEffect(() => {
    console.log('swr update', devicePropertySceneIdMap, autoSceneList);
  }, [devicePropertySceneIdMap, autoSceneList]);

  const getSceneByProperty = (key) => {
    const sceneId = devicePropertySceneIdMap?.[key];
    return autoSceneList?.find(({ AutomationId }) => AutomationId === sceneId);
  };

  const onSwitchChange = async (sceneInfo) => {
    console.log('onSwitchChange--->', sceneInfo.Status);
    const loadingToast = Toast.show({
      content: '更新中...',
      icon: 'loading',
      maskClickable: false,
      duration: 10,
    });
    await sdk.requestTokenApi('AppModifyAutomationStatus', {
      AutomationId: sceneInfo.AutomationId,
      Status: !!sceneInfo.Status ? 0 : 1,
    });
    await mutateAutoSceneList();
    loadingToast.close();
  };

  const onEditScene = (item) => {
    sdk.goScenePage({
      sceneType: 'auto',
      sceneId: item?.AutomationId,
      scenePreset: { freezeCondition: true },
    });
  };

  const addNewScene = (modeValue) => {
    sdk.h5Websocket.off('message');
    if (!sceneBtnModeProperty) {
      Toast.show({ content: 'sceneBtnModeProperty 为空', icon: 'fail' });
    }

    const handler = async (data) => {
      const { action = '', payload = {} } = data;
      if (action === 'createScene' && payload.status === 'success') {
        const loadingToast = Toast.show({
          content: '更新中...',
          icon: 'loading',
          maskClickable: false,
          duration: 10,
        });
        const DeviceConfigValue = {
          ...devicePropertySceneIdMap,
          [`${sceneBtnModeProperty}__${modeValue}`]: payload.sceneId,
        };
        console.log('关联模式按键=>场景ID', `${sceneBtnModeProperty}__${modeValue}`, payload.sceneId);
        await sdk.requestTokenApi('AppSetDeviceConfig', {
          DeviceId: sdk.deviceId,
          DeviceKey: DEVICE_PROPERTY_SCENE_ID_MAP,
          DeviceValue: JSON.stringify(DeviceConfigValue),
        });
        await mutateAutoSceneList();
        await mutateDeviceConfig();
        loadingToast.close();
      }
    };
    sdk.h5Websocket.on('message', async (data) => {
      await handler(data);
    });
    sdk.goScenePage({
      sceneType: 'auto',
      scenePreset: {
        Conditions: [
          {
            CondType: 0,
            Property: {
              ProductId: sdk.productId,
              DeviceName: sdk.deviceName,
              PropertyId: sceneBtnModeProperty,
              Op: 'eq',
              Value: modeValue,
            },
          },
        ],
        freezeCondition: true,
        freezeAction: false,
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='scene-setting'>
      {sceneBtnModeDesc.map((modeDesc, modeIndex) => {
        const sceneInfo = getSceneByProperty(`${sceneBtnModeProperty}__${modeIndex}`);
        return (
          <div className='sence-group' key={modeIndex}>
            <div className='scene-header'>
              <span>{modeDesc}</span>
            </div>
            {sceneInfo ? (
              <div className='scene-list'>
                <div className='sence-item' onClick={() => onEditScene(sceneInfo)}>
                  <div
                    className='item'
                    style={{ backgroundImage: `url("${sceneInfo.Icon}")` }}
                  >
                    <div className='scene-info-wrap'>
                      <div className='scene-name'>{sceneInfo.Name}</div>
                    </div>
                    <div className='action-span' onClick={e => e.stopPropagation()}>
                      <Switch
                        checked={!!sceneInfo.Status}
                        onChange={async () => onSwitchChange(sceneInfo)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='bind-scene' onClick={() => addNewScene(modeIndex)}>
                <span> + 绑定场景</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
