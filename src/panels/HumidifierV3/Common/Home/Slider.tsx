import React, { useRef, useState, useEffect } from 'react';
import { noop } from '@utillib';

export function Slider({
  maxValue = 100,
  minValue = 0,
  defaultValue = 80,
  onChange = noop,
}) {
  const [dataInfo, setDataInfo] = useState({
    dataUser: defaultValue,
    endTouch: false,
  });
  const currentWidth = `${
    5 + ((dataInfo.dataUser - minValue) * 95) / (maxValue - minValue)
  }%`;
  const slider = useRef();

  const updateBrightVal = (val, endTouch) => {
    let dataUser = val;
    if (val < minValue) {
      dataUser = minValue;
    }
    if (val > maxValue) {
      dataUser = maxValue;
    }
    setDataInfo({ dataUser, endTouch });
  };

  useEffect(() => {
    onChange && onChange(dataInfo.dataUser, dataInfo.endTouch);
  }, [dataInfo]);

  const handleMove = (e: TouchEvent) => {
    const val = (e.touches[0].clientX - slider.current.offsetLeft)
      / slider.current.clientWidth;
    const tmp = parseInt(val * (maxValue - minValue), 10) + minValue;
    updateBrightVal(tmp, false);
  };

  const handleEndMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEndMove);
    const val = (e.changedTouches[0].clientX - slider.current.offsetLeft)
      / slider.current.clientWidth;
    const tmp = parseInt(val * (maxValue - minValue), 10) + minValue;
    updateBrightVal(tmp, true);
  };

  const onTouchStart = () => {
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEndMove);
  };

  return (
    <div className="cus-light-bright">
      <div className="border" onTouchStart={onTouchStart}>
        <div ref={slider} className="slider">
          <div className="progress" style={{ width: currentWidth }}>
            <div className="progress-dot"></div>
          </div>
        </div>
      </div>
      <div className="text">室内温度：{dataInfo.dataUser}%</div>
    </div>
  );
}
