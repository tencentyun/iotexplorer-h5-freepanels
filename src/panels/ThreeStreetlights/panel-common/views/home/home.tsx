import React from 'react';
import classNames from 'classnames';
import './home.less';
import { Position } from './position/position';
import { Detail } from './detail/detail';
import Ticker from './tiker/ticker';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { LightBright } from '@components/business/light-bright/light-bright';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import SettingImage from '../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../icons/blue-white/dev-open.svg';
import SettingImageColorful from '../icons/colorful/dev-open.svg';

export function Home() {
  const themeType = getThemeType();
  const changeBrightness = (val, endTouch) => {
    if (endTouch) {
      onControlDevice('brightness', val);
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
        return SettingImageBlueWhite;
      default:
        return SettingImage;
    }
  };
  const handleSetting = () => {
    sdk.goDeviceDetailPage({});
  };
  const handleSwitchStatus = () => {
    if (sdk.deviceData.power_switch !== 1) {
      sdk.tips.show('离线设备无法进行设置！');
    }
  };
  const getHomePage = () => {
    if (themeType == 'colorful') {
      return (
        <article>
          <Ticker/>
          <article className={classNames('lightbright')}>
            <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80}
                         onChange={changeBrightness}/>
          </article>
          <Position/>

          <Detail/>
        </article>
      );
    }
    return (
        <article>
          <div className='morandi_background'>
            <Ticker/>
            <Position/>
          </div>
          <div className='normal_background'>
            <article className={classNames('lightbright')}>
              <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80} onChange={changeBrightness}/>
            </article>
            <Detail/>
          </div>
        </article>
    );
  };
  return (
    <article>
      <div
        className={classNames('devSetting', 'dev-setting-open')}
        onClick={handleSetting}
      >
        <img src={settingImageSrc()} alt=""/>
      </div>
    <div
      id={'home'}
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off',
      )}
      onClick={handleSwitchStatus}
    >
      {getHomePage()}
    </div>
    </article>
  );
}
