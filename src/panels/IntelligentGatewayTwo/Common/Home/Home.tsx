import React, { useEffect, useState } from 'react';
import { Position } from './Position';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Icon } from '@custom/Icon';
import { Btn } from '@custom/Btn';

export function Home(props) {
  // 其他页面返回也刷新
  const [gatewayList, setGatewayList] = useState([]);
  useEffect(() => {
    // 获取网关子设备
    const getDeviceDataGateway = async () => {
      const { h5PanelSdk } = window;
      const { subDeviceList } = await h5PanelSdk.getSubDeviceList();
      try {
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
                <div
                  key={index}
                  className="dev-info"
                  onClick={() => sdk.goDevicePanelPage(value.DeviceId)}
                >
                  {value.IconUrl ? (
                    <div
                      className="switch-icon"
                      style={{ backgroundImage: `url(${value.IconUrl})` }}
                    ></div>
                  ) : (
                    <Icon name="switch" />
                  )}
                  {value?.AliasName || value?.DeviceName || ''}
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
