import { Cell } from '@custom/Cell';
import { useTitle } from '@src/hooks/useTitle';
import React, { useRef, useState, useEffect } from 'react';
import { useScene } from '@src/hooks/useScene';
import {Empty}  from '@custom/Empty'
export function SceneList({ history, deviceData,doControlDeviceData,sdk, log }) {
    // 选择绑定场景列表
    useTitle('手动场景')
    let { query: { groupId }, replace, PATH ,tips} = history;
    // TODO 使用系内置
    const [{ scenes, SCENE_API, doScene }] = useScene();
   
    let list = scenes?.SceneList;

    const bindScene=(senceId)=>{
        console.log("执行绑定场景:",senceId,groupId);
        let oldData = JSON.parse(JSON.stringify(deviceData.switch_scene_ids || []));
        oldData[groupId] = senceId;
        doControlDeviceData('switch_scene_ids', oldData);
        sdk.tips.showSuccess('绑定成功')
        replace(PATH.SCENE_SETTING)
    }

    if(!list?.length) return <Empty></Empty>

    return <div className='bind-scene-list'>
        <div className='sence-bind-group'>
            {list.map(item => {
                return <div className='scene-bind-list' key={item.SceneId}>
                    <div className='sence-bind-item' onClick={bindScene.bind(null,item.SceneId)}>
                        <div className='item' style={{ backgroundImage: `url(${item.SceneIcon})` }}>
                            <span>
                                <div className='scene-name'>{item.SceneName || '-'}</div>
                                <div className='scene-detail'>{item.deviceCount || 0}个设备</div>
                            </span>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}