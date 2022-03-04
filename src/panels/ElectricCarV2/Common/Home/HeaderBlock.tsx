/*
 * @Description: 首页-头部
 */
import React from 'react';
import { Icon } from '@custom/Icon';
import { Battery } from '@custom/Battery';
import CarImage from '../images/car.svg';

export interface HeaderBlockProps {
  deviceData?: any;
}

export function HeaderBlock({
  deviceData = {}
}: HeaderBlockProps) {

  // 设备详情页
  const handleMore = () => {
    // sdk.showDeviceDetail();
  };

  return (
    <section className="header-block">
      <header className="header-wrap">
        <div className="left">
          {/* 电源模块 */}
          <Battery
            color="verdant"
            isShowPercent={false}
            isShowTip={false}
          />
          <p className="label">剩余电量{deviceData.battery_value || 0}%</p>
        </div>
      </header>
      <div className="more-wrap" onClick={handleMore}>
        <Icon
          name="more"
        />
      </div>
      <div className="image-wrap">
        <img className="car-image" src={CarImage}></img>
        {deviceData.search === 'sound' ? (
          <Icon className="car-sound" name='sound'></Icon>
        ) : null}
      </div>
    </section>
  );
}
