import React, { useEffect, useRef, useState } from 'react';
import { StyledProps, ThemeType } from '@libs/global';
import './style.less';

export interface SliderProps extends StyledProps {
  defaultValue?: number;
  // 0-1
  value?: number;
  theme?: ThemeType;
  onChange?: any;
}

export function Slider(props: SliderProps) {
  const [value] = useState(props.defaultValue / 100);
  const wrapper = useRef();
  const progress = useRef();

  useEffect(() => {
    progress.current.style.transition = null;
    progress.current.style.width = '0%';
    setTimeout(()=>{
      progress.current.style.transition = 'width 2s';
      progress.current.style.width = Math.floor(value * 100).toFixed(3) + '%';
    },50)
    props.onChange && props.onChange(value);
  }, [value]);
  return (
    <div
      id={'light-slider'}
      className="light-slider"
      // onTouchStart={onTouchStart}
    >
      <div className="slider-value font_line_2 color_2">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
      <div className="slider-wrapper" ref={wrapper}>
        <span
          ref={progress}
          className="current-scale"
          // style={{ width: `${Math.floor(value * 100).toFixed(3)}%` }}
        ></span>
      </div>
    </div>
  );
}
