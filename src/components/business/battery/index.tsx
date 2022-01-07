/*
 * @Author: wrq
 * @Date: 2021-09-20 09:50:22
 * @Description: 设备电量模块
 */
import React from 'react';
import classNames from 'classnames';
import './style.less';

export interface BatteryProps {
  // 电量 0 - 100
  value?: number;
  // 是否显示电量百分比
  isShowPercent?: boolean;
  isShowTip?: boolean;
  // 颜色: 黑色、白色、蓝色、绿色、莫兰迪
  color?: string;
}

export function Battery({
  value,
  isShowPercent = true,
  isShowTip = true,
  color = ''
}: BatteryProps) {
  return (
    <div className="_component_business_battery_">
      <div className={classNames('battery-wrap', color)}>
        <div className="inner">
          <div
            className="current-level"
            style={{ width: `${value || 0}%` }}
          ></div>
        </div>
      </div>

      {isShowTip ? <p className="battery-tip">设备电量</p> : null}

      {/* 百分比 */}
      {isShowPercent ? (
        <p className="battery-percent">{Math.floor(value || 0)}%</p>
      ) : null}
    </div>
  );
}
