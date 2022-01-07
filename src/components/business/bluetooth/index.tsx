/*
 * @Author: wrq
 * @Date: 2021-09-20 09:50:22
 * @Description: 蓝牙模块
 */
import React from 'react';
import classNames from 'classnames';
import './style.less';

export interface BluetoothProps {
  isShowState?: boolean;
}

export function Bluetooth(props: BluetoothProps) {
  const { isShowState = true } = props;

  return (
    <div className="_component_business_bluetooth_">
      <span className="bluetooth-icon is_error"></span>
      <i
        className={classNames('connect-state font_2 color_3', {
          is_hidden: !isShowState
        })}
      >
        未连接
      </i>
    </div>
  );
}
