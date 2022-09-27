import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './environment.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { Cell } from '@components/base';

const lampIcon =  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/normal/lamp.svg';
const emptyIcon =  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/dark/empty-dev.svg';

const Environment = () => {
  const themeType = getThemeType();
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
  const [lampSrc] = useState(lampIcon);
  const [emptySrc] = useState(emptyIcon);
  const handleMode = (type: string) => {
    onControlDevice('mode', type);
  };
  const cellIcon = (url: number | string | any[]) => (
    <img className="details-icon" src={url}/>
  );
  return (
    <article className={classNames('environment')}>
      <div className="dev-title">子设备</div>
      <div className={'environment-wrap'}>
        <div
          id={'hand'}
          className={classNames('temperature')}
          onClick={() => handleMode('3')}
        ></div>
        <span className="line"/>
        <div
          id={'automatic'}
          className={classNames('humidity')}
          onClick={() => handleMode('0')}
        ></div>
        {themeType === 'colorful' || themeType === 'blueWhite' ? (
            <div className="dev-list">
              {gatewayList.length > 0 ? (
                gatewayList.map((value: HashMap, index) => (
                    <Cell
                      key={index}
                      size="normal"
                      title={value?.AliasName || value?.DeviceName || ''}
                      prefixIcon={value.IconUrl ? cellIcon(value.IconUrl) : cellIcon(lampSrc)}
                      value={value.DeviceId}
                      valueStyle="gray"
                      onClick={() => sdk.goDevicePanelPage(value.DeviceId)}
                    />
                ))
              ) : (
                <div className="dev-list">
                  <div className="dev-empty">
                    <img src={emptySrc} alt=""/>
                    <div className="title">暂未绑定电子设备</div>
                    <div className="remark">请在添加子设备后进行操作</div>
                  </div>
                </div>
              )}
              {/* <Cell
                size="normal"
                title="智能电灯"
                prefixIcon={cellIcon(lampSrc)}
                value=""
                valueStyle="gray"
              />*/}
            </div>
        ) : (
          <div className="dev-list">
            {gatewayList.length > 0 ? (
              <div>
                {gatewayList.map((value: HashMap, index) => (
                  <div
                    className="dev-info"
                    key={index}
                    onClick={() => sdk.goDevicePanelPage(value.DeviceId)}
                  >
                    <img src={value.IconUrl} alt=""/>
                    {value?.AliasName || value?.DeviceName || ''}
                  </div>
                ))}
              </div>
            ) : (
              <div className="dev-list">
                <div className="dev-empty">
                  <img src={emptySrc} alt=""/>
                  <div className="title">暂未绑定电子设备</div>
                  <div className="remark">请在添加子设备后进行操作</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default Environment;
