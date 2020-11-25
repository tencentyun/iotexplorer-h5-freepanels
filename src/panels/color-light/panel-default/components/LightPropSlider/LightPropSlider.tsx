import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import './LightPropSlider.less';

export function LightPropSlider({
  icon,
  value,
  onChange,
  onChanging,
  templateConfig,
}: {
  icon: string;
  value?: number;
  onChange: (value: number) => any;
  onChanging?: (value: number) => any;
  templateConfig?: any;
}) {
  const [localValue, setLocalValue] = useState(0);

  const {
    max,
    min,
    step,
    unit,
  } = useMemo(() => {
    const { define = {} } = templateConfig || {};
    const {
      start = 0, max, min, step, unit,
    } = define;

    setLocalValue(typeof value === 'undefined' ? start : value);

    return {
      max,
      min,
      step,
      unit,
    };
  }, [value, templateConfig]);

  return (
    <div
      className={classNames('light-slider-container')}
    >
      <img
        src={icon}
        className='light-slider-icon'
      />
      <Slider
        className='light-slider'
        backgroundColor='#333437'
        activeColor='#006EFF'
        blockSize={26}
        blockColor='#B5B8C0'
        step={step}
        max={max}
        min={min}
        value={localValue}
        onChanging={(e) => {
          setLocalValue(e.detail.value);
          if (typeof onChanging === 'function') {
            onChanging(e.detail.value);
          }
        }}
        onChange={(e) => {
          onChange(e.detail.value);
        }}
      />

      <div className='light-slider-value'>
        {localValue}{unit}
      </div>
    </div>
  );
}
