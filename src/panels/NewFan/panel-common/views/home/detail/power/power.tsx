import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { SvgIcon } from '@components/common/icon';
import {getThemeType} from '@libs/theme';
import './power.less';
import switchImage from "../../../icons/blue-white/switch.svg";
import switchImageClose from "../../../icons/blue-white/switch-close.svg";

export function Power() {
  const themeType = getThemeType();
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  };
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'power'}
        className={classNames(
          'button-circle',
          'box-shadow',
          'btn-power-switch'
        )}
        onClick={handlePowerSwitch}
      >
        {themeType === 'blueWhite' ? (
          <img src={sdk.deviceData.power_switch === 1 ? switchImage : switchImageClose} alt="" />
        ) : (
          <SvgIcon name={'icon-power-common'} />
        )}
      </button>
    </article>
  );
}
