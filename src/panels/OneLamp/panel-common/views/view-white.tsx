import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { LightSwitch } from '@components/business/light-switch';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { TimePicker } from '@components/business';

import SwitchImageDefaule from './icons/normal/switch-close.svg';
import SwitchImage from './icons/normal/switch.svg';
import SwitchImageBlueWhite from './icons/blue-white/switch.svg';
import SwitchImageDark from './icons/dark/switch.svg';
import SwitchImageColorful from './icons/colorful/switch.svg';
import SwitchImageMorandi from './icons/morandi/switch.svg';

import TimingImageDefaule from './icons/normal/timing-close.svg';
import TimingImage from './icons/normal/timing.svg';
import TimingImageBlueWhite from './icons/blue-white/timing.svg';
import TimingImageDark from './icons/dark/timing.svg';
import TimingImageMorandi from './icons/morandi/timing.svg';

import SettingImage from './icons/normal/dev-open.svg';
import SettingImageBlueWhite from './icons/blue-white/dev-open.svg';
import SettingImageColorful from './icons/colorful/dev-open.svg';
import SettingImageMorandi from './icons/morandi/dev-open.svg';
const TimingImageColorful = 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/lamp-one/colorful/timing.png';

export function White() {
  const themeType = getThemeType();
  const [switchSrc] = useState(SwitchImageDefaule);
  const [timingSrc] = useState(TimingImageDefaule);
  const [timingVisible, onToggleTiming] = useState(false);

  const switchImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SwitchImage;
      case 'blueWhite':
        return SwitchImageBlueWhite;
      case 'dark':
        return SwitchImageDark;
      case 'colorful':
        return SwitchImageColorful;
      case 'morandi':
        return SwitchImageMorandi;
      default:
        return SwitchImage;
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
  const settingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SettingImage;
      case 'blueWhite':
        return SettingImageBlueWhite;
      case 'dark':
        return SettingImageBlueWhite;
      case 'colorful':
        return SettingImageColorful;
      case 'morandi':
        return SettingImageMorandi;
      default:
        return SettingImage;
    }
  };
  const handleSetting = () => {
    sdk.goDeviceDetailPage({});
  };
  const handleCountdownDefault = (value: number) => {
    const hours: number = (value - value % (60 * 60)) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: any = [hours.toString(), minutes.toString()];
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
  return (
    <div
      className={classNames(
        'white-pane',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off',
      )}
    >
      <div
        className={classNames('devSetting', 'dev-setting-open')}
        onClick={handleSetting}
      >
        <img src={settingImageSrc()} alt=""/>
      </div>
      {/* 亮度 */}
      <div className="control-light">
        <LightSwitch
          defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness / 100 : 0.4}
          disable={sdk.deviceData.power_switch === 1 ? 1 : 0}
          onChange={(value: any) => {
            if (sdk.deviceData.power_switch === 1) {
              onControlDevice('brightness', value.toFixed(2) * 100);
            }
          }}
        />
      </div>
      {/* 控制区 */}
      <div className="control-area">
        <Block onClick={handlePowerSwitch}>
          <img
            src={
              sdk.deviceData.power_switch === 1 ? switchImageSrc() : switchSrc
            }
            alt=""
          />
          <div>开关</div>
        </Block>
        <Block onClick={handleTiming}>
          <img
            src={
              sdk.deviceData.power_switch === 1 ? timingImageSrc() : timingSrc
            }
            alt=""
          />
          <div>定时</div>
        </Block>
      </div>
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
          const hour = Number(value[0].split('时')[0]);
          const mins = Number(value[1].split('分')[0]);
          const num = hour * 3600 + mins * 60;
          onControlDevice('count_down', num);
        }}
        visible={timingVisible}
      />
    </div>
  );
}
