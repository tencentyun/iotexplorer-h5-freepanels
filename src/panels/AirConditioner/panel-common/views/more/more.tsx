/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 19:37:30
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import './more.less';
import TemperatureUnit from './temperature-unit/temperature-unit';
import Electricity from './electricity/electricity';
import WindType from './wind-type/wind-type';
import CloudTiming from './cloud-timing/cloud-timing';

export function More() {
  return (
    <div className="more-wrap">
      {/* 电量显示*/}
      <Electricity />
      {/* 风向和风量*/}
      <WindType />
      {/* 温标切换功能组*/}
      <TemperatureUnit />
      {/* 云定时*/}
      <CloudTiming />
    </div>
  );
}
