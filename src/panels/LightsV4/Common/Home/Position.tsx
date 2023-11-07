import React, { useEffect, useRef, useState } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { Icon } from '@custom/Icon';
import { getDegValue } from '@utils';
import { Input, Modal, Toast } from 'antd-mobile';

export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}

// 每一度对应的值
const step = (6500 - 2700) / (338 - 18);

const getDegByColorTemp = (val) => {
  const deg = Math.round((val - 2700) / step + 18);
  // console.log('colorTemp=>deg', val, deg);
  return deg;
};

const getControlColorTempByDeg = (deg) => {
  deg = Math.round(deg);
  if (deg >= 18 && deg <= 19) {
    return 2700;
  }
  if (deg >= 337 && deg <= 338) {
    return 6500;
  }
  return Math.round(2700 + (deg - 18) * step);
};

const getProductIconName = () => {
  const categoryKey = window.h5PanelSdk.productInfo.CategoryKey;
  switch (categoryKey) {
    case 'light_strip_cw':
      return 'lightStrip';
    case 'Down Light':
      return 'downlight';
    case 'SelectedDownLight':
      return 'downlight';
    default:
      return 'spotlight';
  }
};

export function Position({
  // value,
  // brightness = 80,
  // productType = 'spotlight',
  productColorMode = 1,
  deviceData: {
    // brightness = 80,
    color_mode,
    color_temp = 2700,  // 色温  2700-6500  步长1
    work_mode,
    white_data,
    colour_data,
    power_switch,
  },
  // log,
  doControlDeviceData,
}) {
  const colorTempInputRef = useRef<any>(null);

  // 颜色模式
  const colorMode = color_mode === void 0 ? productColorMode : color_mode;

  const isColorFull = colorMode == 2;

  useEffect(() => {
    if (isColorFull) { // 彩色模式
      const degValue = getDegValue(work_mode, work_mode === 'colour' ? colour_data : white_data) || 0;
      setDeg(degValue);
    } else { // 单色和双色模式
      setDeg(getDegByColorTemp(color_temp));
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
      doControlDeviceData({ color_temp: getControlColorTempByDeg(deg) });
    }
  };
  const powerStatus = isPowerOff ? 'off-switch' : 'on-switch';

  const CONFIG = [
    [150, 180, 270],
    [254, 303, 35],
  ];

  const handleColorTempInput = () => {
    Modal.alert({
      content: (
        <Input
          ref={colorTempInputRef}
          placeholder='请输入色温值(2700-6500)'
          type={'number'}
        />
      ),
      style: {
        /* @ts-ignore */
        '--adm-color-primary': '#30414D',
      },
      title: '色温',
      closeOnMaskClick: true,
      confirmText: '确认',
      onConfirm: () => {
        const color_temp = Number(colorTempInputRef.current.nativeElement.value);
        if (!Number.isNaN(color_temp) && color_temp >= 2700 && color_temp <= 6500) {
          doControlDeviceData({ color_temp });
        } else {
          Toast.show({ content: '色温值不合法', icon: 'fail' });
        }
      },
    });
  };


  // log.mi('传递的参数:::', productType, colorMode);

  return (
    <div className={`position_card center ${powerStatus} color-type-${colorMode}`}>
      <div className='main-bg center'>
        <div className='circle-ring'>
          <div className='bg'>
            <div
              className='circle outer center'
              // style={{ opacity: brightness / 100 }}
            >
              <div className='circle inner'></div>
            </div>
            <div className='bg-img center'>
              <Icon name={getProductIconName()}></Icon>
              <div className='center-value'>{color_temp}K</div>
            </div>
          </div>
          <Circular
            onClick={handleColorTempInput}
            className={isPowerOff ? 'circular-off' : ''}
            value={deg}
            onChange={onChange}
            touch={!isPowerOff}
          />
        </div>
      </div>
      {!isPowerOff ? <div
        className='color-value'
        // style={{ opacity: brightness / 100 }}
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
