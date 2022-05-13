import React, { useEffect, useState } from 'react';

import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Icon } from '@custom/Icon';

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

export function Add({ history: { PATH, push }, tips }) {
  const [gatewayList, setGatewayList] = useState([]);
  useEffect(() => {
    // 获取网关子设备
    const getDeviceDataGateway = async () => {
      try {
        const recordListInfo = await sdk.requestTokenApi(
          'AppGetGatewayBindDeviceList',
          {
            Action: 'AppGetGatewayBindDeviceList',
            AccessToken: 'AccessToken',
            RequestId: sdk.requestId,
            GatewayProductId: sdk.gatewayProductId,
            GatewayDeviceName: sdk.GatewayDeviceName,
            ProductId: sdk.productId,
            DeviceName: sdk.deviceName,
            Offset: 0,
            Limit: 10,
          },
        );
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

  // 添加网关子设备
  const addDeviceDataGateway = async ({ ProductId, DeviceName }: HashMap) => {
    try {
      await sdk.requestTokenApi('AppBindSubDeviceInFamily', {
        Action: 'AppBindSubDeviceInFamily',
        AccessToken: 'AccessToken',
        RequestId: sdk.requestId,
        GatewayProductId: sdk.GatewayProductId,
        GatewayDeviceName: sdk.GatewayDeviceName,
        ProductId,
        DeviceName,
      });
      tips.show('添加成功');
      push(PATH.HOME);
    } catch (err) {
      console.error('get info fail', err);
      tips.show('添加失败');
      // 临时也跳转到主页
      push(PATH.HOME);
    }
  };

  return (
    <div className="add-detail">
      <div className="dev-block">
        <div className="dev-list">
          {gatewayList.length ? (
            gatewayList
              .filter(({ BindStatus }) => BindStatus === 0)
              .map((value: HashMap, index) => (
                <div
                  key={index}
                  className="dev-info"
                  onClick={() => addDeviceDataGateway(value)}
                >
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
    </div>
  );
}
