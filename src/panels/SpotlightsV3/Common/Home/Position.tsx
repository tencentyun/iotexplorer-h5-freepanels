import React, { useState, useEffect } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { Icon } from '@custom/Icon';
import { getColorValue, getDegValue } from '@utils';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}
export function Position({
  deviceData: { bright_value = 80, work_mode, white_data, colour_data, temp_value = 150, switch_led },
  doControlDeviceData,
}) {
  useEffect(() => {
    const degValue = getDegValue(work_mode, work_mode === 'colour' ? colour_data : white_data) || 0;
    setDeg(degValue);
  }, [work_mode]);
  const [deg, setDeg] = useState(0);
  const isPowerOff = switch_led !== 1;
  const onChange = (deg) => {
    setDeg(deg);
    const key = work_mode === 'colour' ? 'colour_data' : 'white_data';
    doControlDeviceData(key, getColorValue(work_mode, parseInt(deg)));
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
              <Icon name={isPowerOff ? 'light-bg-off' : `light-bg-${work_mode || 'white'}`}></Icon>
            </div>
          </div>
          {/* {!isPowerOff ? <Circular value={deg} onChange={onChange} /> : null } */}
          <Circular className={isPowerOff ? 'circular-off' : ''} value={deg} onChange={onChange} touch={!isPowerOff} />
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
