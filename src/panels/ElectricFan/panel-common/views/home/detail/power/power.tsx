import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { ValuePicker } from '@components/business';
import { numberToArray } from '@libs/utillib';
import './power.less';

import pivotingImageDefault from '../../../icons/normal/pivoting-close.svg';
import pivotingImage from '../../../icons/normal/pivoting.svg';
import pivotingImageBlueWhite from '../../../icons/blue-white/pivoting.svg';
import pivotingImageDark from '../../../icons/dark/pivoting.svg';
import pivotingImageColorful from '../../../icons/colorful/pivoting.svg';
import pivotingImageMorandi from '../../../icons/morandi/pivoting.svg';
import pivotingImageWhite from '../../../icons/normal/pivoting-white.svg';
import pivotingImageMorandiWhite from '../../../icons/morandi/pivoting-morandi.svg';

import timingImageDefault from '../../../icons/normal/timing-close.svg';
import timingImage from '../../../icons/normal/timing.svg';
import timingImageBlueWhite from '../../../icons/blue-white/timing.svg';
import timingImageDark from '../../../icons/dark/timing.svg';
import timingImageColorful from '../../../icons/colorful/timing.svg';
import timingImageMorandi from '../../../icons/morandi/timing.svg';

import switchImageDefault from '../../../icons/normal/switch-close.svg';
import switchImage from '../../../icons/normal/switch.svg';
import switchImageBlueWhite from '../../../icons/blue-white/switch.svg';
import switchImageDark from '../../../icons/dark/switch.svg';
import switchImageMorandi from '../../../icons/morandi/switch.svg';

export function Power() {
  const themeType = getThemeType();
  const [timingVisible, onToggleTiming] = useState(false);
  const [timingTime] = useState([]);
  const countDownColumns = () => {
    const hourCols = numberToArray(12, '时');
    const minuteCols = numberToArray(60, '分');

    return [hourCols, minuteCols];
  };
  const pivotingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.swing === 1 ? pivotingImageWhite : pivotingImage;
      case 'blueWhite':
        return sdk.deviceData.swing === 1 ? pivotingImageWhite : pivotingImageBlueWhite;
      case 'dark':
        return sdk.deviceData.swing === 1 ? pivotingImageWhite : pivotingImageDark;
      case 'colorful':
        return sdk.deviceData.swing === 1 ? pivotingImageWhite : pivotingImageColorful;
      case 'morandi':
        return sdk.deviceData.swing === 1 ? pivotingImageMorandiWhite : pivotingImageMorandi;
      default:
        return sdk.deviceData.swing === 1 ? pivotingImageWhite : pivotingImage;
    }
  };
  const timingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return timingImage;
      case 'blueWhite':
        return timingImageBlueWhite;
      case 'dark':
        return timingImageDark;
      case 'colorful':
        return timingImageColorful;
      case 'morandi':
        return timingImageMorandi;
      default:
        return timingImage;
    }
  };
  const switchImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return switchImage;
      case 'blueWhite':
        return switchImageBlueWhite;
      case 'dark':
        return switchImageBlueWhite;
      case 'colorful':
        return switchImageDark;
      case 'morandi':
        return switchImageMorandi;
      default:
        return switchImage;
    }
  };
  const handlePivoting = () => {
    onControlDevice('swing', Number(!sdk.deviceData.swing));
  };
  const handleTiming = () => {
    onToggleTiming(true);
  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1,
    });
  };
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'pivoting'}
        className={classNames(
          'button-fillet',
          'btn-power-switch',
          sdk.deviceData.swing === 1 ? 'active' : '',
        )}
        onClick={handlePivoting}
      >
        <img src={sdk.deviceData.power_switch === 1 ? pivotingImageSrc() : pivotingImageDefault} alt=""/>
        <div className={classNames('label')}>摇头</div>
      </button>
      <button
        id={'power'}
        className={classNames(
          'btn-power-switch',
          sdk.deviceData.power_switch === 0 ? 'power-on' : '',
        )}
        onClick={handlePowerSwitch}
      >
        <img src={sdk.deviceData.power_switch === 1 ? switchImageSrc() : switchImageDefault} alt=""/>
      </button>
      <button
        id={'timing'}
        className={classNames(
          'button-fillet',
          'btn-power-switch',
        )}
        onClick={handleTiming}
      >
        <img src={sdk.deviceData.power_switch === 1 ? timingImageSrc() : timingImageDefault} alt=""/>
        <div className={classNames('label')}>定时</div>
      </button>
      <ValuePicker
        title="定时关闭"
        visible={timingVisible}
        value={timingTime}
        columns={countDownColumns()}
        onCancel={() => {
          onToggleTiming(false);
        }}
        onConfirm={(value) => {
          let hour = value[0];
          let minute = value[1];
          if (hour != null) {
            hour = hour.substr(0, hour.length - 1);
          }
          if (minute != null) {
            minute = minute.substr(0, minute.length - 1);
          }
          const countDown = Number(hour) * 3600 + Number(minute) * 60;
          onControlDevice('timer', Number(countDown));
          onToggleTiming(false);
        }}
      />
    </article>
  );
}
