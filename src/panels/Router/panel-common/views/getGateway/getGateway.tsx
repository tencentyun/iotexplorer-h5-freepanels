import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Dialog } from 'antd-mobile';
import './getGateway.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

/**
 * 页面暂不使用
 */
const lampIcon =  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/normal/lamp.svg';
export function GetGateway() {
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
          Limit: 10,
        });
        console.log('get info', recordListInfo);
        setGatewayList(recordListInfo.DeviceList);
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataGateway();
  }, []);
  // 添加网关子设备
  const addDeviceDataGateway = async (productId: string, deviceName:string) => {
    try {
      const recordListInfo = await sdk.requestTokenApi('AppBindSubDeviceInFamily', {
        Action: 'AppBindSubDeviceInFamily',
        AccessToken: 'AccessToken',
        RequestId: sdk.requestId,
        GatewayProductId: sdk.GatewayProductId,
        GatewayDeviceName: sdk.GatewayDeviceName,
        ProductId: productId,
        DeviceName: deviceName,
      });
      console.log('get info', recordListInfo);
      sdk.tips.show('添加成功');
    } catch (err) {
      console.error('get info fail', err);
    }
  };
  const [lampSrc] = useState(lampIcon);
  const handleMode = async (productId: string, deviceName:string) => {
    const result = await Dialog.confirm({
      content: '确定添加设备？',
    });
    if (result) {
      addDeviceDataGateway(productId, deviceName);
    }
  };
  return (
    <article className={classNames('getGatewayList')}>
      <div className="dev-list">
        {/* <div className="dev-info">
          <img src={lampSrc} alt="" onClick={handleMode}/>
          智能电灯
        </div>*/}
        {gatewayList.length > 0 ? (
          gatewayList.map((value, index) => (
            value.BindStatus == 0 ? (
                  <div className="dev-info" id={value.DeviceId} onClick={handleMode(value.ProductId, value.DeviceName)}>
                    <img src={lampSrc} alt=""/>
                    {value.DeviceName}
                  </div>
            ) : (
              ''
            )
          ))
        ) : (
          <div className="dev-list">
            <div className="dev-empty">
              <div className="title">没有电子设备</div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
