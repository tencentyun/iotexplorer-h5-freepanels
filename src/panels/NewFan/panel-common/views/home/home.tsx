import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './home.less';
import { Detail } from './detail/detail';
import Ticker from './tiker/ticker';
import {getThemeType} from '@libs/theme';

import SettingImage from '../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../icons/blue-white/dev-open.svg';
import SettingImageColorful from '../icons/colorful/dev-open.svg';
import SettingImageMorandi from '../icons/morandi/dev-open.svg';

export function Home() {
  const themeType = getThemeType();
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
    <article>
      <div
        className={classNames('devSetting', 'dev-setting-open')}
      >
        <img className={classNames('dev-img')} src={settingImageSrc()} alt="" onClick={handleSetting}/>
      </div>
      <div
        className={classNames(
          'home',
          sdk.deviceData.power_switch === 1 ? '' : 'power-off',
        )}
      >
        {/* 仪表盘*/}
        <section className={classNames('dashboard')}>
          <Ticker
            title={'PM2.5'}
            text="室内空气 优"
            text1="室外空气 优(32)"
            value={sdk.deviceData.pm2_5 ? sdk.deviceData.pm2_5 : '300'}
            unit={''}
            badNum={'900'}
            status={sdk.deviceData.power_switch === 1 ? '1' : '0'}
          />
        </section>
        {/* 详情区域*/}
        <Detail />
      </div>
    </article>
  );
}
