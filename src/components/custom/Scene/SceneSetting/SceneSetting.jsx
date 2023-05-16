import React, { useRef, useState, useEffect } from 'react';
import { EditorDialog } from './EditorDialog';
import { Switch } from '@custom/Switch';
import { useScene } from '@src/hooks/useScene';
import { useTitle } from '@src/hooks/useTitle';
import { Empty } from '@custom/Empty';
import { Icon } from '@custom/Icon';

export const SceneSetting = ({ log, sdk, history }) => {
    let { replace, PATH } = history;
    const [{ scenes, SCENE_API, doScene }] = useScene();
    useTitle('场景设置')
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


    log.mi("获取到的场景数据:", scenes)
    log.mi("获取到的场景数据:", JSON.stringify(scenes))


    // TODO 后面提供物理模型后进行分组
    let list = scenes.SceneList;

    log.mi("场景格式化后的数据:", list)

    // TODO 物理模型进行处理分组

    let senceData = [{
        groupName: "场景按键1",
        groupKey: 'key1',
        data: list
    }, {
        groupName: "场景按键2",
        data: list
    },
    {
        groupName: "场景按键3",
        data: []
    }]

    // 根据场景ID获取对应的场景

    const onNameChange = (index, name) => {
        log.mi('数据的变化', name);
    }


    const onAddSenceCheck = (index) => {
        replace(PATH.SCENE_BIND, { groupId: index });
    }


    if (!senceData?.length) return <Empty></Empty>


    return <div className='scene-setting'>
        {senceData.map((group, index) => {
            return <div className='sence-group' key={index}>
                <div className='scene-header'>

                    <span>
                        <span>{group.groupName || '-'}</span>
                        <EditorDialog displayName={group.groupName || ''} onOk={onNameChange.bind(null, index)}></EditorDialog>
                    </span>

                    {
                        group.data.length ? <Icon name="change" onClick={onAddSenceCheck.bind(null, index)}></Icon> : 
                            <div className="add-icon" onClick={onAddSenceCheck.bind(null, index)} > + </div>
                    }

                </div>
                {group.data.map(item => {
                    return <div className='scene-list' key={item.SceneId}>
                        <div className='sence-item'>
                            <div className='item' style={{ backgroundImage: `url(${item.SceneIcon})` }}>
                                <span>
                                    <div className='scene-name'>{item.SceneName || '-'}</div>
                                    <div className='scene-detail'>{item.deviceCount || 0}个设备</div>
                                </span>
                                <div>
                                    <div className='scene-execute'>
                                        <Switch></Switch>
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