/*
 * @Author: wrq
 * @Date: 2021-10-23 20:55:57
 * @Description: 通用调光开关
 */
import React, { useEffect, useMemo, useRef, useState, TouchEvent } from 'react';
import classNames from 'classnames';
import { StyledProps, ThemeType } from '@libs/global';
import { SvgIcon } from '@components/common';
import './style.less';

export interface LightSwitchProps extends StyledProps {
  defaultValue?: number; // 0 - 1
  desc?: string;
  theme?: ThemeType;
  onChange?: any;
}

export function LightSwitch(props: LightSwitchProps) {
  const [value, setValue] = useState(0);
  const currentHeight = (value * 100).toFixed(3) + '%';
  const wrapper = useRef();
  const current = useRef();

  useMemo(() => {
    setValue(props.defaultValue as number);
  }, []);

  useEffect(() => {
    props.onChange && props.onChange(value);
  }, [value]);

  const updateValue = (target: any) => {
    const { pageY } = target;
    const { clientHeight: height, offsetTop } = wrapper.current as any;
    let value = 1 - (pageY - offsetTop) / height;

    if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }
    setValue(value);
  };

  const onTouchMove = (e: TouchEvent) => {
    updateValue(e.touches[0]);
  };

  const onTouchUp = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchup', onTouchUp);
  };

  const onTouchStart = (e: TouchEvent) => {
    const touchTarget = e.touches[0];

    updateValue(touchTarget);

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchup', onTouchUp);
  };

  return (
    <div
      className={classNames(
        '_component_business_light-switch_',
        props.className
      )}
    >
      <div
        className="light-switch-wrapper"
        ref={wrapper}
        onTouchStart={onTouchStart}
      >
        <div className="wrap-text">
          <SvgIcon name="icon-light" />

          <p className="value-text">{Math.floor(value * 100)}%</p>
          <p className="desc">{props.desc || '亮度'}</p>
        </div>

        <div
          className="current-wrap"
          ref={current}
          style={{ height: currentHeight }}
        ></div>

        <div className="switch-slider">
          <span className="switch-bar"></span>
        </div>
      </div>
    </div>
  );
}
