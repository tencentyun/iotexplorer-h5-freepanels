import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './environment.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { Cell } from '@components/base';

import addIcon from '../../../icons/normal/add.svg';
import {useHistory} from "react-router";

const lampIcon =  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/normal/lamp.svg';
const emptyIcon =  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/dark/empty-dev.svg';

const Environment = () => {
  const themeType = getThemeType();
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
  const [lampSrc] = useState(lampIcon);
  const [emptySrc] = useState(emptyIcon);
  const handleMode = (type: string) => {
    onControlDevice('mode', type);
  };
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url}></img>
  );
  const history = useHistory();
  const handleGetGateway = () => history.push('/getGateway');
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
                gatewayList.map((value, index) => (
                  value.BindStatus == 1 ? (
                        <Cell
                          size="normal"
                          title={value.DeviceName}
                          prefixIcon={cellIcon(lampSrc)}
                          value={value.DeviceId}
                          valueStyle="gray"
                        />
                  ) : (
                    ''
                  )
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
            {themeType === 'morandi' ? (
              <div id={'add-dev'} className="dev-info" onClick={handleGetGateway}>
                <img src={addIcon} alt=""/>
                添加电子设备
              </div>
            ) : (
              ''
            )}
            {gatewayList.length > 0 ? (
              <div>
                {gatewayList.map((value, index) => (
                  <div className="dev-info" id={value.DeviceId}>
                    <img src={lampSrc} alt=""/>
                    {value.DeviceName}
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
