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
  disable?: number;
  onChange?: any;
}

export function LightSwitch(props: LightSwitchProps) {
  const [value, setValue] = useState(0);
  const [returnValue, setReturnValue] = useState(0);
  const currentHeight = (value * 100).toFixed(3) + '%';
  const wrapper = useRef();
  const current = useRef();

  useMemo(() => {
    setValue(props.defaultValue as number);
    setReturnValue(props.defaultValue as number);
  }, []);

  useEffect(() => {
    props.onChange && props.onChange(returnValue);
  }, [returnValue]);

  const updateValue = (target: any, endTouch: boolean) => {
    if (props.disable == 1) {
      const { pageY } = target;
      const { clientHeight: height, offsetTop } = wrapper.current as any;
      let value = 1 - (pageY - offsetTop) / height;

      if (value < 0) {
        value = 0;
      } else if (value > 1) {
        value = 1;
      }
      setValue(value);
      if(endTouch){
        setReturnValue(value);
      }
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    updateValue(e.touches[0], false);
  };

  const onTouchUp = (e: TouchEvent) => {
    const touchTarget = e.changedTouches[0];
    updateValue(touchTarget, true);
  };

  return (
    <div
      className={classNames(
        '_component_business_light-switch_',
        'theme-' + props.theme,
        props.className
      )}
    >
      <div
        className="light-switch-wrapper"
        ref={wrapper}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchUp}
      >
        <div className={classNames("wrap-text", {'light': Number(currentHeight.split('%')[0]) >= 80})}>
          <SvgIcon name="icon-light" />

          <p className="value-text">{Math.floor(value * 100)}%</p>
          <p className="desc">{props.desc || '亮度'}</p>
        </div>

        <div
          className="current-wrap"
          ref={current}
          style={{ height: currentHeight }}
        >
          {props.theme === 'blueWhite' && 
            <>
              <div className="line"></div>
              <div className="mask"></div>
            </>
          }
        </div>
        {props.theme === 'blueWhite' && <div className="line"></div>}
        
        <div className="switch-slider">
          <span className="switch-bar"></span>
        </div>
      </div>
    </div>
  );
}
