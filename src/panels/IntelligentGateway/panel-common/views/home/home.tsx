import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { Detail } from './detail/detail';
import './home.less';

import HomeImage from '../icons/normal/home.svg';
import HomeImageBlueWhite from '../icons/blue-white/home.svg';
import SettingImage from '../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../icons/blue-white/dev-open.svg';
import SettingImageColorful from '../icons/colorful/dev-open.svg';

export function Home() {
  const themeType = getThemeType();
  const sleepImageSrc = () => {
    switch (themeType) {
      case 'blueWhite':
        return HomeImageBlueWhite;
      case 'dark':
        return HomeImageBlueWhite;
      default:
        return HomeImage;
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
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 0 && 'power-off',
      )}
    >
      {/* 头部图片*/}
      <section className={classNames('dashboard')}>
        <div
          className={classNames('devSetting', 'dev-setting-open')}
          onClick={handleSetting}
        >
          <img className="devSetting-img" src={settingImageSrc()} alt="" />
        </div>
        <div className={classNames('dashboard-detail')}>
          <img src={sleepImageSrc()} alt="" />
          <div className="equipment_num">在线设备：0</div>
        </div>
      </section>
      {/* 详情区域*/}
      <Detail />
    </article>
  );
}
