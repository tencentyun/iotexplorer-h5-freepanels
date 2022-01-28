import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { Power } from './power/power';
import './home.less';

import PlugImage from '../icons/normal/plug.svg';
import PlugImageDefalut from '../icons/normal/plug-close.svg';
import PlugImageDark from '../icons/dark/plug.svg';
import PlugImageMorandi from '../icons/morandi/plug.svg';

export function Home() {
  const themeType = getThemeType();
  const plugImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return PlugImage;
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1 ? PlugImage : PlugImageDefalut;
      case 'dark':
        return sdk.deviceData.power_switch === 1
          ? PlugImageDark
          : PlugImageDefalut;
      case 'colorful':
        return PlugImageDark;
      case 'morandi':
        return sdk.deviceData.power_switch === 1
          ? PlugImageMorandi
          : PlugImageDefalut;
      default:
        return PlugImage;
    }
  };
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 0 && 'power-off',
        sdk.deviceData.power_switch === 1 ? '' : 'home-close'
      )}
    >
      {/*仪表盘*/}
      <section className={classNames('dashboard')}>
        <div className="ticker">
          <div
            id={'title'}
            className={classNames(
              'title',
              sdk.deviceData.power_switch === 1 ? '' : 'btn-off'
            )}
          >
            {sdk.deviceData.power_switch === 1 ? '插座已开启' : '插座已关闭'}
          </div>
          <img className="bg-img" src={plugImageSrc()} alt="" />
          <div
            id="bg"
            className={classNames(
              'bg',
              sdk.deviceData.power_switch === 1 ? '' : 'bg-off'
            )}
          />
        </div>
      </section>
      <Power />
    </article>
  );
}
