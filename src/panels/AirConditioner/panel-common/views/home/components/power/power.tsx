/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 14:58:28
 * @LastEditors:
 * @LastEditTime:
 */
import React from 'react';
import { DeviceSateContext } from '../../../../deviceStateContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';

import { SvgIcon } from '@components/common/icon';
import './power.less';

export enum enumTempKey {
  celsius = 'temp_set',
  fahrenheit = 'temp_set_f'
}

export function Power() {
  // 根据当前温度单位，控制最大值
  const handleToggle = (isAdd: boolean) => {
    const { temp_unit_convert } = sdk.deviceData;
    const action = (enumTempKey as any)[temp_unit_convert || 'celsius'];
    const max = temp_unit_convert === 'fahrenheit' ? 100 : 50; // 摄氏度
    const oldVal = sdk.deviceData[action] || 0;
    if (isAdd) {
      if (oldVal < max) {
        apiControlDeviceData({
          [action]: oldVal + 1,
        });
      }
    } else {
      if (oldVal > 0) {
        apiControlDeviceData({
          [action]: oldVal - 1,
        });
      }
    }
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames('power-tools-bar', 'border-bottom')}>
          <button
            className={classNames('button-circle', 'box-shadow', 'reduce')}
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
              'box-shadow',
              'btn-power-switch',
              sdk.deviceData.power_switch === 1 ? 'switch-open' : 'switch-close',
            )}
            onClick={() => {
              onControlDevice('power_switch', Number(!deviceData.power_switch));
            }}
          >
            <SvgIcon name="icon-power"></SvgIcon>
          </button>
          <button
            className={classNames('button-circle', 'box-shadow', 'add')}
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
