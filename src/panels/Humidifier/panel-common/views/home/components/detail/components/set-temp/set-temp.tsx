/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-30 16:18:21
 * @LastEditors:
 * @LastEditTime:
 */
import React from 'react';
import classNames from 'classnames';
import { DeviceSateContext } from '../../../../../../deviceStateContext';
import UINumberSlider from '@components/common/number-slider/ui-number-slider';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './set-temp.less';

export const debounce = (
  fn: { apply: (arg0: any, arg1: any) => void },
  t: number,
  immediate = false,
) => {
  let timeId: any = null;
  const delay = t || 500;
  return function (this: any, ...args: any) {
    if (timeId) {
      clearTimeout(timeId);
      immediate = false;
    }
    const later = () => {
      timeId = null;
      fn.apply(this, args);
    };
    timeId = setTimeout(later, delay);
    if (immediate) fn.apply(this, args);
  };
};

const SetTemp = () => {
  const upDate = (unit: number, value: number) => {
    const obj = {};
    obj[unit === 1 ? 'set_fahrenheit' : 'set_temp'] = unit === 1 ? value + 32 : value;
    apiControlDeviceData(obj);
  };

  const getMax = (unit: number = 0, list: any) => {
    const attr = unit === 0 ? 'set_temp' : 'set_fahrenheit';
    const define = list.filter(item => item.id === attr)[0]?.define || {};
    if (unit === 1) {
      return Number(define?.max || 104) - Number(define?.min || 32)
    }
    return Number(define?.max || 100);
  }

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData, templateList }) => (
        <div className={classNames('set-temp-wrap', 'border-bottom')}>
          <UINumberSlider
            max={Number(getMax(deviceData.temp_unit_convert, templateList))}
            min={0}
            defaultValue={deviceData.temp_unit_convert === 1 ? deviceData.set_fahrenheit : deviceData.set_temp}
            onAfterChange={(value: any) => {
              upDate(deviceData.temp_unit_convert, value);
            }}
          />
          <div className={classNames('text-align-center', 'ui-slider-bar', 'temp-label')}>
            室内温度: {(deviceData.temp_unit_convert === 1 ? deviceData.set_fahrenheit || 32 : deviceData.set_temp) || 0}{deviceData.temp_unit_convert === 1 ? '°F' : '°C'}
          </div>
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default SetTemp;
