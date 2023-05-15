import React, { useRef, useState, useEffect } from 'react';
import { EditorDialog } from './EditorDialog';
import { Switch } from '@custom/Switch';
import { useScene } from '@src/hooks/useScene';

export const SceneSetting = ({ log, sdk }) => {
    // const [{ scenes, SCENE_API, doScene }] = useScene();

    const scenes = {
        "RequestId": "K-_thkFvG_",
        "SceneList": [{
            "SceneId": "s_5f6e1df7213b42c784986ab106188edd",
            "FamilyId": "f_a513aefafe964f13bfa9f859d3d50728",
            "SceneName": "测试场景",
            "SceneIcon": "https://main.qcloudimg.com/raw/8f40b6329330a24faac28cf746a65840.jpeg",
            "FilterType": "",
            "Actions": [{
                "ActionType": 0,
                "ProductId": "48UDRJSYRU",
                "DeviceName": "SwitchTwoV4",
                "GroupId": "",
                "Data": "{\"power_switch\":1}"
            }],
            "UserId": "342974119110774784",
            "CreateTime": 1684120625,
            "UpdateTime": 1684131954,
            "Flag": 0,
            "Status": 0
        }],
        "Total": 1
    };



    log.mi("获取到的场景数据:", scenes)
    log.mi("获取到的场景数据:", JSON.stringify(scenes))

    let senceData = [{
        groupName: "场景按键1",
        data: []
    }, {
        groupName: "场景按键2",
        data: [1]
    }]
    // 根据场景ID获取对应的场景

    const onNameChange = (name) => {
        log.mi('数据的变化', name);
    }



    const getSceneList = () => {

    }

    const onAddSenceCheck = () => {
        console.log("模式选择")
        sdk.goScenePage()
    }



    return <div className='scene-setting'>
        {/* {senceData.map()}  */}
        <div className='sence-group'>
            <div className='scene-header'>
                <span>分组名称</span>
                <EditorDialog displayName={"aaaa"} onOk={onNameChange}></EditorDialog>
                {/* 场景列表 */}
            </div>
            <div className='scene-list'>
                <div className='sence-item'>
                    <div className='item' style={{ backgroundImage: `url(${'https://main.qcloudimg.com/raw/c05e0ef33ff62962a089649800cd5ce9/scene1.jpg'})` }}>
                        <span>
                            <div className='scene-name'>阅读时间</div>
                            <div className='scene-detail'>0个设备内</div>
                        </span>
                        <div>
                            <div className='scene-execute'>
                                <Switch></Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bind-scene' onClick={onAddSenceCheck}>
                <span> + 绑定场景</span>
            </div>
        </div>
    </div>
}