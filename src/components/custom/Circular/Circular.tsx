import React, { useEffect, useRef, useState } from 'react';
import Process from './Process';
import Shape from './Shape.jsx';
import { noop } from '@utillib';

export interface CircularProps {
  className?: string;
  value?: number;
  max?: number;
  min?: number;
  touch?: boolean;
  process?: boolean;
  onChange?: (value: number) => void;
  onMove?: (value: number) => void;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Circular = ({
  value = 0,
  onChange,
  onMove,
  max = 360, // 滑动最大值
  min = 0, // 滑动最小值
  className,
  children, // 内部嵌入面板内容
  process = false, // 是否显示进度
  touch = true, // 是否启动滑动功能
  onClick = noop,
}: CircularProps) => {
  const wrapper = useRef();
  const [deg, setDeg] = useState(value);

  useEffect(() => {
    setDeg(value < min ? min : (value > max ? max : value));
  }, [value]);

  const onTouchMove = (e) => {
    const wrap = wrapper.current;
    const { clientX, clientY } = e.changedTouches[0];
    const { left, top, height, width } = wrap.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    let deg = (Math.atan2(clientX - centerX, centerY - clientY) * 180) / Math.PI + 180;
    if (deg > max) {
      deg = max;
    }
    if (deg < min) {
      return min;
    }
    setDeg(deg);
    onMove && onMove(deg);
  };

  const onTouchEnd = () => {
    onChange && onChange(deg);
  };
  const props = touch ? { onTouchMove, onTouchEnd } : {};
  const shape = 360 + min - max;
  return (
    <div className='cus-circle-panel'>
      <div className='round-center-click-box' onClick={onClick}></div>
      <div className={`round-container ${className}`} ref={wrapper}>
        <div className='round' style={{ transform: `rotate(${deg}deg)` }}>
          <div className='point' {...props} />
        </div>
      </div>
      {process ? <Process value={deg} /> : null}
      {shape ? <Shape value={shape} /> : null}
      <div className='content-node'>{children}</div>
    </div>
  );
};
