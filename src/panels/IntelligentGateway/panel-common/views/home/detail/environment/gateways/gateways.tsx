import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './gateways.less';

import SwitchImage from '../../../../icons/normal/switch.svg';
import SwitchImageBlueWhite from '../../../../icons/blue-white/switch.svg';
import SwitchImageDark from '../../../../icons/dark/switch.svg';
import SwitchImageColorful from '../../../../icons/colorful/switch.svg';
import SwitchImageMorandi from '../../../../icons/morandi/switch.svg';
import {Cell} from "@components/base";

const Environment = () => {
  const themeType = getThemeType();
  const switchImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SwitchImage;
      case 'blueWhite':
        return SwitchImageBlueWhite;
      case 'dark':
        return SwitchImageDark;
      case 'colorful':
        return SwitchImageColorful;
      case 'morandi':
        return SwitchImageMorandi;
      default:
        return SwitchImage;
    }
  };
  const [gatewayList, setGatewayList] = useState([]);
  useEffect(() => {
    // 获取网关子设备
    const getDeviceDataGateway = async () => {
      try {
        const recordListInfo = await sdk.requestTokenApi('AppGetGatewayBindDeviceList', {
          Action: 'AppGetGatewayBindDeviceList',
          AccessToken: 'AccessToken',
          RequestId: sdk.requestId,
          GatewayProductId: sdk.gatewayProductId,
          GatewayDeviceName: sdk.GatewayDeviceName,
          ProductId: sdk.productId,
          DeviceName: sdk.deviceName,
          Offset: 0,
          Limit: 10
        });
        console.log('get info', recordListInfo);
        setGatewayList(recordListInfo.DeviceList);
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataGateway();
  }, []);
  return (
    <article className={classNames('gateways')}>
      {gatewayList.length > 0 ? (
        gatewayList.map((value, index) => (
          value.BindStatus == 1 ? (
            <div className="gateway_info">
              <img src={switchImageSrc()} alt="" />
              <div className="description">
                <div className="name">{value.DeviceName}</div>
                <div className="state">已绑定</div>
              </div>
            </div>
          ) : (
            ''
          )
        ))
      ) : (
        <div className="dev-empty">暂未添加电子设备</div>
      )}
      {/*<div className="gateway_info">
        <img src={switchImageSrc()} alt="" />
        <div className="description">
          <div className="name">六位场景开关</div>
          <div className="state">离线</div>
        </div>
      </div>*/}
    </article>
  );
};

export default Environment;
