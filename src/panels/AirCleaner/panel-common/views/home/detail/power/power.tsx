import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import './power.less';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { SvgIcon } from '@components/common/icon';

export function Power() {
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  };
  return (
    <article className={classNames('power-tools-bar', 'border-bottom')}>
      <button
        id={'power'}
        className={classNames(
          'button-circle',
          'box-shadow',
          'btn-power-switch'
        )}
        onClick={handlePowerSwitch}
      >
        <SvgIcon name={'icon-power-common'} />
      </button>
    </article>
  );
}
