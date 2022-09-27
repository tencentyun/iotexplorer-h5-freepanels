import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './gateways.less';
import { onControlDevice } from '@hooks/useDeviceData';

import SwitchImage from '../../../../icons/normal/switch.svg';
import SwitchImageBlueWhite from '../../../../icons/blue-white/switch.svg';
import SwitchImageDark from '../../../../icons/dark/switch.svg';
import SwitchImageColorful from '../../../../icons/colorful/switch.svg';
import SwitchImageMorandi from '../../../../icons/morandi/switch.svg';

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
  const getDeviceDataGateway = async () => {
    const { h5PanelSdk } = window;
    const { subDeviceList } = await h5PanelSdk.getSubDeviceList();
    try {
      // 获取设备状态
      const deviceIds = subDeviceList.map(({ DeviceId }) => DeviceId);
      const devicesStatus = await sdk.requestTokenApi('AppGetDeviceStatuses', {
        Action: 'AppGetDeviceStatuses',
        // AccessToken: 'AccessToken',
        RequestId: sdk.requestId,
        DeviceIds: deviceIds,
      });
      // "Online": 0 //0 在线；1：离线
      const data = subDeviceList.map(item => ({
        ...item,
        Online: devicesStatus.DeviceStatuses.filter(({ DeviceId }) => DeviceId === item.DeviceId)[0]?.Online,
      }));
      setGatewayList(data);
    } catch (err) {
      console.error('get info fail', err);
    }
  };
  useEffect(() => {
    // 获取网关子设备
    sdk.on('pageShow', () => {
      getDeviceDataGateway();
      const onLineNum = gatewayList.filter(({ Online }) => !!Online).length;
      onControlDevice('deviceNum', onLineNum);
    });
    getDeviceDataGateway();
    return () => {
      sdk.off('pageShow');
    };
  }, []);

  return (
    <article className={classNames('gateways')}>
      {gatewayList.length > 0 ? (
        gatewayList.map((value: HashMap, index) => (
            <div
              key={index}
              className="gateway_info"
              onClick={() => sdk.goDevicePanelPage(value.DeviceId)}>
              {value.IconUrl ? (
                <img src={value.IconUrl} alt="" />
              ) : (
                <img src={switchImageSrc()} alt="" />
              )}
              <div className="description">
                <div className="name">{value?.AliasName || value?.DeviceName || ''}</div>
                <div
                  className={`state-${
                    value.Online ? 'enable' : 'disable'
                  }`}
                >
                  {value.Online ? '在线' : ' 离线'}
                </div>
              </div>
            </div>
        ))
      ) : (
        <div className="dev-empty">暂未添加电子设备</div>
      )}
       {/*<div className="gateway_info">
        <img src={switchImageSrc()} alt="" />
        <div className="description">
          <div className="name">六位场景开关</div>
          <div className="state-disable">离线</div>
        </div>
      </div>*/}
    </article>
  );
};

export default Environment;
