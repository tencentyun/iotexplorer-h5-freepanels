import React, { useRef, useState, useEffect } from 'react';
import { EditorDialog } from './EditorDialog';
import { Switch } from '@custom/Switch';
import { useSceneAuto } from '@src/hooks/useSceneAuto';
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



export const SceneSetting = ({ log, sdk, deviceConfigData, doDeviceConfigData, history, scenceLength = 3, scenceAction, isPush = false, currentIndex = 0, isBackHome = false }) => {

    // 设备操作数据
    const doControlDeviceData = doDeviceConfigData;
    const deviceData = deviceConfigData;

    let { replace, PATH, push } = history;
    const [{ scenes, excuteScene, doScene, refreshSceneList }] = useSceneAuto(JSON.stringify(deviceData));
    useTitle('场景设置')
    let senceData = getSceneData(deviceData, scenceLength, scenes?.oScene, currentIndex);

    log.mi("获取到的场景数据:", {scenes, oScene:scenes?.oScene, senceData,currentIndex,deviceConfigData});

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


    // 更新或者删除
    const addEmit = (PositionIndex) => {
        sdk.h5Websocket.off('message'); // 关闭监听
        log.mi('--------------绑定监听----------PositionIndex:', PositionIndex)
        sdk.h5Websocket.on('message', ((groupId,data) => {
            // log.mi('--------------------------------app--SceneSetting----------------+++++h5 msg++++:', { groupId, action: data?.action, data, deviceData })
            if (data?.action === 'deleteScene') {
                let senceId = data?.payload?.sceneId;
                log.mi('--------------内部--app------------------+++++h5 deleteScene msg++++:', { groupId, senceId, data, deviceData })
                if (senceId) {
                    log.mi("删除场景成功", senceId, data, groupId)
                    // 删除直接刷新
                    refreshSceneList();
                } else {
                    log.mi("删除场景失败", data)
                }
            } else if (data?.action === 'editScene') {
                refreshSceneList();
            } else if (data?.action === 'createScene') {
                let senceId = data?.payload?.sceneId;
                log.mi('--------------内部--app------------------+++++h5  createScene msg++++:', { groupId, senceId, data, deviceData })
                if (senceId) {
                    log.mi("创建场景成功", {senceId, data, groupId,currentIndex})
                    let oldData = JSON.parse(JSON.stringify(deviceData?.switch_scene_ids || []));
                    oldData[groupId] = senceId;
                    doControlDeviceData("switch_scene_ids",oldData);
                    refreshSceneList();
                } else {
                    log.mi("创建场景失败", data)
                }
            } else {
            }
        }).bind(null,PositionIndex));
    }


    if (!senceData?.length) return <Empty></Empty>

    log.mi("senceData", senceData);

    const onSwitchChange = (index, item, checked, e) => {
        console.log("onSwitchChange--->", index, item, checked, e, e.target)
        e.stopPropagation();
        e.preventDefault()
        doScene(({ AutomationId: item?.SceneId, Status: checked ? 0 : 1 }))
    }

    // 不是触发物模型 直接执行
    const isExexuteAction = 'excute' === scenceAction;

    // 执行场景
    const excuteScenceAction = async (scence) => {
        log.mi("执行的场景:", scence);
        let res = await excuteScene(scence);
        tips?.showSuccess('执行成功');
    }

    const editScenceAction = async (scence) => {
        log.mi("执行的场景:", scence);
        let res = await excuteScene(scence);
        tips?.showSuccess('执行成功');
    }

    const onEditAction = (item, groupId, e) => {
        console.log("-------------onEditAction", e.target.className)
        addEmit(groupId);
        sdk.goScenePage({ type: "auto", AutomationId: item?.SceneId, sceneId: item?.SceneId }) // TODO 目前需要手动选择

    }

    const addNewScene = (groupId) => {
        addEmit(groupId);
        sdk.goScenePage({ type: "auto" })
    }

    return <div className='scene-setting'>
        {senceData.map((group, index) => {
            return <div className='sence-group' key={index}>
                <div className='scene-header'>

                    <span>
                        <span>{group.groupName || '-'}</span>
                        {/* <EditorDialog displayName={group.groupName || ''} onOk={onNameChange.bind(null, index)}></EditorDialog> */}
                    </span>
                    {/* 暂时不需要添加 */}
                    {/* {
                        group.data.length ? <Icon name="change" onClick={bindScene.bind(null, index)}></Icon> :
                            <div className="add-icon" onClick={onAddSenceCheck.bind(null, index)} > + </div>
                    } */}

                </div>
                {group.data.map(item => {
                    {/* {[{}].map(item => { */ }
                    return <div className='scene-list' key={item?.SceneId}>
                        <div className='sence-item' onClick={onEditAction.bind(null, item, index)}>
                            <div className='item' style={{ backgroundImage: `url(${item.SceneIcon})` }}>
                                <span>
                                    <div className='scene-name'>{item.SceneName || '-'}</div>
                                    <div className='scene-detail'>{item.deviceCount || 0}个设备</div>
                                </span>
                                <div className="action-span" onClick={(e) => {
                                    onSwitchChange(index, item, item?.Status === 1, e)
                                }}>
                                    <div className='scene-execute'>
                                        {isExexuteAction}
                                        {
                                            isExexuteAction ?
                                                <div className="execute-btn" onClick={excuteScenceAction.bind(null, item)}>执行</div> :
                                                <Switch checked={item?.Status === 1}></Switch>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                {
                    group.data.length ? null :
                        <div className='bind-scene' onClick={() => addNewScene(index)}>
                            <span> + 绑定场景</span>
                        </div>
                }
            </div>
        })}

    </div>
}