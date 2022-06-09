import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { Detail } from './detail/detail';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './home.less';
import LockImageClose from '../icons/normal/lock.svg';
import LockImage from '../icons/normal/lock-close.svg';
import LockImageBlueWhiteClose from '../icons/blue-white/lock.svg';
import LockImageBlueWhite from '../icons/blue-white/lock-close.svg';
import LockImageColorfulClose from '../icons/colorful/lock.svg';
import LockImageColorful from '../icons/colorful/lock-close.svg';
import MoreImage from '../icons/normal/more.svg';
import MoreImageClose from '../icons/normal/more-close.svg';
import MoreImageBlueWhite from '../icons/blue-white/more.svg';
import MoreImageColorful from '../icons/colorful/more.svg';
import MoreImageColorfulClose from '../icons/colorful/more-close.svg';
import MoreImageMorandi from '../icons/morandi/more.svg';
const disinfectionImage =  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/disinfection-cabinet/normal/disinfection-cabinet.svg';

export function Home() {
  const themeType = getThemeType();
  const lockImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.child_lock === 1 ? LockImage : LockImageClose;
      case 'blueWhite':
        return sdk.deviceData.child_lock === 1 ? LockImageBlueWhite : LockImageBlueWhiteClose;
      case 'dark':
        return sdk.deviceData.child_lock === 1 ? LockImageBlueWhite : LockImageBlueWhiteClose;
      case 'colorful':
        return sdk.deviceData.child_lock === 1 ? LockImageColorful : LockImageColorfulClose;
      case 'morandi':
        return sdk.deviceData.child_lock === 1 ? LockImageBlueWhite : LockImageBlueWhiteClose;
      default:
        return sdk.deviceData.child_lock === 1 ? LockImage : LockImageClose;
    }
  };

  const moreImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return MoreImage;
      case 'colorful':
        return MoreImageColorful;
      case 'morandi':
        return MoreImageMorandi;
      default:
        return MoreImageBlueWhite;
    }
  };
  const handleLock = () => {
    apiControlDeviceData({
      child_lock: sdk.deviceData.child_lock === 1 ? 0 : 1,
    });
  };
  const handleSetting = () => {
    sdk.goDeviceDetailPage({});
  };
  return (
    <article>
      <div
        className={classNames('devSetting', 'dev-setting-open')}
        onClick={handleSetting}
      />
      <div
         className={classNames(
           'home',
           sdk.deviceData.power_switch === 1 ? '' : 'power-off',
         )}
       >
         {/* 仪表盘*/}
         <section className={classNames('dashboard')}>
           <div className="dashboard-btn">
             <div className="lock">
               <img id={'lock'} src={lockImageSrc()} alt="" onClick={handleLock} />
             </div>
             <div className="title">
               童锁{sdk.deviceData.child_lock === 1 ? '开' : '关'}
             </div>
             <img id={'more'} src={moreImageSrc()} alt="" onClick={handleSetting} />
           </div>
           <div className="disinfection-img">
             <img src={disinfectionImage} alt="" />
             <div className="up-state">
               上层门{sdk.deviceData.up_door_state === 1 ? '开' : '关'}
             </div>
             <div className="down-state">
               下层门{sdk.deviceData.down_door_state === 1 ? '开' : '关'}
             </div>
           </div>
         </section>
         {/* 详情区域*/}
         <Detail />
       </div>
    </article>
  );
}
