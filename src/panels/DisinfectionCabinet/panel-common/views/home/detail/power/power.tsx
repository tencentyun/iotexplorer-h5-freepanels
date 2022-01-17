import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './power.less';

import PowerImage from "../../../icons/normal/switch.svg";
import PowerImageDown from "../../../icons/normal/switch-close.svg";
import PowerImageBlueWhite from "../../../icons/blue-white/switch.svg";
import PowerImageBlueWhiteDown from "../../../icons/blue-white/switch-close.svg";
import PowerImageDark from "../../../icons/dark/switch.svg";
import PowerImageDarkDown from "../../../icons/dark/switch-close.svg";
import PowerImageMorandi from "../../../icons/morandi/switch.svg";
import PowerImageMorandiDown from "../../../icons/morandi/switch-close.svg";

const themeType = getThemeType();
export function Power() {
  const powerImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.power_switch === 1 ? PowerImage : PowerImageDown;
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1
          ? PowerImageBlueWhite
          : PowerImageBlueWhiteDown;
      case 'dark':
        return sdk.deviceData.power_switch === 1
          ? PowerImageDark
          : PowerImageDarkDown;
      case 'colorful':
        return sdk.deviceData.power_switch === 1
          ? PowerImageDark
          : PowerImageDown;
      case 'morandi':
        return sdk.deviceData.power_switch === 1
          ? PowerImageMorandi
          : PowerImageMorandiDown;
      default:
        return sdk.deviceData.power_switch === 1 ? PowerImage : PowerImageDown;
    }
  };
  const handleState = (val: string) => {
    switch (val) {
      case '0':
        return '待机';
      case '1':
        return '工作中';
      case '2':
        return '预约中';
      default:
        return '待机';
    }
  };
  const handlePowerSwitch = () => {
    if (sdk.deviceData.child_lock !== 1) {
      apiControlDeviceData({
        power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
      });
    }
  };
  return (
    <article className={classNames('power-tools-bar')}>
      <div id={'workState'} className="dev-info">
        <div className="title">工作状态</div>
        <div className={classNames('label',sdk.deviceData.power_switch === 1 ? 'active' : '')}>
          {sdk.deviceData.work_state
            ? handleState(sdk.deviceData.work_state)
            : '待机'}
        </div>
      </div>
      <div
        id={'power'}
        className={classNames('btn-power-switch')}
        onClick={handlePowerSwitch}
      >
        <img src={powerImageSrc()} alt="" />
      </div>
      <div id={'downTemperature'} className="dev-info">
        <div className="title">下层温度</div>
        <div className={classNames('label',sdk.deviceData.power_switch === 1 ? 'active' : '')}>
          {sdk.deviceData.down_temperature
            ? sdk.deviceData.down_temperature
            : '10'}
          ℃
        </div>
      </div>
    </article>
  );
}
