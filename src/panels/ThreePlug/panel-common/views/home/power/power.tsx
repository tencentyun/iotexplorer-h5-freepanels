import React, { useState } from 'react';
import { useHistory } from 'react-router';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { TimePicker } from '@components/business';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import './power.less';
import SwitchImage from '../../icons/normal/switch.svg';
import SwitchImageClose from '../../icons/normal/switch-close.svg';
import SwitchImageBlueWhite from '../../icons/blue-white/switch.svg';
import SwitchImageDark from '../../icons/dark/switch.svg';
import SwitchImageDarkClose from '../../icons/dark/switch-close.svg';
import SwitchImageColorfulClose from '../../icons/colorful/switch-close.svg';
import SwitchImageMorandi from '../../icons/morandi/switch.svg';

import TimingImage from '../../icons/normal/timing.svg';
import TimingImageDefaule from '../../icons/normal/timing-close.svg';
import TimingImageBlueWhite from '../../icons/blue-white/timing.svg';
import TimingImageDark from '../../icons/dark/timing.svg';
import TimingImageColorful from '../../icons/colorful/timing.svg';
import TimingImageMorandi from '../../icons/morandi/timing.svg';

import SettingImage from '../../icons/normal/setting.svg';
import SettingImageDefaule from '../../icons/normal/setting-close.svg';
import SettingImageBlueWhite from '../../icons/blue-white/setting.svg';
import SettingImageDark from '../../icons/dark/setting.svg';
import SettingImageColorful from '../../icons/colorful/setting.svg';
import SettingImageMorandi from '../../icons/morandi/setting.svg';

export function Power() {
  const themeType = getThemeType();
  const switchImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.power_switch === 1 ? SwitchImage : SwitchImageClose;
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1 ? SwitchImageBlueWhite : SwitchImageDarkClose;
      case 'dark':
        return sdk.deviceData.power_switch === 1 ? SwitchImageDark : SwitchImageDarkClose;
      case 'colorful':
        return sdk.deviceData.power_switch === 1 ? SwitchImageDark : SwitchImageColorfulClose;
      case 'morandi':
        return sdk.deviceData.power_switch === 1 ? SwitchImageMorandi : SwitchImageDarkClose;
      default:
        return sdk.deviceData.power_switch === 1 ? SwitchImage : SwitchImageClose;
    }
  };

  const timingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return TimingImage;
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1 ? TimingImageBlueWhite : TimingImageDefaule;
      case 'dark':
        return sdk.deviceData.power_switch === 1 ? TimingImageDark : TimingImageDefaule;
      case 'colorful':
        return sdk.deviceData.power_switch === 1 ? TimingImageColorful : TimingImageDefaule;
      case 'morandi':
        return sdk.deviceData.power_switch === 1 ? TimingImageMorandi : TimingImageDefaule;
      default:
        return sdk.deviceData.power_switch === 1 ? TimingImage : TimingImageDefaule;
    }
  };
  const settingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SettingImage;
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1 ? SettingImageBlueWhite : SettingImageDefaule;
      case 'dark':
        return sdk.deviceData.power_switch === 1 ? SettingImageDark : SettingImageDefaule;
      case 'colorful':
        return sdk.deviceData.power_switch === 1 ? SettingImageColorful : SettingImageDefaule;
      case 'morandi':
        return sdk.deviceData.power_switch === 1 ? SettingImageMorandi : SettingImageDefaule;
      default:
        return sdk.deviceData.power_switch === 1 ? SettingImage : SettingImageDefaule;
    }
  };
  const [timingVisible, onToggleTiming] = useState(false);

  const handleCountdownDefault = (value: number) => {
    const hours: number = (value - (value % (60 * 60))) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: string[] = [hours.toString(), minutes.toString()];
    return countdownTime;
  };

  const handleCountdownVal = () => {
    const switchOpen = sdk.deviceData.count_down;
    return handleCountdownDefault(switchOpen);
  };

  const handleTiming = () => {
    if (sdk.deviceData.power_switch === 1) {
      onToggleTiming(true);
    }
  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1,
    });
  };
  const history = useHistory();
  const handleToggle = () => {
    if (sdk.deviceData.power_switch === 1) {
      return history.push('/timing');
    }
    return '';
  };
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'timing'}
        className={classNames(
          'button-fillet',
          'box-shadow',
        )}
        onClick={handleToggle}
      >
        <img src={timingImageSrc()} alt="" />
        <div
          className={classNames(
            'label',
            sdk.deviceData.power_switch === 1 ? '' : 'btn-off',
          )}
        >
          定时
        </div>
      </button>
      <div
        id={'power'}
        className={classNames('button-circle', 'btn-power-switch')}
        onClick={handlePowerSwitch}
      >
        <img src={switchImageSrc()} alt="" />
      </div>
      <button
        id={'setting'}
        className={classNames(
          'button-fillet',
          'box-shadow',
        )}
        onClick={handleTiming}
      >
        <img src={settingImageSrc()} alt="" />
        <div
          className={classNames(
            'label',
            sdk.deviceData.power_switch === 1 ? '' : 'btn-off',
          )}
        >
          设置
        </div>
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
        onConfirm={(value: string[]) => {
          const hour = Number(value[0].split('时')[0]);
          const mins = Number(value[1].split('分')[0]);
          const num = hour * 3600 + mins * 60;
          onControlDevice('count_down', num);
        }}
        visible={timingVisible}
      />
    </article>
  );
}
