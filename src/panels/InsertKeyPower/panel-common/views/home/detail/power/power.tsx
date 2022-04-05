import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';
import './power.less';

import SwitchImage from '../../../icons/normal/switch.svg';
import SwitchImageDefault from '../../../icons/normal/switch-close.svg';
import SwitchImageBlueWhite from '../../../icons/blue-white/switch.svg';
import SwitchImageBlueWhiteClose from '../../../icons/blue-white/switch-close.svg';
import SwitchImageDark from '../../../icons/dark/switch.svg';
import SwitchImageMorandi from '../../../icons/morandi/switch.svg';

export function Power() {
  const themeType = getThemeType();
  const powerImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.switch === 1 ? SwitchImage : SwitchImageDefault;
      case 'blueWhite':
        return sdk.deviceData.switch === 1 ? SwitchImageBlueWhite : SwitchImageBlueWhiteClose;
      case 'dark':
        return sdk.deviceData.switch === 1 ? SwitchImageDark : SwitchImageDefault;
      case 'colorful':
        return sdk.deviceData.switch === 1 ? SwitchImageDark : SwitchImageDefault;
      case 'morandi':
        return sdk.deviceData.switch === 1 ? SwitchImageMorandi : SwitchImageDefault;
      default:
        return sdk.deviceData.switch === 1 ? SwitchImage : SwitchImageDefault;
    }
  };
  const handlePivoting = (val: number) => {
    sdk.deviceData.switch === 1
      ? onControlDevice('power_switch', val)
      : '';
  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      switch: sdk.deviceData.switch === 1 ? 0 : 1,
    });
  };
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'dev-open'}
        className={classNames(
          'button-fillet',
          'box-shadow',
          sdk.deviceData.power_switch === 1 ? 'active' : '',
        )}
        onClick={() => handlePivoting(1)}
      >
        <div className={classNames('label')}>开</div>
      </button>
      <div
        id={'power'}
        className={classNames('btn-power-switch')}
        onClick={handlePowerSwitch}
      >
        <img src={sdk.deviceData.switch === 1 ? powerImageSrc() : SwitchImageDefault} alt="" />
      </div>
      <button
        id={'dev-close'}
        className={classNames(
          'button-fillet',
          'box-shadow',
          sdk.deviceData.power_switch === 0 ? 'active' : '',
        )}
        onClick={() => handlePivoting(0)}
      >
        <div className={classNames('label')}>关</div>
      </button>
    </article>
  );
}
