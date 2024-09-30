import React from 'react';
import { Switch } from '@custom/Switch';
import { SpinLoading, Toast } from 'antd-mobile';
import useSWR from 'swr';
import { t } from '@locales';

export const SceneSetting = ({
  sdk,
  sceneBtnModeProperty = 'mode_switch_4',
  sceneBtnModeDesc = [t('单击时'), t('双击时'), t('长按时')],
}) => {
  const {
    data: autoSceneList = [],
    isValidating,
    mutate: mutateAutoSceneList,
  } = useSWR(['AllAutoScene'], async () => {
    const { List: autoSceneList = [] } = await sdk.requestTokenApi('AppGetAutomationList', { FamilyId: sdk.familyId });
    await Promise.all(autoSceneList.map(async (autoScene) => {
      const result = await sdk.requestTokenApi('AppDescribeAutomation', { AutomationId: autoScene.AutomationId });
      Object.assign(autoScene, result.Data);
    }));
    console.log('[swr]自动场景列表', autoSceneList);
    return autoSceneList;
  });

  const getSceneByProperty = ({ key, value }) => {
    const matchScene: any[] = [];
    autoSceneList.forEach((scene) => {
      if (scene.Conditions.length === 1) {
        const { ProductId = '', DeviceName = '', Op = '', Value = '', PropertyId = '' } = scene.Conditions[0]?.Property || {};
        if ([
          ProductId === sdk.productId,
          DeviceName === sdk.deviceName,
          Op === 'eq',
          PropertyId === key,
          Value === value,
        ].every(flag => flag)) {
          matchScene.push(scene);
        }
      }
    });

    // console.log(key, matchScene);

    return matchScene;
  };

  const onSwitchChange = async (sceneInfo) => {
    console.log('onSwitchChange--->', sceneInfo.Status);
    const loadingToast = Toast.show({
      content: t('更新中...'),
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
      scenePreset: { freezeCondition: false },
    });
  };

  const addNewScene = (modeValue) => {
    sdk.h5Websocket.off('message');
    if (!sceneBtnModeProperty) {
      Toast.show({ content: 'sceneBtnModeProperty 为空', icon: 'fail' });
    }

    const handler = async (data) => {
      console.log('从腾讯连连返回了!', data);
      mutateAutoSceneList();
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
        freezeCondition: false,
        freezeAction: false,
      },
    });
  };

  return (
    <>
      {isValidating && <SpinLoading style={{ '--size': '24px' }} />}
      <div className='scene-setting'>
        {sceneBtnModeDesc.map((modeDesc, modeIndex) => {
          const sceneList = getSceneByProperty({ key: sceneBtnModeProperty, value: modeIndex });
          return (
            <div className='sence-group' key={modeIndex}>
              <div className='scene-header'>
                <span>{modeDesc}</span>
              </div>
              {sceneList.length ? (
                <div className='scene-list'>
                  {sceneList.map(sceneInfo => (
                    <div key={sceneInfo.AutomationId} className='sence-item' onClick={() => onEditScene(sceneInfo)}>
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
                  ))}
                </div>
              ) : (
                <div className='bind-scene' onClick={() => addNewScene(modeIndex)}>
                  <span> + {t('绑定场景')}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
