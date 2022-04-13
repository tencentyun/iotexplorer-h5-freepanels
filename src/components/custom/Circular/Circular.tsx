import React, { useState, useRef, useEffect } from 'react';
// import './Circular.less';
export interface CircularProps {
  className?: string ;
  value?: number;
  onChange?: (value: number) => void;
  onMove?: (value: number) => void;
}
export const Circular = ({ value = 0, onChange, onMove, className } : CircularProps) => {
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
    const deg = (Math.atan2(clientX - centerX, centerY - clientY) * 180) / Math.PI + 180;
    setDeg(deg);
    onMove && onMove(deg);
  };

  const onTouchEnd = () => {
    onChange && onChange(deg);
  };

  return <div className={`round-container ${className}`} ref={wrapper}>
    <div className="round" style={{ transform: `rotate(${deg}deg)` }}>
      <div className="point" onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} />
    </div>
  </div>;
};

