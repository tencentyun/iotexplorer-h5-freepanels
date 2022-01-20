/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 19:37:30
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import classNames from 'classnames';
import FilterReset from './filter-reset/filter-reset';
import Features from './features/features';
import Features2 from './features2/features2';
import { Block } from '@/components/layout';
import { Cell, Switch } from '@/components/base';
import { SvgIcon } from '@/components/common';
// 模版数据
import { DeviceSateContext } from '@/products/humidifier/deviceStateContext';
// 接口，处理属性更改
import { getThemeType, onControlDevice } from '@/business';
import './more.less';

const themeType = getThemeType();

export function More() {

  const iconColor = () => {
    if (themeType === 'colorful') {
      return {
        gradientId: 'unit',
        startColor: '#527DF4',
        endColor: '#044DFF',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      };
    } else if (themeType === 'blueWhite') {
      return {
        gradientId: 'unit',
        startColor: '#3374FA',
        endColor: '#549CFC',
        x1: '50%',
        y1: '0%',
        x2: '50%',
        y2: '100%'
      };
    } else if (themeType === 'dark') {
      return {
        gradientId: 'unit',
        startColor: '#00F0FF',
        endColor: '#704DF0',
        x1: '11.8644068%',
        y1: '18.182147%',
        x2: '104.602754%',
        y2: '88.2505064%'
      };
    } else if (themeType === 'morandi') {
      return {
        color: '#576273'
      };
    } else {
      return {
        color: '#000000'
      };
    }
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div className="more-wrap">
          {/*功能组*/}
          <Features />
          {/*温标切换*/}
          <Block className="unit-convert-block">
            <div className="label">
              <SvgIcon
                className="unit-convert"
                name="icon-heart-unit-convert"
                {...iconColor()}
              />
              <span className="unit-convert-label">温标切换</span>
            </div>
            <div className="temp-btn-wrap">
              <div
                className={classNames(
                  'temp-btn',
                  deviceData.temp_unit_convert === 0 ? 'selected' : ''
                )}
                onClick={() => {
                  onControlDevice('temp_unit_convert', 0);
                }}
              >
                &#176;C
              </div>
              <div
                className={classNames(
                  'temp-btn',
                  deviceData.temp_unit_convert === 1 ? 'selected' : ''
                )}
                onClick={() => {
                  onControlDevice('temp_unit_convert', 1);
                }}
              >
                &#176;F
              </div>
            </div>
          </Block>
          {/*滤芯复位*/}
          <FilterReset />
          {/*功能组2*/}
          <Features2 />
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
}
