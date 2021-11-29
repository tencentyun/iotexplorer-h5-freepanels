/*
 * @Description: 首页-头部
 */

import React from 'react';
import { SvgIcon } from '../../components/common';
import { Block } from '../../components/layout';
import { Battery } from '../../components/layout';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
// @ts-ignore
import CarImage from '../../assets/images/electric-car/car.svg';
// @ts-ignore
import SoundImage from '../../assets/images/electric-car/sound.png';
// @ts-ignore
import { CurrentSkinProps } from './SkinProps';
import './index.less';

export function HeaderBlock() {
  // 设备详情页
  const handleMore = () => {
    sdk.goDeviceDetailPage();
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
          name="icon-more"
          {...CurrentSkinProps.more}
        />
      </div>
      <div className="image-wrap">
        <img className="car-image" src={CarImage}></img>
        {sdk.deviceData.search === 'sound' ? (
          <img className="car-sound" src={SoundImage}></img>
        ) : null}
      </div>
    </Block>
  );
}
