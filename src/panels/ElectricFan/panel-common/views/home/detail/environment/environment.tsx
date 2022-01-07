import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import {getThemeType} from "@libs/theme";
import {onControlDevice} from "@hooks/useDeviceData";
import './environment.less';

import SleepImage from '../../../icons/normal/sleep.svg';
import SleepImageClose from '../../../icons/normal/sleep-close.svg';
import SleepImageBlueWhite from '../../../icons/blue-white/sleep.svg';
import SleepImageDark from '../../../icons/dark/sleep.svg';
import SleepImageColorful from '../../../icons/colorful/sleep.svg';
import SleepImageMorandi from '../../../icons/morandi/sleep.svg';

import NormalImage from '../../../icons/normal/normal.svg';
import NormalImageClose from '../../../icons/normal/normal-close.svg';
import NormalImageBlueWhite from '../../../icons/blue-white/normal.svg';
import NormalImageDark from '../../../icons/dark/normal.svg';
import NormalImageColorful from '../../../icons/colorful/normal.svg';
import NormalImageMorandi from '../../../icons/morandi/normal.svg';

import NatureImage from '../../../icons/normal/nature.svg';
import NatureImageClose from '../../../icons/normal/nature-close.svg';
import NatureImageBlueWhite from '../../../icons/blue-white/nature.svg';
import NatureImageDark from '../../../icons/dark/nature.svg';
import NatureImageColorful from '../../../icons/colorful/nature.svg';
import NatureImageMorandi from '../../../icons/morandi/nature.svg';

import IntelligentImage from '../../../icons/normal/intelligent.svg';
import IntelligentImageClose from '../../../icons/normal/intelligent-close.svg';
import IntelligentImageBlueWhite from '../../../icons/blue-white/intelligent.svg';
import IntelligentImageDark from '../../../icons/dark/intelligent.svg';
import IntelligentImageColorful from '../../../icons/colorful/intelligent.svg';
import IntelligentImageMorandi from '../../../icons/morandi/intelligent.svg';

const themeType = getThemeType();
const Environment = () => {
  const sleepImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.mode === '2' ? SleepImage : SleepImageClose;
      case 'blueWhite':
        return sdk.deviceData.mode === '2' ? SleepImageBlueWhite : SleepImageClose;
      case 'dark':
        return sdk.deviceData.mode === '2' ? SleepImageDark : SleepImageClose;
      case 'colorful':
        return sdk.deviceData.mode === '2' ? SleepImageColorful : SleepImageClose;
      case 'morandi':
        return sdk.deviceData.mode === '2' ? SleepImageMorandi : SleepImageClose;
      default:
        return sdk.deviceData.mode === '2' ? SleepImage : SleepImageClose;
    }
  };
  const normalImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.mode === '0' ? NormalImage : NormalImageClose;
      case 'blueWhite':
        return sdk.deviceData.mode === '0' ? NormalImageBlueWhite : NormalImageClose;
      case 'dark':
        return sdk.deviceData.mode === '0' ? NormalImageDark : NormalImageClose;
      case 'colorful':
        return sdk.deviceData.mode === '0' ? NormalImageColorful : NormalImageClose;
      case 'morandi':
        return sdk.deviceData.mode === '0' ? NormalImageMorandi : NormalImageClose;
      default:
        return sdk.deviceData.mode === '0' ? NormalImage : NormalImageClose;
    }
  };
  const natureImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.mode === '1' ? NatureImage : NatureImageClose;
      case 'blueWhite':
        return sdk.deviceData.mode === '1' ? NatureImageBlueWhite : NatureImageClose;
      case 'dark':
        return sdk.deviceData.mode === '1' ? NatureImageDark : NatureImageClose;
      case 'colorful':
        return sdk.deviceData.mode === '1' ? NatureImageColorful : NatureImageClose;
      case 'morandi':
        return sdk.deviceData.mode === '1' ? NatureImageMorandi : NatureImageClose;
      default:
        return sdk.deviceData.mode === '1' ? NatureImage : NatureImageClose;
    }
  };
  const intelligentImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.mode === '3' ? IntelligentImage : IntelligentImageClose;
      case 'blueWhite':
        return sdk.deviceData.mode === '3' ? IntelligentImageBlueWhite : IntelligentImageClose;
      case 'dark':
        return sdk.deviceData.mode === '3' ? IntelligentImageDark : IntelligentImageClose;
      case 'colorful':
        return sdk.deviceData.mode === '3' ? IntelligentImageColorful : IntelligentImageClose;
      case 'morandi':
        return sdk.deviceData.mode === '3' ? IntelligentImageMorandi : IntelligentImageClose;
      default:
        return sdk.deviceData.mode === '3' ? IntelligentImage : IntelligentImageClose;
    }
  };
  const handleMode = (type: string) => {
    if (sdk.deviceData.power_switch === 1) {
      onControlDevice('mode', type);
    }
  };
  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div className={classNames('nature')} onClick={() => handleMode('1')}>
          <img src={natureImageSrc()}></img>
          <div className={sdk.deviceData.mode === '1' ? 'check' : ''}>自然风</div>
        </div>
        <div className={classNames('normal')} onClick={() => handleMode('0')}>
          <img src={normalImageSrc()}></img>
          <div className={sdk.deviceData.mode === '0' ? 'check' : ''}>正常风</div>
        </div>
      </div>
      <div className={'environment-wrap'}>
        <div className={classNames('sleep')} onClick={() => handleMode('2')}>
          <img src={sleepImageSrc()}></img>
          <div className={sdk.deviceData.mode === '2' ? 'check' : ''}>睡眠风</div>
        </div>
        <div
          className={classNames('intelligent')}
          onClick={() => handleMode('3')}
        >
          <img src={intelligentImageSrc()}></img>
          <div className={sdk.deviceData.mode === '3' ? 'check' : ''}>智能模式</div>
        </div>
      </div>
    </article>
  );
};

export default Environment;
