import React, { useRef, useState, useEffect } from 'react';
import { EditorDialog } from './EditorDialog';
import { Switch } from '@custom/Switch';
import { useScene } from '@src/hooks/useScene';
import { useTitle } from '@src/hooks/useTitle';
import { Empty } from '@custom/Empty';
import { Icon } from '@custom/Icon';


const getSceneData = (deviceData = {}, scenceLength = 3, oScene = {}, currentIndex = 0) => {
  let datas = [];
  for (let i = 0; i < scenceLength; i++) {
    let sceneId = currentIndex ? deviceData?.[`switch${currentIndex}_scene_ids`]?.[i] : deviceData?.switch_scene_ids?.[i];
    datas.push({
      groupName: deviceData?.switch_names?.[i] || '场景按键' + (i + 1),
      groupKey: i,
      data: oScene[sceneId] ? [oScene[sceneId]] : []
    })
  }
  return datas;
}


export const SceneSetting = ({ log, sdk, deviceData, doControlDeviceData, history, scenceLength = 3, scenceAction,isPush = false, currentIndex = 0, isBackHome = false }) => {
  let { replace, PATH, push } = history;
    const [{ scenes ,excuteScene}] = useScene(JSON.stringify(deviceData));
  useTitle('场景设置')
  let senceData = getSceneData(deviceData, scenceLength, scenes?.oScene, currentIndex);

    log.mi("获取到的场景数据:", scenes, scenes?.oScene, senceData);

    const onNameChange = (index, name) => {
        let oldData = JSON.parse(JSON.stringify(deviceData.switch_names || []));
        oldData[index] = name;
        doControlDeviceData('switch_names', oldData);
    }

  const onAddSenceCheck = (index) => {
    isPush ? push(PATH.SCENE_BIND, { groupId: index, isBackHome, currentIndex }) : replace(PATH.SCENE_BIND, { groupId: index, isBackHome, currentIndex });
  }

  const bindScene = (groupId) => {
    isPush ? push(PATH.SCENE_LIST, { groupId, isBackHome, currentIndex }) : replace(PATH.SCENE_LIST, { groupId, isBackHome, currentIndex })
  }


    if (!senceData?.length) return <Empty></Empty>

    log.mi("senceData", senceData);

    const onSwitchChange = (index, checked) => {
        doControlDeviceData('mode_switch' + (index + 1), checked ? 1 : 0);
    }

    // 不是触发物模型 直接执行
    const isExexuteAction = 'excute' === scenceAction;

    // 执行场景
    const excuteScenceAction= async (scence)=>{
        log.mi("执行的场景:",scence);
        let res = await excuteScene(scence);
        tips?.showSuccess('执行成功');
    }

    return <div className='scene-setting'>
        {senceData.map((group, index) => {
            return <div className='sence-group' key={index}>
                <div className='scene-header'>

                    <span>
                        <span>{group.groupName || '-'}</span>
                        {/* <EditorDialog displayName={group.groupName || ''} onOk={onNameChange.bind(null, index)}></EditorDialog> */}
                    </span>

                    {
                        group.data.length ? <Icon name="change" onClick={bindScene.bind(null, index)}></Icon> :
                            <div className="add-icon" onClick={onAddSenceCheck.bind(null, index)} > + </div>
                    }

                </div>
                {group.data.map(item => {
                {/* {[{}].map(item => { */}
                    return <div className='scene-list' key={item?.SceneId}>
                        <div className='sence-item'>
                            <div className='item' style={{ backgroundImage: `url(${item.SceneIcon})` }}>
                                <span>
                                    <div className='scene-name'>{item.SceneName || '-'}</div>
                                    <div className='scene-detail'>{item.deviceCount || 0}个设备</div>
                                </span>
                                <div>
                                    <div className='scene-execute'>
                                        {isExexuteAction}
                                        {
                                            isExexuteAction ?
                                            <div className="execute-btn" onClick={excuteScenceAction.bind(null,item)}>执行</div> :
                                            <Switch checked={!!deviceData['mode_switch' + (index + 1)]} onChange={onSwitchChange.bind(null,index)}></Switch>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                {
                    group.data.length ? null :
                        <div className='bind-scene' onClick={onAddSenceCheck.bind(null, index)}>
                            <span> + 绑定场景</span>
                        </div>
                }
            </div>
        })}

  </div>
}
