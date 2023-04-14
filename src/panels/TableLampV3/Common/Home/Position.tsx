import React, { useState, useEffect } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { getOptions, getDesc } from '@utils';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}

function tempToStep(temp) {
  return 500 / (1000 / 240) + 60;
}

function stepToTemp(step) {
  return parseInt((step - 60) * (1000 / 240));
}

export function Position({
  templateMap,
  deviceData: { brightness = 80, color_temp = 500, color_mode = 1 },
  doControlDeviceData,
}) {
  useEffect(() => {
    // console.log(tempToStep(color_temp));
    setDeg(tempToStep(color_temp));
  }, [color_temp]);
  const [deg, setDeg] = useState(0);
  const onChange = (deg) => {
    doControlDeviceData('color_temp', stepToTemp(deg));
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
            </div>
          </div>
          {/* {!isPowerOff ? <Circular value={deg} onChange={onChange} /> : null } */}
          <Circular className='' min={60} max={300} value={deg} onChange={onChange} />
        </div>
      </div>

    </div>
  );
}
