/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 14:58:28
 * @LastEditors:
 * @LastEditTime:
 */
import React from 'react';
import { DeviceSateContext } from '../../../../../../deviceStateContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import './power.less';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { SvgIcon } from '@components/common/icon';


export enum enumTempKey {
  set_temp,
  set_fahrenheit
}

export function Power() {
  /* 按钮改为控制湿度*/
  const handleToggle = (isAdd: boolean) => {
    const oldVal = sdk.deviceData.set_humidity || 0;
    if (isAdd) {
      if (oldVal < 100) apiControlDeviceData({
        set_humidity: oldVal + 1,
      });
    } else {
      if (oldVal > 0) apiControlDeviceData({
        set_humidity: oldVal - 1,
      });
    }
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames(
          'power-tools-bar',
          'border-bottom',
          deviceData.power_switch === 1 ? 'power-open' : 'power-close',
        )}>
          <button
            className={classNames('button-circle', 'reduce')}
            onClick={() => {
              if (!deviceData.power_switch) return;
              handleToggle(false);
            }}
          >
            <SvgIcon name="icon-reduce"></SvgIcon>
          </button>
          <button
            id={'power'}
            className={classNames(
              'button-circle',
              'btn-power-switch',
            )}
            onClick={() => {
              onControlDevice('power_switch', Number(!deviceData.power_switch));
            }}
          >
            <SvgIcon name="icon-power"></SvgIcon>
          </button>
          <button
            className={classNames('button-circle', 'add')}
            onClick={() => {
              if (!deviceData.power_switch) return;
              handleToggle(true);
            }}
          >
            <SvgIcon name="icon-add"></SvgIcon>
          </button>
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
