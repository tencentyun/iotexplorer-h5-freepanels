import { Cell } from '@custom/Cell';
import { useTitle } from '@src/hooks/useTitle';
import React, { useRef, useState, useEffect } from 'react';
import { useScene } from '@src/hooks/useScene';
import {Empty}  from '@custom/Empty'
export function SceneList({ history, sdk, log }) {
    // 选择绑定场景列表
    useTitle('手动场景')
    let { query: { groupId }, replace, PATH ,tips} = history;
    log.mi("手动场景id", groupId);
    // TODO 使用系内置
    const [{ scenes, SCENE_API, doScene }] = useScene();
    // const scenes = {
    //     "RequestId": "4r#9XohF@x",
    //     "SceneList": [{
    //         "SceneId": "s_727962b04f47459686ae170b8f21c4e1",
    //         "FamilyId": "f_a513aefafe964f13bfa9f859d3d50728",
    //         "SceneName": "灯带测试",
    //         "SceneIcon": "https://main.qcloudimg.com/raw/06b9530a8f14b4a9fad2fdd7942d18c2.jpeg",
    //         "FilterType": "",
    //         "Actions": [{
    //             "ActionType": 0,
    //             "ProductId": "Q19Z8U71GG",
    //             "DeviceName": "CWLightStripV4",
    //             "GroupId": "",
    //             "Data": "{\"power_switch\":1}"
    //         },
    //         {
    //             "ActionType": 0,
    //             "ProductId": "Q19Z8U71GG",
    //             "DeviceName": "CWLightStripV4",
    //             "GroupId": "",
    //             "Data": "{\"brightness\":49}"
    //         },
    //         {
    //             "ActionType": 0,
    //             "ProductId": "48UDRJSYRU",
    //             "DeviceName": "SwitchTwoV4",
    //             "GroupId": "",
    //             "Data": "{\"power_switch\":1}"
    //         },
    //         {
    //             "ActionType": 0,
    //             "ProductId": "48UDRJSYRU",
    //             "DeviceName": "SwitchTwoV4",
    //             "GroupId": "",
    //             "Data": "{\"scene_switch\":1}"
    //         }],
    //         "UserId": "342974119110774784",
    //         "CreateTime": 1684132575,
    //         "UpdateTime": 1684132905,
    //         "Flag": 0,
    //         "Status": 0
    //     },
    //     {
    //         "SceneId": "s_5f6e1df7213b42c784986ab106188edd",
    //         "FamilyId": "f_a513aefafe964f13bfa9f859d3d50728",
    //         "SceneName": "测试场景",
    //         "SceneIcon": "https://main.qcloudimg.com/raw/8f40b6329330a24faac28cf746a65840.jpeg",
    //         "FilterType": "",
    //         "Actions": [{
    //             "ActionType": 0,
    //             "ProductId": "48UDRJSYRU",
    //             "DeviceName": "SwitchTwoV4",
    //             "GroupId": "",
    //             "Data": "{\"power_switch\":1}"
    //         }],
    //         "UserId": "342974119110774784",
    //         "CreateTime": 1684120625,
    //         "UpdateTime": 1684131954,
    //         "Flag": 0,
    //         "Status": 0
    //     }],
    //     "Total": 2
    // }
    let list = scenes.SceneList;


    const bindScene=(SceneId)=>{
        console.log("执行绑定场景:",SceneId,groupId);
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