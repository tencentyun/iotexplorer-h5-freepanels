import React, { useState, useEffect } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { Icon } from '@custom/Icon';
import { getColorValue, getDegValue } from '@utils';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}

// 每一度对应的值
const step = (6500 - 2700) / 360;

const toDeg = val => (val - 2700) / step;
const toValue = val => Math.round(2700 + val * step);
// 按照指定的补偿处理值  == 由于回显转换步长后 会跳动 故最好时候会断取整 目前不做步长的取整操作
// const toStep=(val) => val - val % 100
const toStep = (val) => val;
export function Position({
  // value,
  brightness = 80,
  productType = "spotlight",
  productColorMode = 1,
  deviceData: {
    // brightness = 80,
    color_mode,
    color_temp = 2700,  // 色温  2700-6500  步长1
    work_mode,
    white_data,
    colour_data,
    power_switch
  },
  log,
  doControlDeviceData,
}) {


  // 颜色模式
  const colorMode = color_mode === void 0 ? productColorMode : color_mode;

  const isColorFull = colorMode == 2;

  useEffect(() => {
    if (isColorFull) { // 彩色模式
      const degValue = getDegValue(work_mode, work_mode === 'colour' ? colour_data : white_data) || 0;
      setDeg(degValue);
    } else { // 单色和双色模式
      setDeg(toDeg(color_temp));
    }
  }, [colorMode, color_temp]);

  const [deg, setDeg] = useState(0);
  const isPowerOff = power_switch !== 1;

  const onChange = (deg) => {
    setDeg(deg);
    if (isColorFull) {
      // const key = work_mode === 'colour' ? 'colour_data' : 'white_data';
      // doControlDeviceData(key, getColorValue(work_mode, parseInt(deg)));
    } else {
      doControlDeviceData({ color_temp: toStep(toValue(deg)) })
    }
  };
  const powerStatus = isPowerOff ? 'off-switch' : 'on-switch';

  const CONFIG = [
    [150, 180, 270],
    [254, 303, 35],
  ];


  log.mi("传递的参数:::", productType, colorMode);

  return (
    <div className={`position_card center ${powerStatus} color-type-${colorMode}`}>
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
              <Icon name={productType}></Icon>
            </div>
          </div>
          <Circular className={isPowerOff ? 'circular-off' : ''} value={deg} onChange={onChange} touch={!isPowerOff} />
        </div>
      </div>
      {!isPowerOff ? <div
        className="color-value"
        style={{ opacity: brightness / 100 }}
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
