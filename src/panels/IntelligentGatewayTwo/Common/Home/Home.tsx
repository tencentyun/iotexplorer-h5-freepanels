import React, { useEffect, useState } from 'react';
import { Position } from './Position';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Icon } from '@custom/Icon';
import { Btn } from '@custom/Btn';

// const defaultData = [
//   {
//     BindStatus: 0,
//     ProductId: '1',
//     DeviceName: '啊啊啊',
//     DeviceId: '1',
//     Online: 0,
//   },
//   {
//     BindStatus: 0,
//     ProductId: '1',
//     DeviceName: '啊啊啊',
//     DeviceId: '1',
//     Online: 1,
//   },
//   {
//     BindStatus: 0,
//     ProductId: '1',
//     DeviceName: '啊啊啊',
//     DeviceId: '1',
//     Online: 0,
//   },
//   {
//     BindStatus: 0,
//     ProductId: '1',
//     DeviceName: '啊啊啊',
//     DeviceId: '1',
//     Online: 1,
//   },
// ];

export function Home(props) {
  const {
    history: { PATH, push },
  } = props;
  const [gatewayList, setGatewayList] = useState([]);
  useEffect(() => {
    // 获取网关子设备
    const getDeviceDataGateway = async () => {
      try {
        // TODO 确认设备未绑定家庭的错误处理方式  同时确定AccessToken的来源
        // TODO 设备列表上没有BindStatus 如何获取
        const recordListInfo = await sdk.requestTokenApi(
          'AppGetGatewayBindDeviceList',
          {
            Action: 'AppGetGatewayBindDeviceList',
            // AccessToken: 'AccessToken',
            RequestId: sdk.requestId,
            GatewayProductId: sdk.gatewayProductId,
            GatewayDeviceName: sdk.GatewayDeviceName,
            ProductId: sdk.productId,
            DeviceName: sdk.deviceName,
            Offset: 0,
            Limit: 10,
          },
        );
        console.log('get info', recordListInfo);
        // 获取设备状态
        const deviceIds = recordListInfo.DeviceList.map(({ DeviceId }) => DeviceId);
        const devicesStatus = await sdk.requestTokenApi(
          'AppGetDeviceStatuses',
          {
            Action: 'AppGetDeviceStatuses',
            // AccessToken: 'AccessToken',
            RequestId: sdk.requestId,
            DeviceIds: deviceIds,
          },
        );
        // "Online": 0 //0 在线；1：离线
        const data = recordListInfo.DeviceList.map((item, index) => ({
          ...item,
          Online: devicesStatus.DeviceStatuses.filter(({ DeviceId }) => {
            DeviceId === item.DeviceId;
          })[0]?.Online,
        }));

        setGatewayList(data);
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataGateway();
  }, []);
  const onLineNum = gatewayList.filter(({ Online }) => !!Online).length;
  return (
    <div className="home">
      <Position {...props} onLine={onLineNum}></Position>
      <div className="dev-block">
        <div className="title">已添加的设备</div>
        <div className="online-num" style={{ display: 'none' }}>
          在线设备:{onLineNum}
        </div>
        <div className="dev-list">
          {gatewayList.length ? (
            gatewayList
              .filter(({ BindStatus }) => BindStatus === 0)
              .map((value: HashMap, index) => (
                <div key={index} className="dev-info">
                  <Icon name="switch" />
                  {value?.DeviceName || ''}
                  <div className="status">
                    <div
                      className={`dot dot-${
                        value.Online ? 'enable' : 'disable'
                      }`}
                    >
                      {value.Online ? '在线' : ' 离线'}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="dev-empty center">
              <div className="info">没有电子设备</div>
            </div>
          )}
        </div>
      </div>
      <div className="fix-bottom-btn">
        <Btn
          btnText="添加子设备"
          type="primary"
          onClick={() => push(PATH.ADD)}
        />
      </div>
    </div>
  );
}
