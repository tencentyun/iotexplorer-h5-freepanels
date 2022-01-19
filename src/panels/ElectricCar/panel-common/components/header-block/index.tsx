/*
 * @Description: 首页-头部
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SvgIcon } from '@/components/common';
import { Block } from '@/components/layout';
import { Battery } from '@/components/business';
import { getThemeType } from '@/business';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
// @ts-ignore
import CarImage from '@/assets/images/electric-car/car.svg';
// @ts-ignore
import SoundImage from '@/assets/images/electric-car/sound.png';
// @ts-ignore
import SoundImageBlueWhite from '@/assets/images/electric-car/sound-blueWhite.png';
// @ts-ignore
import SoundImageDark from '@/assets/images/electric-car/sound-dark.png';
// @ts-ignore
import SoundImageColorful from '@/assets/images/electric-car/sound-colorful.png';
// @ts-ignore
import SoundImageMorandi from '@/assets/images/electric-car/sound-morandi.png';
// @ts-ignore
import { CurrentSkinProps } from '../skinProps';
import './index.less';

const themeType = getThemeType();

export function HeaderBlock() {
  const history = useHistory();

  const soundImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SoundImage;
      case 'blueWhite':
        return SoundImageBlueWhite;
      case 'dark':
        return SoundImageDark;
      case 'colorful':
        return SoundImageColorful;
      case 'morandi':
        return SoundImageMorandi;
      default:
        return SoundImage;
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
