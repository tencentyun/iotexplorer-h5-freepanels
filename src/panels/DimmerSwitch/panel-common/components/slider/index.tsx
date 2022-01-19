/*
 * @Author: wrq
 * @Date: 2021-10-23 22:07:17
 * @Description:
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyledProps, ThemeType } from '@/global';
import { getOffset } from '@/utils/dom';
import './style.less';
import classNames from 'classnames';

export interface SliderProps extends StyledProps {
  defaultValue?: number;
  // 0-1
  value?: number;
  theme?: ThemeType;
  isAvailable: boolean;
  onChange?: any;
}

export function Slider(props: SliderProps) {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState(false);
  const wrapper = useRef();

  useMemo(() => {
    const val: number = (
      props.defaultValue !== undefined ? props.defaultValue : props.value
    ) as number;

    setValue(val);
  }, []);

  useEffect(() => {
    props.onChange && props.onChange(value.toFixed(2));
  }, [value]);

  useEffect(() => {
    const val: boolean = (
      props.isAvailable !== undefined ? props.isAvailable : false
    ) as boolean;
    setStatus(val);
  }, [props.isAvailable]);

  useEffect(() => {
    const val: number = (
      props.value !== undefined ? props.value : 0.01
    ) as number;
    setValue(val);
  }, [props.value]);

  const updateValue = (target: any) => {
    if (!status) return;

    const { pageX } = target;
    const { clientWidth: width } = wrapper.current as any;
    const offsetLeft = getOffset(wrapper.current).left;
    let value = (pageX - offsetLeft) / width;

    if (value <= 0.01) {
      value = 0.01;
    } else if (value > 1) {
      value = 1;
    }
    setValue(value);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!status) return;
    updateValue(e.touches[0]);
  };

  const onTouchUp = (e: TouchEvent) => {
    if (!status) return;
    e.preventDefault();
    e.stopPropagation();

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchUp);
  };

  const onTouchStart = (e: TouchEvent) => {
    if (!status) return;
    const touchTarget = e.touches[0];

    updateValue(touchTarget);

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchUp);
  };

  return (
    <div
      className={classNames(
        'light-slider',
        `theme_type_${props.theme || 'normal'}`,
        props.isAvailable ? '' : 'disable'
      )}
      onTouchStart={onTouchStart}
    >
      <p className="slider-value font_line_2 color_2">
        {Math.floor(value * 100)}%
      </p>
      <div className="slider-wrapper" ref={wrapper}>
        <span
          className="current-scale"
          style={{ width: `${Math.floor(value * 100).toFixed(3)}%` }}
        ></span>
      </div>
    </div>
  );
}
