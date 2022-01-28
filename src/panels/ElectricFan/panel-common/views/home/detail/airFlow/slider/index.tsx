import React, { useEffect, useMemo, useRef, useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { StyledProps, ThemeType } from '@libs/global';
import { getOffset } from '@libs/dom';
import {getThemeType} from "@libs/theme";
import {onControlDevice} from "@hooks/useDeviceData";
import './style.less';

import triangleImageDefault from '../../../../icons/normal/triangle-close.svg';
import triangleImage from '../../../../icons/normal/triangle.svg';
import triangleImageBlueWhite from '../../../../icons/blue-white/triangle.svg';
import triangleImageDark from '../../../../icons/dark/triangle.svg';
import triangleImageColorful from '../../../../icons/colorful/triangle.svg';
import triangleImageMorandi from '../../../../icons/morandi/triangle.svg';
export interface SliderProps extends StyledProps {
  defaultValue?: number;
  // 0-1
  value?: number;
  theme?: ThemeType;
  onChange?: any;
}

export function Slider(props: SliderProps) {
  const themeType = getThemeType();
  const [value, setValue] = useState(0);
  const wrapper = useRef();

  useMemo(() => {
    const val: number = (
      props.defaultValue !== undefined ? props.defaultValue : props.value
    ) as number;

    setValue(val);
  }, []);

  useEffect(() => {
    props.onChange && props.onChange(value);
  }, [value]);

  const updateValue = (target: any, endTouch: boolean) => {
    const { pageX } = target;
    const { clientWidth: width } = wrapper.current as any;
    const offsetLeft = getOffset(wrapper.current).left;
    let value = (pageX - offsetLeft) / width;
    if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }
    const num = Number(Math.floor(value * 100).toFixed(3));
    let winspeed = '1';
    value = parseInt(value*4)/4;
    if (num < 13) {
      winspeed = '1';
      value = 0;
    } else if (num < 38) {
      winspeed = '2';
      value = 0.25;
    } else if (num < 63) {
      winspeed = '3';
      value = 0.5;
    } else if (num < 88) {
      winspeed = '4';
      value = 0.75;
    } else {
      winspeed = '5';
      value = 1;
    }

    setValue(value);
    if(endTouch){
      onControlDevice('windspeed', winspeed);
    }
  };
  const updateNum = () => {
    let num = Number(Math.floor(value * 100).toFixed(3));
    if (num < 13) {
      num = 7;
    } else if (num < 38) {
      num = 29;
    } else if (num < 63) {
      num = 51;
    } else if (num < 88) {
      num = 74;
    } else {
      num = 96;
    }
    return num;
  };
  const onTouchMove = (e: TouchEvent) => {
    updateValue(e.touches[0], false);
  };
  const onTouchUp = (e: TouchEvent) => {
    const touchTarget = e.changedTouches[0];
    updateValue(touchTarget, true);
  };
  const triangleImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return triangleImage;
      case 'blueWhite':
        return triangleImageBlueWhite;
      case 'dark':
        return triangleImageDark;
      case 'colorful':
        return triangleImageColorful;
      case 'morandi':
        return triangleImageMorandi;
      default:
        return triangleImage;
    }
  };
  return (
    <div
      id={'light-slider'}
      className="light-slider"
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchUp}
    >
      <div className="slider-title">风量调节 | {Math.floor(value * 200)}</div>
      <div className="slider-icon">
        <div style={{ width: `${updateNum()}%` }}>
          <img src={sdk.deviceData.power_switch === 1 ? triangleImageSrc() : triangleImageDefault} alt="" />
        </div>
      </div>
      <div className="slider-value font_line_2">
        <span>1档</span>
        <span>2档</span>
        <span>3档</span>
        <span>4档</span>
        <span>5档</span>
      </div>
      <div className="slider-wrapper" ref={wrapper}>
        <span
          className="current-scale"
          style={{ width: `${Math.floor(value * 100).toFixed(3)}%` }}
        ></span>
      </div>
    </div>
  );
}
