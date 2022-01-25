/*
 * @Description: 首页-头部
 */
import React from 'react';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import { Battery } from '@components/business';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import CarImage from '../../images/car.svg';
import { SkinProps } from '../skinProps';
import './index.less';

export function HeaderBlock() {

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
            {...SkinProps.battery}
          />
          <p className="label">剩余电量{sdk.deviceData.battery_value || 0}%</p>
        </div>
      </header>
      <div className="more" onClick={handleMore}>
        <SvgIcon
          className="icon-more"
          name="icon-more-cicle"
          {...SkinProps.more}
        />
      </div>
      <div className="image-wrap">
        <img className="car-image" src={CarImage}></img>
        {sdk.deviceData.search === 'sound' ? (
          <img className="car-sound" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/ElectricCarV2/sound.png"></img>
        ) : null}
      </div>
    </Block>
  );
}
