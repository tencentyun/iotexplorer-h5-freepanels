import { Cell } from '@custom/Cell';
import { useTitle } from '@src/hooks/useTitle';
import React, { useRef, useState, useEffect } from 'react';
import { t } from '@locales';

export function SceneBind({ history, sdk, log, deviceData, doControlDeviceData }) {
  useTitle(t('绑定场景'));
  const { query: { groupId, isBackHome, currentIndex }, replace, PATH, push } = history;
  // 兼容两层跳转
  const [isShowPage, setIsShowPage] = useState(true);

  const addEmit = (groupId) => {
    // 目前只能在提供的场景测试上可以进行触发

    sdk.h5Websocket.on('message', (data) => {
      log.mi('--------------------------------app---SceneBind---------------+++++h5 msg++++:', { groupId, action: data?.action, data, deviceData });
      if (data?.action === 'createScene') {
        const senceId = data?.payload?.sceneId;
        log.mi('--------------内部--app------------------+++++h5 msg++++:', { groupId, senceId, data, deviceData });
        if (senceId) {
          log.mi(t('创建场景成功'), senceId, data, groupId);
          // 执行跳转到设置页面
          // 设计绑定的数据
          const oldData = JSON.parse(JSON.stringify((!!JSON.parse(currentIndex) ? deviceData?.[`switch${currentIndex}_scene_ids`] : deviceData?.switch_scene_ids) || []));
          oldData[groupId] = senceId;
          // 调整到设置页面
          // log.mi("数据处理:", deviceData, oldData, senceId, data?.payload, replace, PATH.SCENE_SETTING,doControlDeviceData)

          doControlDeviceData(!!JSON.parse(currentIndex) ? `switch${currentIndex}_scene_ids` : 'switch_scene_ids', oldData);
          // replace(PATH.SCENE_SETTING);
        } else {
          log.mi(t('创建场景失败'), data);
        }
      } else {
        // 兼容两层跳转
        if (data?.action === 'pageShow') {
          // 调整到设置页面
          replace(JSON.parse(isBackHome) ? PATH.HOME : PATH.SCENE_SETTING, { tabIndex: JSON.parse(currentIndex) || 1 });
        }
      }
    });
  };

  const test = (data) => {
    const senceId = data?.payload?.sceneId;
    log.mi(t('创建场景成功'), senceId, data, groupId);
    // 执行跳转到设置页面
    // 设计绑定的数据
    const oldData = JSON.parse(JSON.stringify(deviceData?.switch_scene_ids || []));
    oldData[groupId] = senceId;
    doControlDeviceData('switch_scene_ids', oldData);
    // 调整到设置页面
    log.mi(t('数据处理:'), deviceData, oldData, senceId, data?.payload, replace, PATH.SCENE_SETTING);
    replace(PATH.SCENE_SETTING);
  };

  // test({payload:{sceneId:123}})

  const addNewScene = () => {
    // addEmit(groupId);
    // sdk.goScenePage({ type: "auto" })
    sdk.goScenePage({ type: 'auto' });
    setIsShowPage(false);
  };

  const BindScene = () => {
    replace(PATH.SCENE_LIST, { groupId, isBackHome, currentIndex });
  };

  if (!isShowPage) return null;

  return <div className='scene-bind'>
    <Cell title={t('添加新场景')} onClick={addNewScene}></Cell>
    <Cell title={t('绑定已有场景')} onClick={BindScene}></Cell>
  </div>;
}
