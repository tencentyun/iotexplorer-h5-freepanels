import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { Detail } from './detail/detail';
import './home.less';
import FanImage from '../icons/normal/fan.svg';
import FanImageDark from '../icons/dark/fan.svg';

export function Home() {
  const themeType = getThemeType();
  const fanImageSrc = () => {
    switch (themeType) {
      case 'dark':
        return FanImageDark;
      default:
        return FanImage;
    }
  };
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off',
      )}
    >
      {/* 仪表盘*/}
      <section className={classNames('dashboard')}>
        <img className={classNames('dashboard-img')} style={{ animation: sdk.deviceData.power_switch === 1 ? (`linear myrotate ${1.0 / parseInt(sdk.deviceData.windspeed)}s infinite`) : '' }} src={fanImageSrc()} alt="" />
      </section>
      {/* 详情区域*/}
      <Detail />
    </article>
  );
}
