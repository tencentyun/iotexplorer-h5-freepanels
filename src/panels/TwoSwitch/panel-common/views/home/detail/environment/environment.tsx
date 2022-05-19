import React, { useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useHistory } from 'react-router-dom';
import { numberToArray } from '@libs/utillib';
import { getThemeType } from '@libs/theme';
import { TimePicker } from '@components/business';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import './environment.less';

import OnImage from '../../../icons/normal/on.svg';
import OnImageBlueWhite from '../../../icons/blue-white/on.svg';
import OnImageDark from '../../../icons/dark/on.svg';
import OnImageColorful from '../../../icons/colorful/on.svg';
import OnImageMorandi from '../../../icons/morandi/on.svg';

import TimingImage from '../../../icons/normal/timing.svg';
import TimingImageBlueWhite from '../../../icons/blue-white/timing.svg';
import TimingImageDark from '../../../icons/dark/timing.svg';
import TimingImageColorful from '../../../icons/colorful/timing.svg';
import TimingImageMorandi from '../../../icons/morandi/timing.svg';

import OffImage from '../../../icons/normal/off.svg';
import OffImageBlueWhite from '../../../icons/blue-white/off.svg';
import OffImageDark from '../../../icons/dark/off.svg';
import OffImageColorful from '../../../icons/colorful/off.svg';
import OffImageMorandi from '../../../icons/morandi/off.svg';

import CountdownImage from '../../../icons/normal/countdown.svg';
import CountdownImageBlueWhite from '../../../icons/blue-white/countdown.svg';
import CountdownImageDark from '../../../icons/dark/countdown.svg';
import CountdownImageColorful from '../../../icons/colorful/countdown.svg';
import CountdownImageMorandi from '../../../icons/morandi/countdown.svg';

const Environment = () => {
  const themeType = getThemeType();
  const onImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return OnImage;
      case 'blueWhite':
        return OnImageBlueWhite;
      case 'dark':
        return OnImageDark;
      case 'colorful':
        return OnImageColorful;
      case 'morandi':
        return OnImageMorandi;
      default:
        return OnImage;
    }
  };
  const timingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return TimingImage;
      case 'blueWhite':
        return TimingImageBlueWhite;
      case 'dark':
        return TimingImageDark;
      case 'colorful':
        return TimingImageColorful;
      case 'morandi':
        return TimingImageMorandi;
      default:
        return TimingImage;
    }
  };
  const offImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return OffImage;
      case 'blueWhite':
        return OffImageBlueWhite;
      case 'dark':
        return OffImageDark;
      case 'colorful':
        return OffImageColorful;
      case 'morandi':
        return OffImageMorandi;
      default:
        return OffImage;
    }
  };
  const countdownImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return CountdownImage;
      case 'blueWhite':
        return CountdownImageBlueWhite;
      case 'dark':
        return CountdownImageDark;
      case 'colorful':
        return CountdownImageColorful;
      case 'morandi':
        return CountdownImageMorandi;
      default:
        return CountdownImage;
    }
  };
  // 倒计时
  const [countDownVisible, onToggleCountDown] = useState(false);

  const handleCountdownDefault = (value: number) => {
    const hours: number = (value - value % (60 * 60)) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: any = [hours.toString(), minutes.toString()];
    return countdownTime;
  };
  const handleCountdownVal = () => {
    let switchOpen = 0;
    if (sdk.deviceData.switch_2 === 1) {
      switchOpen = sdk.deviceData.count_down_2;
    }
    if (sdk.deviceData.switch_1 === 1) {
      switchOpen = sdk.deviceData.count_down_1;
    }
    return handleCountdownDefault(switchOpen);
  };
  const handleOn = () => {
    apiControlDeviceData({ switch_1: 1, switch_2: 1 });
    sdk.tips.show('已全开');
  };

  const handleOff = () => {
    apiControlDeviceData({ switch_1: 0, switch_2: 0 });
    sdk.tips.show('已全关');
  };
  const history = useHistory();
  const handleToggle = () =>
    // 更多跳转
    history.push('/timing')
  ;

  const handleCountdown = () => {
    onToggleCountDown(true);
  };

  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div className={classNames('all-open')} onClick={handleOn}>
          <img src={onImageSrc()} alt="" />
          <div className={'check'}>全开</div>
        </div>
        <div className={classNames('timing')} onClick={handleToggle}>
          <img src={timingImageSrc()} alt="" />
          <div>定时</div>
        </div>
      </div>
      <div className={'environment-wrap'}>
        <div className={classNames('all-close')} onClick={handleOff}>
          <img src={offImageSrc()} alt="" />
          <div className={'check'}>全关</div>
        </div>
        <div className={classNames('countdown')} onClick={handleCountdown}>
          <img src={countdownImageSrc()} alt="" />
          <div>倒计时</div>
        </div>
        <TimePicker
          showSemicolon={false}
          value={handleCountdownVal()}
          showUnit={true}
          showTime={false}
          showTwoDigit={false}
          theme={themeType}
          title="倒计时关闭"
          onCancel={onToggleCountDown.bind(null, false)}
          onConfirm={(value: any) => {
            const hour = Number(value[0].split('时')[0]);
            const mins = Number(value[1].split('分')[0]);
            const num = hour * 3600 + mins * 60;
            if (sdk.deviceData.switch_1 === 1) {
              onControlDevice('count_down_1', num);
            }
            if (sdk.deviceData.switch_2 === 1) {
              onControlDevice('count_down_2', num);
            }
          }}
          visible={countDownVisible}
        />
      </div>
    </article>
  );
};

export default Environment;
