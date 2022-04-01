import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { LightSwitch } from '@components/business/light-switch';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { ValuePicker } from '@components/business';
import { numberToArray } from '@libs/utillib';

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
const TimingImageColorful = 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/lamp-one/colorful/timing.png';

export function White() {
  const themeType = getThemeType();
  const [switchSrc] = useState(SwitchImageDefaule);
  const [timingSrc] = useState(TimingImageDefaule);
  const [timingVisible, onToggleTiming] = useState(false);
  const [timingTime] = useState([]);

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
  const countDownColumns = () => {
    const hourCols = numberToArray(12, '时');
    const minuteCols = numberToArray(60, '分');

    return [hourCols, minuteCols];
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
            onControlDevice('count_down', Number(countDown));
            onToggleTiming(false);
          }}
        />
      </div>
    </div>
  );
}
