import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import {getThemeType} from '@libs/theme';
import { apiControlDeviceData, onControlDevice} from '@hooks/useDeviceData';
import {TimePicker} from '@components/business';
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

  const [timingVisible, onToggleTiming] = useState(false);
  // 倒计时
  const handleCountdownDefault = (value: number) => {
    const hours: number = (value - value % (60 * 60)) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: any = [hours.toString(), minutes.toString()];
    return countdownTime;
  };

  const handleCountdownVal = () => {
    let switchOpen = sdk.deviceData.timer;
    return handleCountdownDefault(switchOpen);
  };

  const handlePivoting = () => {
    onControlDevice('swing', Number(!sdk.deviceData.swing));
  };
  const handleTiming = () => {
    onToggleTiming(true);
  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  };
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'pivoting'}
        className={classNames(
          'button-fillet',
          'btn-power-switch',
          sdk.deviceData.swing === 1 ? 'active' : ''
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
          sdk.deviceData.power_switch === 0 ? 'power-on' : ''
        )}
        onClick={handlePowerSwitch}
      >
        <img src={sdk.deviceData.power_switch === 1 ? switchImageSrc() : switchImageDefault} alt=""/>
      </button>
      <button
        id={'timing'}
        className={classNames(
          'button-fillet',
          'btn-power-switch'
        )}
        onClick={handleTiming}
      >
        <img src={sdk.deviceData.power_switch === 1 ? timingImageSrc() : timingImageDefault} alt=""/>
        <div className={classNames('label')}>定时</div>
      </button>
      <TimePicker
        showSemicolon={false}
        value={handleCountdownVal()}
        showUnit={true}
        showTime={false}
        showTwoDigit={false}
        theme={themeType}
        title="倒计时关闭"
        onCancel={onToggleTiming.bind(null, false)}
        onConfirm={(value: any) => {
          const hour: number = Number(value[0].split('时')[0]);
          const mins: number = Number(value[1].split('分')[0]);
          const num = hour * 3600 + mins * 60;
          onControlDevice('timer', num);
        }}
        visible={timingVisible}
      />
    </article>
  );
}
