import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { LightBright } from '@custom/LightBright';

/**
 * 系统声音
 */
export function Voice({ deviceData: { sys_vol }, templateMap, doControlDeviceData, productInfo, history, deviceInfo }) {
  const [value, setValue] = useState(sys_vol || 0);
  const onEnd = (scrollValue) => {
    doControlDeviceData('sys_vol', scrollValue);
  };

  useEffect(() => {
    setValue(sys_vol);
  }, [sys_vol]);

  return (
    <div className='voice'>
      <div className='item'>
        <div className='front'>
          <Icon className='custom-icon' name='voice'></Icon>
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
              endTouch && onEnd(value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
