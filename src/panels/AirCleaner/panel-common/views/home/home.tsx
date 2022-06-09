import React from 'react';
import classNames from 'classnames';
import './home.less';
import { Detail } from './detail/detail';
import Ticker from './tiker/ticker';
import {getThemeType} from '@libs/theme';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

import SettingImage from '../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../icons/blue-white/dev-open.svg';
import SettingImageColorful from '../icons/colorful/dev-open.svg';

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
        return SettingImageBlueWhite;
      default:
        return SettingImage;
    }
  };
  const handleSetting = () => {
    sdk.goDeviceDetailPage({});
  };
  const handleAirQuality = (num: string) => {
    switch (num) {
      case '0':
        return '优';
      case '1':
        return '良';
      case '2':
        return '轻度污染';
      case '3':
        return '中度污染';
      case '4':
        return '严重污染';
      default:
        return '良';
    }
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
            text={
              sdk.deviceData.air_quality
                ? handleAirQuality(sdk.deviceData.air_quality)
                : '良'
            }
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
