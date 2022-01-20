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
import { apiControlDeviceData } from '@hooks/useDeviceData';
import IconTheme from '@components/common/icon/icon-theme';

export enum enumTempKey {
  set_temp,
  set_fahrenheit
}

export function Power() {

  /*按钮改为控制湿度*/
  const handleToggle = (isAdd: boolean) => {
    const oldVal = sdk.deviceData.set_humidity || 0;
    if (isAdd) {
      if (oldVal < 100)
        apiControlDeviceData({
          set_humidity: oldVal + 1
        });
    } else {
      if (oldVal > 0)
        apiControlDeviceData({
          set_humidity: oldVal - 1
        });
    }

  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 0 ? 1 : 0
    });
  };
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames(
          'power-tools-bar',
          'border-bottom',
          deviceData.power_switch === 1 ? 'power-open' : 'power-close' 
          )}>
          <button
            className={classNames('button-circle', 'box-shadow', 'reduce')}
            onClick={() => {
              handleToggle(false);
            }}
          >
            <IconTheme kind={'reduce'} size={82} />
          </button>
          <button
            id={'power'}
            className={classNames(
              'button-circle',
              'box-shadow',
              'btn-power-switch'
            )}
            onClick={handlePowerSwitch}
          >
            <IconTheme kind={'power_humidifier'} size={94} />
          </button>
          <button
            className={classNames('button-circle', 'box-shadow', 'add')}
            onClick={() => {
              handleToggle(true);
            }}
          >
            <IconTheme kind={'add'} size={82} />
          </button>
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
