import React from 'react';
import './dashboard.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SvgIcon } from '@components/common/icon';

import SettingImage from '../../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../../icons/normal/dev-open.svg';
import SettingImageDark from '../../icons/normal/dev-open.svg';
import SettingImageColorful from '../../icons/normal/dev-open.svg';
import SettingImageMorandi from '../../icons/normal/dev-open.svg';
const dashboard = () => {
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
  return (
    <article id={'dashboard'} className={classNames('dashboard')}>
      <div
        className={classNames(
          'devSetting',
          sdk.deviceData.power_switch === 1 ? 'dev-setting-open' : 'dev-setting-close',
        )}
      >
        <img src={settingImageSrc()} alt="" onClick={handleSetting}/>
      </div>
      <div className={classNames('receptacle_round')}>
        <span className={classNames('receptacle_size1')}></span>

        <div className={classNames('receptacle_img')}>
          <SvgIcon name={sdk.deviceData.power_switch === 1 && `icon-receptacle-${themeType}2` || `icon-receptacle-${themeType}`}/>
        </div>
        <span className={classNames('receptacle_size')}>{sdk.deviceData.power_switch === 1 ? '插座已开启' : '插座已关闭'}</span>
      </div>

    </article>
  );
};

export default dashboard;
