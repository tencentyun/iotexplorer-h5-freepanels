import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { LightBright } from '@custom/LightBright';

/**
 * 系统声音
 */
export function Voice({ deviceData: { sys_vol }, templateMap, doControlDeviceData, productInfo, history, deviceInfo }) {

    // 声音的高中低 对应值   "0": "低", "1": "中","2": "高";
    // 对应 30 50 70
    const DIY_VALUE = {
        0: 30,
        1: 50,
        2: 70,
    };
    const [value, setValue] = useState(DIY_VALUE[guard_vol || 0]);

    const getVolValue = (scrollValue) => {
        // 区间范围  
        if (scrollValue < 33) return 0;
        if (scrollValue > 66) return 2;
        return 1;
    }

    const onEnd = (scrollValue) => {
        let level = getVolValue(scrollValue);
        // setValue(scrollValue);
        window.level = level;
        doControlDeviceData('guard_vol', level);
    }


    useEffect(() => {
        // 值不在区间范围内 则进行设置当为
        // let level = getVolValue[value];
        if (guard_vol === window.level) return  // 内部变更的时候 不调整滚动条
        setValue(DIY_VALUE[guard_vol])
        window.level = guard_vol;
    }, [guard_vol])

    return (
        <div className='voice'>
            <div className="item">
                <div className='front'>
                    <Icon className="custom-icon" name="voice"></Icon>
                </div>
                <div className='scrool-bar'>
                    <LightBright
                        defaultValue={value || 0}
                        value={value}
                        status={true}
                        minValue={1}
                        maxValue={100}
                        onChange={(value, endTouch) => {
                            // setValue(value);
                            endTouch && onEnd(value)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
