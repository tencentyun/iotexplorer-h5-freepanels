import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';

/**
 * 提示内容
 */
export function Notice({ deviceData:{ alarm_actives,muffling },templateMap, doControlDeviceData,productInfo, history, deviceInfo }) {

    // 使用物模型定义
    let ALARM_ACTIVES = templateMap?.alarm_actives?.define?.mapping || {};

    // 是否显示 提示
    let isShow = !!alarm_actives;
    if (!isShow) return null;
    let isDoor = alarm_actives == 1;
    let level = isDoor ? 'normal' : 'warn'; // 门铃生
    let message = isDoor ? "当前门铃响起>" : `当前${ALARM_ACTIVES[alarm_actives].replace('告警_', '')}中 >`;
    let cls = `item ${level}`;

    return (
        <div className='notice'>
            <div className={cls}>
                <div className='front'>
                    <div className='alarIcon'>
                        <Icon className="custom-icon" name="notice"></Icon>
                    </div>
                    <div className='text'>
                        {message}
                    </div>
                </div>
                <div className='voice' onClick={()=>doControlDeviceData("muffling",!muffling)}>
                    <Icon className="custom-icon" name={muffling ? "voice-close" : "voice-open"}></Icon>
                </div>
            </div>
        </div>
    )
}
