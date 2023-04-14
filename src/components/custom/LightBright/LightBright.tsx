import React, { useRef, useState, useEffect } from 'react';
import { Icon } from '@custom/Icon';
import { noop } from '@utillib';
// import './LightBright.less';

export function LightBright({
  maxValue = 100,
  minValue = 0,
  status = false,
  defaultValue = 80,
  iconName = 'light',
  onChange = noop,
  isMask = true,
  layout = 'hoz',  // ver
  valuePosition = 'absolute'
}) {
  const [dataInfo, setDataInfo] = useState({
    dataUser: defaultValue > maxValue ? maxValue : defaultValue,
    endTouch: false,
  });
  const currentWidth = `${5 + ((dataInfo.dataUser - minValue) * 95) / (maxValue - minValue)
    }%`;

  const currentHeight = `${0 + ((dataInfo.dataUser - minValue) * 90) / (maxValue - minValue)
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

  const toggleReduce = () => {
    if (!status) return;
    updateBrightVal(dataInfo.dataUser - 1, true);
  };

  const toggleAdd = () => {
    if (!status) return;
    updateBrightVal(dataInfo.dataUser + 1, true);
  };

  const handleMove = (e: TouchEvent) => {
    const val = layout === 'hoz' ? (e.changedTouches[0].clientX - slider.current.offsetLeft)
      / slider.current.clientWidth : (e.changedTouches[0].clientY - slider.current.offsetTop)
    / slider.current.clientHeight;
    const tmp = parseInt(val * (maxValue - minValue), 10) + minValue;
    updateBrightVal(tmp, false);
  };

  const handleEndMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEndMove);
    const val = layout === 'hoz' ? (e.changedTouches[0].clientX - slider.current.offsetLeft)
      / slider.current.clientWidth : (e.changedTouches[0].clientY - slider.current.offsetTop)
    / slider.current.clientHeight;
    const tmp = parseInt(val * (maxValue - minValue), 10) + minValue;
    updateBrightVal(tmp, true);
  };

  const onTouchStart = () => {
    if (!status) return;
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEndMove);
  };

  const style = layout === 'hoz' ? { width: currentWidth } : { height: '100%' };
  const dotStyle = layout === 'ver' ? { top: currentHeight } : {};
  const valueStyle = valuePosition === 'absolute' && layout === 'hoz' ? { left: `calc(${currentWidth} - 14px)` } : {}

  return (
    <div className={`cus-light-bright ${layout}`}>
      {isMask ? (
        <div className="mark">
          <div className="mark-op-btn" onClick={toggleReduce}>
            <Icon name={status ? 'minus-checked' : 'minus'}></Icon>
          </div>
          <div className="value-wrap" style={{ ...valueStyle }}>
            <Icon name={status ? `${iconName}-checked` : iconName}></Icon>
            <div className="value-text">{dataInfo.dataUser}</div>
          </div>
          <div className="mark-op-btn" onClick={toggleAdd}>
            <Icon name={status ? 'add-checked' : 'add'}></Icon>
          </div>
        </div>
      ) : null}

      <div className="border" onTouchStart={onTouchStart}>
        <div ref={slider} className="slider">
          <div className="progress" style={{ ...style }}>
            <div className="progress-dot" style={{ ...dotStyle }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
