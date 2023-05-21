import { Cell } from '@custom/Cell';
import { useTitle } from '@src/hooks/useTitle';
import React, { useRef, useState, useEffect } from 'react';
export function SceneBind({ history, sdk, log }) {
    useTitle('绑定场景')
    let { query: { groupId }, replace, PATH } = history;

    const addEmit = (groupId) => {
        // 目前只能在提供的场景测试上可以进行触发
        sdk.h5Websocket.on('message', (data) => {
            let senceId = data?.payload?.sceneId;
            log.mi('--------------测试环境可以触发------------------app------------------+++++h5 msg++++:', senceId, data, groupId)
            if (senceId) {
                log.mi("创建场景成功", senceId, data, groupId)
                // 执行跳转到设置页面
                // 设计绑定的数据
                let oldData = JSON.parse(JSON.stringify(deviceData.switch_scene_ids || []));
                oldData[groupId] = senceId;
                doControlDeviceData('switch_scene_ids', oldData);
                // 调整到设置页面
                replace(PATH.SCENE_SETTING);
            } else {
                log.mi("创建场景失败", data)
            }
        });
    }


    const addNewScene = () => {
        addEmit(groupId);
        sdk.goScenePage({ type: "manual" })
    }

    const BindScene = () => {
        replace(PATH.SCENE_LIST, { groupId })
    }

    return <div className='scene-bind'>
        <Cell title="添加新场景" onClick={addNewScene}></Cell>
        <Cell title="绑定已有场景" onClick={BindScene}></Cell>
    </div>
}