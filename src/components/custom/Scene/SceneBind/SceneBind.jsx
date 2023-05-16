import { Cell } from '@custom/Cell';
import { useTitle } from '@src/hooks/useTitle';
import React, { useRef, useState, useEffect } from 'react';
export function SceneBind({ history,sdk, log }) {
    useTitle('绑定场景')
    let { query: { groupId } ,replace,PATH} = history;
    log.mi("绑定组的id", groupId);

    const addNewScene=()=>{
        sdk.goScenePage()
    }

    const BindScene=()=>{
        replace(PATH.SCENE_LIST,{groupId})
    }

    return <div className='scene-bind'>
        <Cell title="添加新场景" onClick={addNewScene}></Cell>
        <Cell title="绑定已有场景" onClick={BindScene}></Cell>
    </div>
}