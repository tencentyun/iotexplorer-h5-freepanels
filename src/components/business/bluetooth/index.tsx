/*
 * @Author: wrq
 * @Date: 2021-09-20 09:50:22
 * @Description: 蓝牙模块
 */
import React from 'react';
import classNames from 'classnames';
import {
  StandardBleConnectStatusStr,
  useStandardBleConnector,
} from '@hooks/useStandardBleConnector';
import './style.less';

export interface BluetoothProps {
  isShowState?: boolean;
  deviceId?: number;
  familyId?: string;
}

export function Bluetooth(props: BluetoothProps) {
  const { isShowState = true } = props;

  const [connectStatusInfo] = useStandardBleConnector({
    deviceId: props.deviceId,
    familyId: props.familyId,
  });

  return (
    <div className="component_business_bluetooth">
      <span className="bluetooth-icon is_error"></span>
      <i
        className={classNames('connect-state font_2 color_3', {
          is_hidden: !isShowState,
        })}
      >
        {StandardBleConnectStatusStr[connectStatusInfo.status]}
      </i>
    </div>
  );
}
