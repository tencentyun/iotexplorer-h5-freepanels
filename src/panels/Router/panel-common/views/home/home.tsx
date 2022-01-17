import React, {useState} from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Cell } from '@components/base';
import { getThemeType } from '@libs/theme';
import { Detail } from './detail/detail';
import {useHistory} from "react-router";
import './home.less';

import UpImage from "../icons/normal/up.png";
import UpImageColorful from "../icons/colorful/up.png";
import UpImageMorandi from "../icons/morandi/up.png";

import DownImage from "../icons/normal/down.png";
import DownImageColorful from "../icons/colorful/down.png";
import DownImageMorandi from "../icons/morandi/down.png";

import IconImage from "../icons/normal/icon.png";
import IconImageDark from "../icons/dark/icon.png";
import IconImageColorful from "../icons/colorful/icon.png";
import IconImageMorandi from "../icons/morandi/icon.png";

const routerIcon =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/blue-white/router.png';
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
  const handleSetting = () => {
    // 更多跳转
    return history.push('/setting');
  };
  return (
    <article className={classNames('home')}>
      {/*仪表盘*/}
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
          onClick={handleSetting}
        />
      </div>
      {/*详情区域*/}
      <Detail />
    </article>
  );
}
