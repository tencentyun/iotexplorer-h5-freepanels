import React from 'react';
import { Switch } from '@custom/Switch';
import { useSceneAuto } from '@src/hooks/useSceneAuto';
import { useTitle } from '@src/hooks/useTitle';
import { Empty } from '@custom/Empty';

const getSceneData = (deviceConfigData = {}, sceneLength = 3, oScene = {}, currentIndex = 0, groupNames = []) => {
  const datas = [];
  for (let i = 0; i < sceneLength; i++) {
    const sceneId = currentIndex ? deviceConfigData?.[`switch${currentIndex}_scene_ids`]?.[i] : deviceConfigData?.switch_scene_ids?.[i];
    datas.push({
      groupName: groupNames[i] || deviceConfigData?.switch_names?.[i] || `场景按键${i + 1}`,
      groupKey: i,
      data: oScene[sceneId] ? [oScene[sceneId]] : [],
    });
  }
  return datas;
};

export const SceneSetting = ({
  log,
  sdk,
  deviceConfigData,
  doDeviceConfigData,
  sceneLength = 3,
  currentIndex = 0,
  groupNames,
}) => {
  const [{ scenes, doScene, refreshSceneList }] = useSceneAuto(JSON.stringify(deviceConfigData));
  useTitle('场景设置');
  const sceneData = getSceneData(deviceConfigData, sceneLength, scenes?.oScene, currentIndex, groupNames);

  log.mi('获取到的场景数据:', { scenes, oScene: scenes?.oScene, sceneData, currentIndex, deviceConfigData });

  // 更新或者删除
  const addEmit = (PositionIndex) => {
    sdk.h5Websocket.off('message'); // 关闭监听
    log.mi('--------------绑定监听----------PositionIndex:', PositionIndex);
    sdk.h5Websocket.on('message', ((groupId, data) => {
      if (data?.action === 'deleteScene') {
        const senceId = data?.payload?.sceneId;
        log.mi('--------------内部--app------------------+++++h5 deleteScene msg++++:', {
          groupId,
          senceId,
          data,
          deviceConfigData,
        });
        if (senceId) {
          log.mi('删除场景成功', senceId, data, groupId);
          // 删除直接刷新
          refreshSceneList();
        } else {
          log.mi('删除场景失败', data);
        }
      } else if (data?.action === 'editScene') {
        refreshSceneList();
      } else if (data?.action === 'createScene') {
        const senceId = data?.payload?.sceneId;
        log.mi('--------------内部--app------------------+++++h5  createScene msg++++:', {
          groupId,
          senceId,
          data,
          deviceConfigData,
        });
        if (senceId) {
          log.mi('创建场景成功', { senceId, data, groupId, currentIndex });
          const oldData = JSON.parse(JSON.stringify(deviceConfigData?.switch_scene_ids || []));
          oldData[groupId] = senceId;
          doDeviceConfigData('switch_scene_ids', oldData);
          refreshSceneList();
        } else {
          log.mi('创建场景失败', data);
        }
      }
    }).bind(null, PositionIndex));
  };

  if (!sceneData?.length) return <Empty></Empty>;

  log.mi('sceneData', sceneData);

  const onSwitchChange = (index, item, checked, e) => {
    console.log('onSwitchChange--->', index, item, checked, e, e.target);
    e.stopPropagation();
    e.preventDefault();
    doScene(({ AutomationId: item?.SceneId, Status: checked ? 0 : 1 }));
  };

  const onEditAction = (item, groupId, e) => {
    console.log('-------------onEditAction', e.target.className);
    addEmit(groupId);
    sdk.goScenePage({ type: 'auto', AutomationId: item?.SceneId, sceneId: item?.SceneId }); // TODO 目前需要手动选择
  };

  const addNewScene = (groupId) => {
    addEmit(groupId);
    sdk.goScenePage({ type: 'auto' });
  };

  return (
    <div className='scene-setting'>
      {sceneData.map((group, index) => (
        <div className='sence-group' key={index}>
          <div className='scene-header'>
            <span>{group.groupName || '-'}dev</span>
          </div>
          {group.data.map(item => (
            <div className='scene-list' key={item?.SceneId}>
              <div className='sence-item' onClick={onEditAction.bind(null, item, index)}>
                <div className='item' style={{ backgroundImage: `url(${item.SceneIcon})` }}>
                  <div className='scene-info-wrap'>
                    <div className='scene-name'>{item.SceneName || '-'}</div>
                    <div className='scene-detail'>{item.deviceCount || 0}个设备</div>
                  </div>
                  <div
                    className='action-span'
                    onClick={(e) => {
                      onSwitchChange(index, item, item?.Status === 1, e);
                    }}
                  >
                    <Switch checked={item?.Status === 1} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!group.data.length && (
            <div className='bind-scene' onClick={() => addNewScene(index)}>
              <span> + 绑定场景dev</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
