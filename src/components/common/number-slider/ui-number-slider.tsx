/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-17 16:57:21
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useEffect, useState } from 'react';
import './style.less';
import { Slider } from 'antd-mobile';
import classNames from 'classnames';
import { noop } from '@/utils';
import { SvgIcon } from '@/components/common';
import IconTheme from '@/components/common/icon/icon-theme';
export interface IUINumberSlider {
  min?: number | 0;
  max?: number | 100;
  defaultValue?: number | 0;
  step?: number | 1;
  onChange?: Function;
  onAfterChange?: Function;
  onReduce?: Function;
  onAdd?: Function;
}

// eslint-disable-next-line no-unused-vars
const UINumberSlider = (props: IUINumberSlider) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    onChange = noop,
    onAfterChange = noop,
    defaultValue = 0
  } = props;
  const [value, setValue] = useState(0);

  const getFillWidth = () => {
    if (value === 0) {
      return `0`;
    }
    return `calc(${(value / max) * 100}% + 13px)`;
  };
  const handleOnChange = (value: any) => {
    setValue(value as number);
    onChange(value);
  };
  const handleOnAfterChange = (value: any) => {
    setValue(value as number);
    onAfterChange(value);
  };
  const handleReduce = () => {
    handleOnChange(value - step < min ? min : value - step);
  };
  const handleAdd = () => {
    const val = value + step >= max ? max : value + step;
    handleOnChange(val);
  };
  const init = () => {
    if (defaultValue) setValue(defaultValue);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className={classNames('flex', 'space-between', 'slider-tools-bar')}>
        <IconTheme kind={'reduce'} size={40} onClick={handleReduce} />
        <span>{value}</span>
        <IconTheme kind={'add'} size={40} onClick={handleAdd} />
      </div>

      <div className={classNames('slider-wrap')}>
        <Slider
          value={value}
          onChange={handleOnChange}
          onAfterChange={handleOnAfterChange}
          max={max}
          min={min}
          step={step}
          defaultValue={defaultValue}
        />
        <div className={classNames('slider-bg')} />
        <div
          className={classNames('slider-fill-bg')}
          style={{ width: getFillWidth() }}
        />
      </div>
    </>
  );
};

export default UINumberSlider;
