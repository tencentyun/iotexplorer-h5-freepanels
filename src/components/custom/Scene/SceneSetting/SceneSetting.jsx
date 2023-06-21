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



export const SceneSetting = ({ log, sdk, deviceData, doControlDeviceData, history, scenceLength = 3, scenceAction, isPush = false, currentIndex = 0, isBackHome = false }) => {
    let { replace, PATH, push } = history;
    const [{ scenes, excuteScene, doScene, refreshSceneList }] = useSceneAuto(JSON.stringify(deviceData));
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


    // 更新或者删除
    const addUpdateEmit = (groupId) => {
        sdk.h5Websocket.on('message', (data) => {
            log.mi('--------------------------------app--SceneSetting----------------+++++h5 msg++++:', { groupId, action: data?.action, data, deviceData })
            if (data?.action === 'deleteScene') {
                let senceId = data?.payload?.sceneId;
                log.mi('--------------内部--app------------------+++++h5 msg++++:', { groupId, senceId, data, deviceData })
                if (senceId) {
                    log.mi("删除场景成功", senceId, data, groupId)
                    // 执行跳转到设置页面
                    // 设计绑定的数据
                    let oldData = JSON.parse(
                        JSON.stringify(
                            (!!JSON.parse(currentIndex) ? deviceData?.[`switch${currentIndex}_scene_ids`] : deviceData?.switch_scene_ids) || []
                        )
                    );
                    // 删除
                    delete oldData[groupId];
                    log.mi("数据处理:", deviceData, oldData, senceId, data?.payload, replace, PATH.SCENE_SETTING, doControlDeviceData)
                    doControlDeviceData(!!JSON.parse(currentIndex) ? `switch${currentIndex}_scene_ids` : 'switch_scene_ids', oldData);
                    refreshSceneList();
                } else {
                    log.mi("删除场景失败", data)
                }
            } else if (data?.action === 'editScene') {
                let senceId = data?.payload?.sceneId;
                refreshSceneList();
            } else {
                // 兼容两层跳转
                if (data?.action === 'pageShow') {
                    // 调整到设置页面
                    replace(JSON.parse(isBackHome) ? PATH.HOME : PATH.SCENE_SETTING, { tabIndex: JSON.parse(currentIndex) || 1 });
                }
            }
        });
    }


    if (!senceData?.length) return <Empty></Empty>

    log.mi("senceData", senceData);

    const onSwitchChange = (index, item, checked) => {
        // doControlDeviceData('mode_switch' + (index + 1), checked ? 1 : 0);

        doScene(({ AutomationId: item?.SceneId, Status: checked ? 1 : 0 }))
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
        if (e.target.className === 'adm-switch-checkbox') return;
        addUpdateEmit(groupId);
        sdk.goScenePage({ type: "auto", AutomationId: item?.SceneId, sceneId: item?.SceneId }) // TODO 目前需要手动选择
        // setIsShowPage(false);
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
                                <div>
                                    <div className='scene-execute'>
                                        {isExexuteAction}
                                        {
                                            isExexuteAction ?
                                                <div className="execute-btn" onClick={excuteScenceAction.bind(null, item)}>执行</div> :
                                                <Switch checked={item?.Status === 1} onChange={onSwitchChange.bind(null, index, item)}></Switch>
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