import React, { useState, useRef, useEffect } from 'react';
// import './Circular.less';
export interface CircularProps {
  className?: string;
  value?: number;
  max?: number;
  min?: number;
  touch?: boolean;
  onChange?: (value: number) => void;
  onMove?: (value: number) => void;
}
export const Circular = ({
  value = 0,
  onChange,
  onMove,
  max = 360, // 滑动最大值
  min = 0, // 滑动最小值
  className,
  touch = true, // 是否启动滑动功能
}: CircularProps) => {
  const wrapper = useRef();
  const [deg, setDeg] = useState(value);

  useEffect(() => {
    setDeg(value);
  }, [value]);

  const onTouchMove = (e) => {
    const wrap = wrapper.current;
    const { clientX, clientY } = e.changedTouches[0];
    const { left, top, height, width } = wrap.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    let deg =      (Math.atan2(clientX - centerX, centerY - clientY) * 180) / Math.PI + 180;
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

  return (
    <div className={`round-container ${className}`} ref={wrapper}>
      <div className="round" style={{ transform: `rotate(${deg}deg)` }}>
        <div className="point" {...props} />
      </div>
    </div>
  );
};
