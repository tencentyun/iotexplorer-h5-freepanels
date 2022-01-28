/*
 * @Description: 首页-头部
 */
import React from 'react';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import { Battery } from '@components/business';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import CarImage from '../../images/car.svg';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';
import './index.less';

export function HeaderBlock() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];

  const soundImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/sound.svg';
      case 'blueWhite':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/sound-blueWhite.svg';
      case 'dark':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/sound-dark.svg';
      case 'colorful':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/sound-colorful.svg';
      case 'morandi':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/sound-morandi.svg';
      default:
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/sound.svg';
    }
  };

  // 设备详情页
  const handleMore = () => {
    sdk.showDeviceDetail();
  };

  return (
    <Block className="header-block">
      <header className="header-wrap">
        <div className="left">
          {/* 电源模块 */}
          <Battery
            isShowPercent={false}
            isShowTip={false}
            value={sdk.deviceData.battery_value || 0}
            {...CurrentSkinProps.battery}
          />
          <p className="label">剩余电量{sdk.deviceData.battery_value || 0}%</p>
        </div>
        {/* <div className="right">
          <SvgIcon className="icon-mileage" name="icon-mileage" {...CurrentSkinProps.mileage} />
          <p className="label">可续航里程65KM</p>
        </div> */}
      </header>
      <div className="more" onClick={handleMore}>
        <SvgIcon
          className="icon-more"
          name="icon-more-cicle"
          {...CurrentSkinProps.more}
        />
      </div>
      <div className="image-wrap">
        <img className="car-image" src={CarImage}></img>
        {sdk.deviceData.search === 'sound' ? (
          <img className="car-sound" src={soundImageSrc()}></img>
        ) : null}
      </div>
    </Block>
  );
}
