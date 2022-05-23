import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { Position } from './position/position';
import { Detail } from './detail/detail';
import Ticker from './tiker/ticker';
import './home.less';

import SettingImage from '../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../icons/normal/dev-open.svg';
import SettingImageDark from '../icons/normal/dev-open.svg';
import SettingImageColorful from '../icons/normal/dev-open.svg';
import SettingImageMorandi from '../icons/normal/dev-open.svg';

export function Home() {
  const themeType = getThemeType();
  const settingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SettingImage;
      case 'blueWhite':
        return SettingImageBlueWhite;
      case 'dark':
        return SettingImageDark;
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
  const getHomePage = () => {
    if (themeType == 'normal' || themeType == 'colorful') {
      return (
        <article
          id={'home'}
          className={classNames(
            'home',
            sdk.deviceData.power_switch != 1 && 'power-off',
          )}
        >
          <Ticker/>
          <div
            className={classNames(
              'devSetting', 'dev-setting-open'
            )}
          >
            <img src={settingImageSrc()} alt="" onClick={handleSetting}/>
          </div>
          <Position defaultValue={300}/>
          <Detail/>
        </article>
      );
    }
    return (
        <article
          id={'home'}
          className={classNames(
            'home',
            sdk.deviceData.power_switch != 1 && 'power-off',
          )}
        >
          <div
            className={classNames(
              'devSetting', 'dev-setting-open'
            )}
          >
            <img src={settingImageSrc()} alt="" onClick={handleSetting}/>
          </div>
          <Position/>
          <Detail/>
          <Ticker/>

        </article>
    );
  };
  return (
    getHomePage()
  );
}
