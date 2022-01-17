import React, { useState } from 'react';
import classNames from 'classnames';
import './environment.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import {onControlDevice} from '@hooks/useDeviceData';
import HandImage from '../../../icons/normal/hand-movement.svg';
import HandImageClose from '../../../icons/normal/hand-movement-close.svg';
import HandImageBlueWhite from '../../../icons/blue-white/hand-movement.svg';
import HandImageDark from '../../../icons/dark/hand-movement.svg';
import HandImageColorful from '../../../icons/colorful/hand-movement.svg';
import HandImageMorandi from '../../../icons/morandi/hand-movement.svg';
import HandImageMorandiClose from '../../../icons/morandi/hand-movement-close.svg';

import AutomaticImage from '../../../icons/normal/automatic.svg';
import AutomaticImageClose from '../../../icons/normal/automatic-close.svg';
import AutomaticImageBlueWhite from '../../../icons/blue-white/automatic.svg';
import AutomaticImageDark from '../../../icons/dark/automatic.svg';
import AutomaticImageColorful from '../../../icons/colorful/automatic.svg';
import AutomaticImageMorandi from '../../../icons/morandi/automatic.svg';
import AutomaticImageMorandiClose from '../../../icons/morandi/automatic-close.svg';

import ComfortImage from '../../../icons/normal/comfort.svg';
import ComfortImageClose from '../../../icons/normal/comfort-close.svg';
import ComfortImageBlueWhite from '../../../icons/blue-white/comfort.svg';
import ComfortImageDark from '../../../icons/dark/comfort.svg';
import ComfortImageColorful from '../../../icons/colorful/comfort.svg';
import ComfortImageMorandi from '../../../icons/morandi/comfort.svg';
import ComfortImageMorandiClose from '../../../icons/morandi/comfort-close.svg';

import SleepImage from '../../../icons/normal/sleep.svg';
import SleepImageClose from '../../../icons/normal/sleep-close.svg';
import SleepImageBlueWhite from '../../../icons/blue-white/sleep.svg';
import SleepImageDark from '../../../icons/dark/sleep.svg';
import SleepImageColorful from '../../../icons/colorful/sleep.svg';
import SleepImageMorandi from '../../../icons/morandi/sleep.svg';
import SleepImageMorandiClose from '../../../icons/morandi/sleep-close.svg';

const Environment = () => {
  const themeType = getThemeType();
  const handImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.mode === '3' ? HandImage : HandImageClose;
      case 'blueWhite':
        return sdk.deviceData.mode === '3' ? HandImageBlueWhite : HandImageClose;
      case 'dark':
        return sdk.deviceData.mode === '3' ? HandImageDark : HandImageClose;
      case 'colorful':
        return sdk.deviceData.mode === '3' ? HandImageColorful : HandImageClose;
      case 'morandi':
        return sdk.deviceData.mode === '3' ? HandImageMorandi : HandImageMorandiClose;
      default:
        return sdk.deviceData.mode === '3' ? HandImage : HandImageClose;
    }
  };
  const automaticImageSrc = () => {
    switch (themeType) {
      case 'blueWhite':
        return sdk.deviceData.mode === '0' ? AutomaticImageBlueWhite : AutomaticImageClose;
      case 'dark':
        return sdk.deviceData.mode === '0' ? AutomaticImageDark : AutomaticImageClose;
      case 'colorful':
        return sdk.deviceData.mode === '0' ? AutomaticImageColorful : AutomaticImageClose;
      case 'morandi':
        return sdk.deviceData.mode === '0' ? AutomaticImageMorandi : AutomaticImageMorandiClose;
      default:
        return sdk.deviceData.mode === '0' ? AutomaticImage : AutomaticImageClose;
    }
  };
  const comfortImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.mode === '2' ? ComfortImage : ComfortImageClose;
      case 'blueWhite':
        return sdk.deviceData.mode === '2' ? ComfortImageBlueWhite : ComfortImageClose;
      case 'dark':
        return sdk.deviceData.mode === '2' ? ComfortImageDark : ComfortImageClose;
      case 'colorful':
        return sdk.deviceData.mode === '2' ? ComfortImageColorful : ComfortImageClose;
      case 'morandi':
        return sdk.deviceData.mode === '2' ? ComfortImageMorandi : ComfortImageMorandiClose;
      default:
        return sdk.deviceData.mode === '2' ? ComfortImage : ComfortImageClose;
    }
  };
  const sleepImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.mode === '1' ? SleepImage : SleepImageClose;
      case 'blueWhite':
        return sdk.deviceData.mode === '1' ? SleepImageBlueWhite : SleepImageClose;
      case 'dark':
        return sdk.deviceData.mode === '1' ? SleepImageDark : SleepImageClose;
      case 'colorful':
        return sdk.deviceData.mode === '1' ? SleepImageColorful : SleepImageClose;
      case 'morandi':
        return sdk.deviceData.mode === '1' ? SleepImageMorandi : SleepImageMorandiClose;
      default:
        return sdk.deviceData.mode === '1' ? SleepImage : SleepImageClose;
    }
  };

  const handleMode = (type: string) => {
    onControlDevice('mode', type);
  };
  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div
          id={'hand'}
          className={classNames('temperature')}
          onClick={() => handleMode('3')}
        >
          <img
            src={sdk.deviceData.power_switch === 1 ? handImageSrc() : HandImageClose}
            alt=""
          />
          <div className={sdk.deviceData.power_switch === 1 && sdk.deviceData.mode === '3' ? 'check' : ''}>手动模式</div>
        </div>
        <span className="line" />
        <span className="line1" />
        <div
          id={'automatic'}
          className={classNames('humidity')}
          onClick={() => handleMode('0')}
        >
          <img
            src={
              sdk.deviceData.power_switch === 1
                ? automaticImageSrc()
                : AutomaticImageClose
            }
            alt=""
          />
          <div className={sdk.deviceData.power_switch === 1 && sdk.deviceData.mode === '0' ? 'check' : ''}>自动模式</div>
        </div>
      </div>
      <div className={'environment-wrap1'}>
        <div
          id={'comfort'}
          className={classNames('temperature')}
          onClick={() => handleMode('2')}
        >
          <img
            src={
              sdk.deviceData.power_switch === 1
                ? comfortImageSrc()
                : ComfortImageClose
            }
            alt=""
          />
          <div className={sdk.deviceData.power_switch === 1 && sdk.deviceData.mode === '2' ? 'check' : ''}>舒适模式</div>
        </div>
        <span className="line" />
        <span className="line1" />
        <div
          id={'sleep'}
          className={classNames('humidity')}
          onClick={() => handleMode('1')}
        >
          <img
            src={sdk.deviceData.power_switch === 1 ? sleepImageSrc() : SleepImageClose}
            alt=""
          />
          <div className={sdk.deviceData.power_switch === 1 && sdk.deviceData.mode === '1' ? 'check' : ''}>睡眠模式</div>
        </div>
      </div>
    </article>
  );
};

export default Environment;
