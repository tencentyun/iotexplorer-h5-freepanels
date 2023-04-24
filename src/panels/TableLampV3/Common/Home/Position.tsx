import React, { useState, useEffect } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { getOptions, getDesc } from '@utils';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}

function tempToStep(temp, type) {
  const { min, max } = getMinMax(type);
  return (temp - min) / ((max - min) / 240) + 60;
}

function stepToTemp(step, type) {
  const { min, max } = getMinMax(type);
  return parseInt((step - 60) * ((max - min) / 240)) + min;
}

function getMinMax(type) {
  let min = 0, max = 0;
  switch (type) {
    case 1: min = 2700; max = 3500; break;
    case 2: min = 3500; max = 4500; break;
    case 3: min = 4500; max = 6000; break;
    case 4: min = 6000; max = 6000; break;

  }
  return { min, max }
}

export function Position({
  templateMap,
  deviceData: { brightness = 80, color_temp = 2700, color_mode = 1 },
  doControlDeviceData,
}) {
  useEffect(() => {
    // console.log(tempToStep(color_temp));
    setDeg(tempToStep(color_temp, color_mode));
  }, [color_temp]);
  useEffect(() => {
    const { min } = getMinMax(color_mode);
    doControlDeviceData({ 'color_temp': min })
    setDeg(0);

  }, [color_mode])
  const [deg, setDeg] = useState(0);
  const onChange = (deg) => {
    doControlDeviceData('color_temp', stepToTemp(deg, color_mode));
  };

  return (
    <div className={`position_card center mode-${color_mode}`}>
      <div className="main-bg center">
        <div className="circle-ring">
          <div className="bg">
            <div
              className="circle outer center custom-circle"
              style={{ opacity: brightness / 100 }}
            >
              <div className="circle inner"></div>
            </div>
            <div className="bg-img center">
              <div className='title'>{getDesc(templateMap, 'color_mode', color_mode)}</div>
              <div className='title'>{color_temp}K</div>
            </div>
          </div>
          {/* {!isPowerOff ? <Circular value={deg} onChange={onChange} /> : null } */}
          <Circular className='' min={60} max={300} value={deg} onChange={onChange} />
        </div>
      </div>

    </div>
  );
}
