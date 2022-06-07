import React, { useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Cell } from '@components/base';
import { getThemeType } from '@libs/theme';
import { Detail } from './detail/detail';
import { useHistory } from 'react-router';
import './home.less';

import UpImage from '../icons/normal/up.svg';
import UpImageColorful from '../icons/colorful/up.svg';
import UpImageMorandi from '../icons/morandi/up.svg';

import DownImage from '../icons/normal/down.svg';
import DownImageColorful from '../icons/colorful/down.svg';
import DownImageMorandi from '../icons/morandi/down.svg';

import IconImage from '../icons/normal/icon.svg';
import IconImageDark from '../icons/dark/icon.svg';
import IconImageColorful from '../icons/colorful/icon.svg';
import IconImageMorandi from '../icons/morandi/icon.svg';
import SettingImage from '../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../icons/dark/dev-open.svg';
import SettingImageColorful from '../icons/colorful/dev-open.svg';
import SettingImageMorandi from '../icons/morandi/dev-open.svg';

const routerIcon =  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/blue-white/router.png';
export function Home() {
  const themeType = getThemeType();
  const iconImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return IconImage;
      case 'blueWhite':
        return IconImageDark;
      case 'dark':
        return IconImageDark;
      case 'colorful':
        return IconImageColorful;
      case 'morandi':
        return IconImageMorandi;
      default:
        return IconImageDark;
    }
  };
  const upImageSrc = () => {
    switch (themeType) {
      case 'colorful':
        return UpImageColorful;
      case 'morandi':
        return UpImageMorandi;
      default:
        return UpImage;
    }
  };
  const downImageSrc = () => {
    switch (themeType) {
      case 'colorful':
        return DownImageColorful;
      case 'morandi':
        return DownImageMorandi;
      default:
        return DownImage;
    }
  };
  const [routerSrc] = useState(routerIcon);
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url}></img>
  );
  const history = useHistory();
  const handleGoSetting = () =>
    // 更多跳转
    history.push('/setting')
  ;
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
      {/* 仪表盘*/}
      <section className={classNames('dashboard')}>
        <div className="dashboard-info">
          <img className="dashboard-img" src={routerSrc} alt="" />
          <div className="dashboard-value">
            <div className="dashboard-rate">
              <div className="rate-title">
                <img src={upImageSrc()} alt="" />
                上传速度
              </div>
              <div className="rate-val">
                {sdk.deviceData.upload_rate ? sdk.deviceData.upload_rate : '0'}
                <div className="unit">kb/s</div>
              </div>
            </div>
            <div>|</div>
            <div className="dashboard-rate">
              <div className="rate-title">
                <img src={downImageSrc()} alt="" />
                下载速度
              </div>
              <div className="rate-val">
                {sdk.deviceData.download_rate ? sdk.deviceData.download_rate : '0'}
                <div className="unit">kb/s</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="rate-setting">
        <Cell
          size="medium"
          title="WI-FI管理"
          isLink={false}
          prefixIcon={cellIcon(iconImageSrc())}
          value=""
          valueStyle="gray"
          onClick={handleGoSetting}
        />
      </div>
      {/* 详情区域*/}
      <Detail />
    </article>
  );
}
