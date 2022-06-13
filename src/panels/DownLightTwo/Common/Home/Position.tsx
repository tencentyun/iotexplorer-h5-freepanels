import React, { useState } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { Icon } from '@custom/Icon';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}
export function Position({
  deviceData: { bright_value = 80, work_mode, temp_value = 150, power_switch },
  doControlDeviceData,
}) {
  const [deg, setDeg] = useState((temp_value * 360) / 1000);
  const isPowerOff = power_switch !== 1;
  const onChange = (deg) => {
    setDeg(deg);
    doControlDeviceData('temp_value', Math.round((deg * 1000) / 360));
  };
  const powerStatus = isPowerOff ? 'off-switch' : 'on-switch';
  const colourType = work_mode === 'colour' ? 'colour-type' : '';

  const CONFIG = [
    [150, 180, 270],
    [254, 303, 35],
  ];
  return (
    <div className={`position_card center ${powerStatus} ${colourType}`}>
      <div className="main-bg center">
        <div className="circle-ring">
          <div className="bg">
            <div
              className="circle outer center"
              style={{ opacity: bright_value / 100 }}
            >
              <div className="circle inner"></div>
            </div>
            <div className="bg-img center">
              <Icon name={isPowerOff ? 'light-bg-off' : `light-bg-${work_mode || 'white'}` }></Icon>
            </div>
          </div>
          {!isPowerOff ? <Circular value={deg} onChange={onChange} /> : null }
        </div>
      </div>
      {!isPowerOff ? <div
          className="color-value"
          style={{ opacity: bright_value / 100 }}
        >
          {CONFIG[work_mode === 'colour' ? 1 : 0].map((value, index) => (
            <div
              className={`color-${index + 1}`}
              key={index}
              onClick={() => onChange(value)}
            >
            </div>
          ))}
        </div> : null
      }
    </div>
  );
}
