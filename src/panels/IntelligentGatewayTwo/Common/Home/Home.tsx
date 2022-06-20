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
  // const {
  //   history: { PATH, push },
  // } = props;
  const [gatewayList, setGatewayList] = useState([]);
  useEffect(() => {
    // 获取网关子设备
    const getDeviceDataGateway = async () => {
      const { h5PanelSdk } = window;
      const { subDeviceList } = await h5PanelSdk.getSubDeviceList();
      try {
        // const recordListInfo = await sdk.requestTokenApi(
        //   'AppGetFamilySubDeviceList',
        //   {
        //     Action: 'AppGetFamilySubDeviceList',
        //     // AccessToken: 'AccessToken',
        //     RequestId: sdk.requestId,
        //     GatewayProductId: sdk.gatewayProductId,
        //     GatewayDeviceName: sdk.GatewayDeviceName,
        //     ProductId: sdk.productId,
        //     DeviceName: sdk.deviceName,
        //     Offset: 0,
        //     Limit: 10,
        //   },
        // );

        // const recordListInfo = await sdk.requestTokenApi(
        //   'AppGetFamilySubDeviceList',
        //   {
        //     Action: 'AppGetFamilySubDeviceList',
        //     // AccessToken: 'AccessToken',
        //     RequestId: sdk.requestId,
        //     GatewayProductId: sdk.gatewayProductId,
        //     GatewayDeviceName: sdk.GatewayDeviceName,
        //     ProductId: sdk.productId,
        //     DeviceName: sdk.deviceName,
        //     Offset: 0,
        //     Limit: 10,
        //   },
        // );

        console.log('get info', subDeviceList);
        // 获取设备状态
        const deviceIds = subDeviceList.map(({ DeviceId }) => DeviceId);
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
        const data = subDeviceList.map(item => ({
          ...item,
          Online: devicesStatus.DeviceStatuses.filter(({ DeviceId }) => DeviceId === item.DeviceId)[0]?.Online,
        }));
        setGatewayList(data);
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataGateway();
  }, []);
  const onLineNum = gatewayList.filter(({ Online }) => !!Online).length;
  console.log('获取到的网关数量:', gatewayList);
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
              // .filter(({ BindStatus }) => BindStatus === 0)
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
              <div className="info">没有子设备</div>
            </div>
          )}
        </div>
      </div>
      <div className="fix-bottom-btn">
        {/* <Btn
          btnText="添加子设备"
          type="primary"
          onClick={() => push(PATH.ADD)}
        /> */}
        <Btn
          btnText="添加子设备"
          type="primary"
          onClick={() => sdk.goGatewayAddSubDevicePage(sdk.deviceId)}
        />
      </div>
    </div>
  );
}
