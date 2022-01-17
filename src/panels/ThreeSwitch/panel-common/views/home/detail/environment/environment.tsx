import React, { useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useHistory } from 'react-router-dom';
import { numberToArray } from '@libs/utillib';
import { getThemeType } from '@libs/theme';
import { ValuePicker } from '@components/business';
import { apiControlDeviceData, onControlDevice} from '@hooks/useDeviceData';
import './environment.less';

import OnImage from "../../../icons/normal/on.svg";
import OnImageClose from "../../../icons/normal/on-close.svg";
import OnImageBlueWhite from "../../../icons/blue-white/on.svg";
import OnImageDark from "../../../icons/dark/on.svg";
import OnImageColorful from "../../../icons/colorful/on.svg";
import OnImageMorandi from "../../../icons/morandi/on.svg";

import TimingImage from "../../../icons/normal/timing.svg";
import TimingImageBlueWhite from "../../../icons/blue-white/timing.svg";
import TimingImageDark from "../../../icons/dark/timing.svg";
import TimingImageColorful from "../../../icons/colorful/timing.svg";
import TimingImageMorandi from "../../../icons/morandi/timing.svg";

import OffImage from "../../../icons/normal/off.svg";
import OffImageClose from "../../../icons/normal/off-close.svg";
import OffImageBlueWhite from "../../../icons/blue-white/off.svg";
import OffImageDark from "../../../icons/dark/off.svg";
import OffImageColorful from "../../../icons/colorful/off.svg";
import OffImageMorandi from "../../../icons/morandi/off.svg";

import CountdownImage from "../../../icons/normal/countdown.svg";
import CountdownImageBlueWhite from "../../../icons/blue-white/countdown.svg";
import CountdownImageDark from "../../../icons/dark/countdown.svg";
import CountdownImageColorful from "../../../icons/colorful/countdown.svg";
import CountdownImageMorandi from "../../../icons/morandi/countdown.svg";

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
  const [countdownTime] = useState([]);
  const countDownColumns = () => {
    const hourCols = numberToArray(12, '时');
    const minuteCols = numberToArray(60, '分');

    return [hourCols, minuteCols];
  };

  const handleOn = () => {
    apiControlDeviceData({ switch_1: 1, switch_2: 1, switch_3: 1 });
  };

  const handleOff = () => {
    apiControlDeviceData({ switch_1: 0, switch_2: 0, switch_3: 0 });
  };
  const history = useHistory();
  const handleToggle = () => {
    // 更多跳转
    return history.push('/timing');
  };

  const handleCountdown = () => {
    onToggleCountDown(true);
  };

  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div className={classNames('all-open')} onClick={handleOn}>
          <img src={sdk.deviceData.switch_1 === 1 && sdk.deviceData.switch_2 === 1 && sdk.deviceData.switch_3 === 1 ? onImageSrc() : OnImageClose} alt="" />
          <div className={sdk.deviceData.switch_1 === 1 && sdk.deviceData.switch_2 === 1 && sdk.deviceData.switch_3 === 1 ? 'check' : ''}>全开</div>
        </div>
        <div className={classNames('timing')} onClick={handleToggle}>
          <img src={timingImageSrc()} alt="" />
          <div>定时</div>
        </div>
      </div>
      <div className={'environment-wrap'}>
        <div className={classNames('all-close')} onClick={handleOff}>
          <img src={sdk.deviceData.switch_1 === 0 && sdk.deviceData.switch_2 === 0 && sdk.deviceData.switch_3 === 0 ? offImageSrc() : OffImageClose} alt="" />
          <div className={sdk.deviceData.switch_1 === 0 && sdk.deviceData.switch_2 === 0 && sdk.deviceData.switch_3 === 0 ? 'check' : ''}>全关</div>
        </div>
        <div className={classNames('countdown')} onClick={handleCountdown}>
          <img src={countdownImageSrc()} alt="" />
          <div>倒计时</div>
        </div>
        <ValuePicker
          title="倒计时关闭"
          visible={countDownVisible}
          value={countdownTime}
          columns={countDownColumns()}
          onCancel={() => {
            onToggleCountDown(false);
          }}
          onConfirm={value => {
            let hour = value[0];
            let minute = value[1];
            if (hour != null) {
              hour = hour.substr(0, hour.length - 1);
            }
            if (minute != null) {
              minute = minute.substr(0, minute.length - 1);
            }
            const countDown = Number(hour) * 3600 + Number(minute) * 60;
            if (sdk.deviceData.switch_1 === 1) {
              onControlDevice('count_down_1', countDown);
            }
            if (sdk.deviceData.switch_2 === 1) {
              onControlDevice('count_down_2', countDown);
            }
            if (sdk.deviceData.switch_3 === 1) {
              onControlDevice('count_down_3', countDown);
            }
            onToggleCountDown(false);
          }}
        />
      </div>
    </article>
  );
};

export default Environment;
