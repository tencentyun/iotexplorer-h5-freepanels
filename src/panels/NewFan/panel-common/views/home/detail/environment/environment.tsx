import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import {onControlDevice} from '@hooks/useDeviceData';
import './environment.less';

import AutomaticImage from '../../../icons/normal/automatic.svg';
import AutomaticImageClose from "../../../icons/normal/automatic-close.svg";
import AutomaticImageBlueWhite from '../../../icons/blue-white/automatic.svg';
import AutomaticImageDark from '../../../icons/dark/automatic.svg';
import AutomaticImageColorful from '../../../icons/colorful/automatic.svg';
import AutomaticImageMorandi from "../../../icons/morandi/automatic.svg";
import FanImage from '../../../icons/normal/fan.svg';
import FanImageClose from '../../../icons/normal/fan-close.svg';
import FanImageBlueWhite from '../../../icons/blue-white/fan.svg';
import FanImageDark from '../../../icons/dark/fan.svg';
import FanImageColorful from '../../../icons/colorful/fan.svg';
import FanImageMorandi from '../../../icons/morandi/fan.svg';
import IntervalImage from '../../../icons/normal/interval.svg';
import IntervalImageClose from '../../../icons/normal/interval-close.svg';
import IntervalImageBlueWhite from '../../../icons/blue-white/interval.svg';
import IntervalImageDark from '../../../icons/dark/interval.svg';
import IntervalImageColorful from '../../../icons/colorful/interval.svg';
import IntervalImageMorandi from '../../../icons/morandi/interval.svg';
import SleepImage from '../../../icons/normal/sleep.svg';
import SleepImageClose from '../../../icons/normal/sleep-close.svg';
import SleepImageBlueWhite from '../../../icons/blue-white/sleep.svg';
import SleepImageDark from '../../../icons/dark/sleep.svg';
import SleepImageColorful from '../../../icons/colorful/sleep.svg';
import SleepImageMorandi from '../../../icons/morandi/sleep.svg';

const Environment = () => {
  const themeType = getThemeType();
  const automaticImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return AutomaticImage;
      case 'blueWhite':
        return AutomaticImageBlueWhite;
      case 'dark':
        return AutomaticImageDark;
      case 'colorful':
        return AutomaticImageColorful;
      case 'morandi':
        return AutomaticImageMorandi;
      default:
        return AutomaticImage;
    }
  };
  const fanImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return FanImage;
      case 'blueWhite':
        return FanImageBlueWhite;
      case 'dark':
        return FanImageDark;
      case 'colorful':
        return FanImageColorful;
      case 'morandi':
        return FanImageMorandi;
      default:
        return FanImage;
    }
  };
  const intervalImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return IntervalImage;
      case 'blueWhite':
        return IntervalImageBlueWhite;
      case 'dark':
        return IntervalImageDark;
      case 'colorful':
        return IntervalImageColorful;
      case 'morandi':
        return IntervalImageMorandi;
      default:
        return IntervalImage;
    }
  };
  const sleepImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SleepImage;
      case 'blueWhite':
        return SleepImageBlueWhite;
      case 'dark':
        return SleepImageDark;
      case 'colorful':
        return SleepImageColorful;
      case 'morandi':
        return SleepImageMorandi;
      default:
        return SleepImage;
    }
  };
  const handleMode = (type: string) => {
    if(sdk.deviceData.power_switch === 1){
      onControlDevice('mode', type);
    }
  };
  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div id={'automatic'} className={classNames('temperature')} onClick={() => handleMode('0')}>
          <img
            src={
              sdk.deviceData.mode === '0' ? automaticImageSrc() : AutomaticImageClose
            }
            alt=""
          />
          <div className={sdk.deviceData.mode === '0' ? 'check' : ''}>自动</div>
        </div>
        <span className="line" />
        <span className="line1" />
        <div id={'sleep'} className={classNames('humidity')} onClick={() => handleMode('1')}>
          <img
            src={
              sdk.deviceData.mode === '1' ? sleepImageSrc() : SleepImageClose
            }
            alt=""
          />
          <div className={sdk.deviceData.mode === '1' ? 'check' : ''}>睡眠</div>
        </div>
      </div>
      <div className={'environment-wrap1'}>
        <div id={'interval'} className={classNames('temperature')} onClick={() => handleMode('4')}>
          <img
            src={
              sdk.deviceData.mode === '4' ? intervalImageSrc() : IntervalImageClose
            }
            alt=""
          />
          <div className={sdk.deviceData.mode === '4' ? 'check' : ''}>间歇</div>
        </div>
        <span className="line" />
        <span className="line1" />
        <div id={'fan'} className={classNames('humidity')} onClick={() => handleMode('2')}>
          <img
            src={
              sdk.deviceData.mode === '2' ? fanImageSrc() : FanImageClose
            }
            alt=""
          />
          <div className={sdk.deviceData.mode === '2' ? 'check' : ''}>1挡</div>
        </div>
      </div>
    </article>
  );
};

export default Environment;
