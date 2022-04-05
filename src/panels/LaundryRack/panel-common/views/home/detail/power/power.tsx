import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import './power.less';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';

import PowerImageDown from '../../../icons/normal/off.svg';
import PowerImage from '../../../icons/normal/on.svg';
import PowerImageBlueWhiteDown from '../../../icons/blue-white/off.svg';
import PowerImageBlueWhite from '../../../icons/blue-white/on.svg';
import PowerImageDarkDown from '../../../icons/dark/off.svg';
import PowerImageDark from '../../../icons/dark/on.svg';
import PowerImageColorfulDown from '../../../icons/colorful/off.svg';
import PowerImageColorful from '../../../icons/colorful/on.svg';
import PowerImageMorandiDown from '../../../icons/morandi/off.svg';
import PowerImageMorandi from '../../../icons/morandi/on.svg';

import UpImageDefaule from '../../../icons/normal/up-open.svg';
import UpImage from '../../../icons/normal/up-close.svg';
import UpImageBlueWhite from '../../../icons/blue-white/up-open.svg';
import UpImageDark from '../../../icons/dark/up-close.svg';
import UpImageColorful from '../../../icons/colorful/up-close.svg';
import UpImageMorandi from '../../../icons/morandi/up-close.svg';

import DownImageDefaule from '../../../icons/normal/down-open.svg';
import DownImage from '../../../icons/normal/down-close.svg';
import DownImageBlueWhite from '../../../icons/blue-white/down-open.svg';
import DownImageDark from '../../../icons/dark/down-close.svg';
import DownImageColorful from '../../../icons/colorful/down-close.svg';
import DownImageMorandi from '../../../icons/morandi/down-close.svg';

export function Power() {
  const themeType = getThemeType();
  const powerImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.power_switch === 1 ? PowerImage : PowerImageDown;
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1
          ? PowerImageBlueWhite
          : PowerImageBlueWhiteDown;
      case 'dark':
        return sdk.deviceData.power_switch === 1
          ? PowerImageDark
          : PowerImageDarkDown;
      case 'colorful':
        return sdk.deviceData.power_switch === 1
          ? PowerImageColorful
          : PowerImageColorfulDown;
      case 'morandi':
        return sdk.deviceData.power_switch === 1
          ? PowerImageMorandi
          : PowerImageMorandiDown;
      default:
        return sdk.deviceData.power_switch === 1 ? PowerImage : PowerImageDown;
    }
  };

  const upImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.control === 'up' ? UpImageDefaule : UpImage;
      case 'blueWhite':
        return sdk.deviceData.control === 'up' ? UpImageBlueWhite : UpImageDefaule;
      case 'dark':
        return sdk.deviceData.control === 'up' ? UpImageDefaule : UpImageDark;
      case 'colorful':
        return sdk.deviceData.control === 'up' ? UpImageDefaule : UpImageColorful;
      case 'morandi':
        return sdk.deviceData.control === 'up' ? UpImageDefaule : UpImageMorandi;
      default:
        return sdk.deviceData.control === 'up' ? UpImageDefaule : UpImage;
    }
  };

  const downImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.control === 'down' ? DownImageDefaule : DownImage;
      case 'blueWhite':
        return sdk.deviceData.control === 'down' ? DownImageBlueWhite : DownImageDefaule;
      case 'dark':
        return sdk.deviceData.control === 'down' ? DownImageDefaule : DownImageDark;
      case 'colorful':
        return sdk.deviceData.control === 'down' ? DownImageDefaule : DownImageColorful;
      case 'morandi':
        return sdk.deviceData.control === 'down' ? DownImageDefaule : DownImageMorandi;
      default:
        return sdk.deviceData.control === 'down' ? DownImageDefaule : DownImage;
    }
  };
  const handleUp = () => {
    apiControlDeviceData({
      control: sdk.deviceData.control === 'up' ? 'stop' : 'up',
    });
  };
  const handleDown = () => {
    apiControlDeviceData({
      control: sdk.deviceData.control === 'down' ? 'stop' : 'down',
    });
  };

  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1,
    });
  };
  return (
    <article
      className={classNames(
        'power-tools-bar',
        sdk.deviceData.control === 'up' && 'up-switch',
        sdk.deviceData.control === 'down' && 'down-switch',
      )}
    >
      <button
        id={'pivoting'}
        className={classNames(
          'button-fillet',
          'box-shadow',
          'btn-power-switch',
        )}
        onClick={handleUp}
      >
        <img src={upImageSrc()} alt="" />
        <div className={classNames('label')}>上升</div>
      </button>
      <button
        id={'power'}
        className={classNames('box-shadow', 'btn-power-switch')}
        onClick={handlePowerSwitch}
      >
        <img src={powerImageSrc()} alt="" />
      </button>
      <button
        id={'timing'}
        className={classNames(
          'button-fillet',
          'box-shadow',
          'btn-power-switch',
        )}
        onClick={handleDown}
      >
        <img src={downImageSrc()} alt="" />
        <div className={classNames('label')}>下降</div>
      </button>
    </article>
  );
}
