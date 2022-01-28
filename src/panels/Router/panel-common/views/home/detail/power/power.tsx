import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import './power.less';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import addIcon from '../../../icons/normal/add.svg';

export function Power() {
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 0 ? 1 : 0
    });
  };
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'power'}
        className={classNames('btn-power-switch')}
        onClick={handlePowerSwitch}
      >
        <img className="img" src={addIcon} alt="" />
      </button>
    </article>
  );
}
