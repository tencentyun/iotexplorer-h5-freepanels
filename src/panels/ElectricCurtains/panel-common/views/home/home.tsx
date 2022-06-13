import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import HomeMorandi from './home-morandi/home_morandi';
import HomeNormal from './home-normal/home_normal';
import HomeDark from './home-dark/home_dark';
import HomeColorful from './home-colorful/home_colorful';
import HomeBlueWhite from './home-bluewhite/home_bluewhite';
import './home.less';
import SettingImage from '../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../icons/blue-white/dev-open.svg';
import SettingImageColorful from '../icons/colorful/dev-open.svg';
import SettingImageMorandi from '../icons/morandi/dev-open.svg';

export function Home() {
  const themeType = getThemeType();
  const getHomePage = () => {
    if (themeType == 'blueWhite') {
      return (<HomeBlueWhite/>);
    } if (themeType == 'colorful') {
      return (<HomeColorful/>);
    } if (themeType == 'dark') {
      return (<HomeDark/>);
    } if (themeType == 'morandi') {
      return (<HomeMorandi/>);
    } if (themeType == 'normal') {
      return (<HomeNormal/>);
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
  return (
    <article className={classNames('home')}>
      <div
        className={classNames('devSetting', 'dev-setting-open')}
      >
        <img className={classNames('dev-img')} src={settingImageSrc()} alt="" onClick={handleSetting}/>
      </div>
      {getHomePage()}
    </article>
  );
}

export default Home;
