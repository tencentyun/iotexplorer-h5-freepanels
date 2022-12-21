import React, { useState, useEffect } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { Icon } from '@custom/Icon';
import { getColorValue, getDegValue } from '@utils';
import { RgbColorPicker } from 'react-colorful';

// function colorRGBtoHex(r, g, b) {
//   return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
// }

// function hexToRgba(hex, opacity = 1) {
//   let RGBA = `rgba(${parseInt('0x' + hex.slice(1, 3))}, ${parseInt('0x' + hex.slice(3, 5))}, ${parseInt('0x' + hex.slice(5, 7))}, ${opacity})`
//   return {
//     red: parseInt('0x' + hex.slice(1, 3)),
//     green: parseInt('0x' + hex.slice(3, 5)),
//     blue: parseInt('0x' + hex.slice(5, 7))
//   }
// }

export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}
export function Position({
  deviceData: { power_switch, brightness = 80, color_temp = 2700, whiteData, colour, progressSwitch, colourMode = 1 },
  doControlDeviceData,
}) {
  useEffect(() => {
    const degValue = getDegValue('white', whiteData) || 0;
    setDeg(degValue);
  }, [whiteData]);

  useEffect(() => {
    const data = { r: colour?.red || 255, g: colour?.green || 255, b: colour?.blue || 255}
    setColor(data);
  }, [colour]);

  const [deg, setDeg] = useState(0);
  const isPowerOff = power_switch !== 1;
  const onChange = (deg) => {
    let data = null;
    if (colourMode === 1) {
      setDeg(deg);
      data = getColorValue('white', parseInt(deg));
    } else {
      setColor(deg);
      data = {
        red: deg.r,
        green: deg.g,
        blue: deg.b
      }
    }
    const key = colourMode === 1 ? 'whiteData' : 'colour';
    doControlDeviceData(key, data);
  };
  const powerStatus = isPowerOff ? 'off-switch' : 'on-switch';
  const colourType = colourMode === 0 ? 'colour-type' : '';
  const [color, setColor] = useState({r: 255, g: 255, b: 255});

  const CONFIG = [
    [150, 180, 270],
    [254, 303, 35],
  ];
  return (
    <div className={`position_card center ${powerStatus} ${colourType}`}>
      {colourMode === 0 ? <RgbColorPicker color={color} onChange={onChange} /> :
        <>
          <div className="main-bg center">
            <div className="circle-ring">
              <div className="bg">
                <div
                  className="circle outer center"
                  style={{ opacity: brightness / 100 }}
                >
                  <div className="circle inner"></div>
                </div>
                <div className="bg-img center">
                  <Icon name={isPowerOff ? 'light-bg-off' : `light-bg-white`}></Icon>
                </div>
              </div>
              <Circular className={isPowerOff ? 'circular-off' : ''} value={deg} onChange={onChange} touch={!isPowerOff} />
            </div>
          </div>
          {!isPowerOff ? <div
            className="color-value"
            style={{ opacity: brightness / 100 }}
          >
            {CONFIG[1].map((value, index) => (
              <div
                className={`color-${index + 1}`}
                key={index}
                onClick={() => onChange(value)}
              >
              </div>
            ))}
          </div> : null
          }
        </>
      }
    </div>
  );
}
