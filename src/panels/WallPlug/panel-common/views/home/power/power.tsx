import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './power.less';

import switchImage from '../../icons/normal/switch.svg';
import switchImageBlueWhite from '../../icons/blue-white/switch.svg';
import switchImageDark from '../../icons/dark/switch.svg';
import switchImageMorandi from '../../icons/morandi/switch.svg';
import switchImageDefault from '../../icons/normal/switch-close.svg';

export function Power() {
  const themeType = getThemeType();
  const switchImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return switchImage;
      case 'blueWhite':
        return switchImageBlueWhite;
      case 'dark':
        return switchImageDark;
      case 'colorful':
        return switchImageDark;
      case 'morandi':
        return switchImageMorandi;
      default:
        return switchImage;
    }
  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1,
      switch_1: sdk.deviceData.power_switch === 1 ? 0 : 1,
      switch_2: sdk.deviceData.power_switch === 1 ? 0 : 1,
    });
  };
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'power'}
        className={classNames(
          'button-circle',
          'btn-power-switch',
        )}
        onClick={handlePowerSwitch}
      >
        <img src={sdk.deviceData.power_switch === 1 ? switchImageSrc() : switchImageDefault} alt=""/>
      </button>
    </article>
  );
}
