import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Dialog } from 'antd-mobile';
import './getGateway.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { onControlDevice } from '@hooks/useDeviceData';
/**
 * 页面暂不使用
 */
const lampIcon =  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/normal/lamp.svg';
export function GetGateway() {
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
    });
    getDeviceDataGateway();
    return () => {
      sdk.off('pageShow');
    };
  }, []);
  const onLineNum = gatewayList.filter(({ Online }) => !!Online).length;
  onControlDevice('deviceNum', onLineNum);
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
            <div className="dev-empty">
              <div className="title">没有电子设备</div>
            </div>
        )}
      </div>
    </article>
  );
}
