import React, { useState } from 'react';
import classNames from 'classnames';
import './environment.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { Cell } from '@components/base';

import addIcon from '../../../icons/normal/add.svg';
const lampIcon =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/normal/lamp.svg';
const emptyIcon =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/router/dark/empty-dev.svg';

const Environment = () => {
  const themeType = getThemeType();
  // 获取网关子设备
  const getDeviceDataHistory = async () => {
    try {
      const time = sdk.deviceData.month ? sdk.deviceData.year : new Date();
      const currentTime = sdk.deviceData.year ? sdk.deviceData.month : new Date().getTime();
      const lastYear = new Date().getFullYear() - 1;
      const lastYearTime = time.setFullYear(lastYear);

      const recordListInfo = await sdk.requestTokenApi(
        'AppGetGatewayBindDeviceList',
        {
          AccessToken: 'systolic_pressure',
          RequestId: 'systolic_pressure',
          Action: 'systolic_pressure',
          GatewayProductId: currentTime,
          GatewayDeviceName: lastYearTime,
          ProductId: 10,
          DeviceName: 10,
          Offset: 10,
          Limit: 10
        }
      );
      console.log('get info', recordListInfo);
    } catch (err) {
      console.error('get info fail', err);
    }
  };
  const [lampSrc] = useState(lampIcon);
  const [emptySrc] = useState(emptyIcon);
  const handleMode = (type: string) => {
    onControlDevice('mode', type);
  };
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url}></img>
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
        <span className="line" />
        <div
          id={'automatic'}
          className={classNames('humidity')}
          onClick={() => handleMode('0')}
        ></div>
        {themeType === 'colorful' || themeType === 'blueWhite' ? (
          <div className="dev-list">
            {/*<div className="dev-empty">
            <img src={emptySrc} alt="" />
            <div className="title">暂未绑定电子设备</div>s
            <div className="remark">请在添加子设备后进行操作</div>
            </div>*/}
            <Cell
              size="normal"
              title="智能电灯"
              prefixIcon={cellIcon(lampSrc)}
              value=""
              valueStyle="gray"
            />
            <Cell
              size="normal"
              title="智能电灯"
              prefixIcon={cellIcon(lampSrc)}
              value=""
              valueStyle="gray"
            />
            <Cell
              size="normal"
              title="智能电灯"
              prefixIcon={cellIcon(lampSrc)}
              value=""
              valueStyle="gray"
            />
            <Cell
              size="normal"
              title="智能电灯"
              prefixIcon={cellIcon(lampSrc)}
              value=""
              valueStyle="gray"
            />
          </div>
        ) : (
          <div className="dev-list">
            {/*<div className="dev-empty">
            <img src={emptySrc} alt="" />
            <div className="title">暂未绑定电子设备</div>
            <div className="remark">请在添加子设备后进行操作</div>
            </div>*/}
            {themeType === 'morandi' ? (
              <div id={'add-dev'} className="dev-info">
                <img src={addIcon} alt="" />
                添加电子设备
              </div>
            ) : (
              ''
            )}
            <div className="dev-info">
              <img src={lampSrc} alt="" />
              智能电灯
            </div>
            <div className="dev-info">
              <img src={lampSrc} alt="" />
              智能电灯
            </div>
            <div className="dev-info">
              <img src={lampSrc} alt="" />
              智能电灯
            </div>
            <div className="dev-info">
              <img src={lampSrc} alt="" />
              智能电灯
            </div>
            <div className="dev-info">
              <img src={lampSrc} alt="" />
              智能电灯
            </div>
            <div className="dev-info">
              <img src={lampSrc} alt="" />
              智能电灯
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Environment;
