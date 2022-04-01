import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Cell } from '@components/base';
import { getThemeType } from '@libs/theme';
import { useHistory } from 'react-router';
import './mountings.less';

import LightSensorImage from '../icons/normal/light-sensor.svg';
import LightSensorImageBlueWhite from '../icons/blue-white/light-sensor.svg';
import LightSensorImageDark from '../icons/dark/light-sensor.svg';
import LightSensorImageColorful from '../icons/colorful/light-sensor.svg';
import LightSensorImageMorandi from '../icons/morandi/light-sensor.svg';
import ExigencyBtnImage from '../icons/normal/exigency-btn.svg';
import ExigencyBtnImageBlueWhite from '../icons/blue-white/exigency-btn.svg';
import ExigencyBtnImageDark from '../icons/dark/exigency-btn.svg';
import ExigencyBtnImageColorful from '../icons/colorful/exigency-btn.svg';
import ExigencyBtnImageMorandi from '../icons/morandi/exigency-btn.svg';
import SoundLightImage from '../icons/normal/sound-light-alarm.svg';
import SoundLightImageBlueWhite from '../icons/blue-white/sound-light-alarm.svg';
import SoundLightImageDark from '../icons/dark/sound-light-alarm.svg';
import SoundLightImageColorful from '../icons/colorful/sound-light-alarm.svg';
import SoundLightImageMorandi from '../icons/morandi/sound-light-alarm.svg';
import CoAlarmImage from '../icons/normal/co-alarm.svg';
import CoAlarmImageBlueWhite from '../icons/blue-white/co-alarm.svg';
import CoAlarmImageDark from '../icons/dark/co-alarm.svg';
import CoAlarmImageColorful from '../icons/colorful/co-alarm.svg';
import CoAlarmImageMorandi from '../icons/morandi/co-alarm.svg';
import MethaneAlarmImage from '../icons/normal/methane-alarm.svg';
import MethaneAlarmImageBlueWhite from '../icons/blue-white/methane-alarm.svg';
import MethaneAlarmImageDark from '../icons/dark/methane-alarm.svg';
import MethaneAlarmImageColorful from '../icons/colorful/methane-alarm.svg';
import MethaneAlarmImageMorandi from '../icons/morandi/methane-alarm.svg';
import GasAlarmImage from '../icons/normal/gas-alarm.svg';
import GasAlarmImageBlueWhite from '../icons/blue-white/gas-alarm.svg';
import GasAlarmImageDark from '../icons/dark/gas-alarm.svg';
import GasAlarmImageColorful from '../icons/colorful/gas-alarm.svg';
import GasAlarmImageMorandi from '../icons/morandi/gas-alarm.svg';

export function Mountings() {
  const themeType = getThemeType();
  const lightSensorImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return LightSensorImage;
      case 'blueWhite':
        return LightSensorImageBlueWhite;
      case 'dark':
        return LightSensorImageDark;
      case 'colorful':
        return LightSensorImageColorful;
      case 'morandi':
        return LightSensorImageMorandi;
      default:
        return LightSensorImage;
    }
  };
  const exigencyBtnImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return ExigencyBtnImage;
      case 'blueWhite':
        return ExigencyBtnImageBlueWhite;
      case 'dark':
        return ExigencyBtnImageDark;
      case 'colorful':
        return ExigencyBtnImageColorful;
      case 'morandi':
        return ExigencyBtnImageMorandi;
      default:
        return ExigencyBtnImage;
    }
  };
  const soundLightAlarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SoundLightImage;
      case 'blueWhite':
        return SoundLightImageBlueWhite;
      case 'dark':
        return SoundLightImageDark;
      case 'colorful':
        return SoundLightImageColorful;
      case 'morandi':
        return SoundLightImageMorandi;
      default:
        return SoundLightImage;
    }
  };
  const coAlarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return CoAlarmImage;
      case 'blueWhite':
        return CoAlarmImageBlueWhite;
      case 'dark':
        return CoAlarmImageDark;
      case 'colorful':
        return CoAlarmImageColorful;
      case 'morandi':
        return CoAlarmImageMorandi;
      default:
        return CoAlarmImage;
    }
  };
  const methaneAlarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return MethaneAlarmImage;
      case 'blueWhite':
        return MethaneAlarmImageBlueWhite;
      case 'dark':
        return MethaneAlarmImageDark;
      case 'colorful':
        return MethaneAlarmImageColorful;
      case 'morandi':
        return MethaneAlarmImageMorandi;
      default:
        return MethaneAlarmImage;
    }
  };
  const gasAlarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return GasAlarmImage;
      case 'blueWhite':
        return GasAlarmImageBlueWhite;
      case 'dark':
        return GasAlarmImageDark;
      case 'colorful':
        return GasAlarmImageColorful;
      case 'morandi':
        return GasAlarmImageMorandi;
      default:
        return GasAlarmImage;
    }
  };
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
  const history = useHistory();
  const handleAdd = () => history.push('/addDevExplanatory');
  const handleGetGateway = () => history.push('/getGateway');
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url}></img>
  );
  return (
    <article className={classNames('dev-list')}>
      {gatewayList.length > 0 ? (
      <ul>
        {gatewayList.map((value, index) => (
          value.BindStatus == 1 ? (
            <li className="list-item" id={'light-sensor'}>
              <Cell
                size="medium"
                title={value.DeviceName}
                prefixIcon={cellIcon(value.IconUrl)}
                value={value.DeviceId}
                valueStyle="gray"
                onClick={() => {}}
              />
            </li>
          ) : (
            ''
          )
        ))}
        {/* <li className="list-item" id={'exigency-btn'}>
          <Cell
            size="medium"
            title="紧急按钮"
            prefixIcon={cellIcon(exigencyBtnImageSrc())}
            value=""
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'sound-light-alarm'}>
          <Cell
            size="medium"
            title="声光报警器"
            value=""
            prefixIcon={cellIcon(soundLightAlarmImageSrc())}
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'co-alarm'}>
          <Cell
            size="medium"
            title="CO报警器"
            value=""
            prefixIcon={cellIcon(coAlarmImageSrc())}
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'methane-alarm'}>
          <Cell
            size="medium"
            title="甲烷报警器"
            value=""
            prefixIcon={cellIcon(methaneAlarmImageSrc())}
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'gas-alarm'}>
          <Cell
            size="medium"
            title="燃气报警器"
            value=""
            prefixIcon={cellIcon(gasAlarmImageSrc())}
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>*/}
      </ul>
      ) : (
        <ul>
          <li className="dev-empty">暂未绑定电子设备</li>
        </ul>
      )}
      <div className="dev-operate">
        <div className="addDev" onClick={handleAdd}>
          如何添加设备
        </div>
        <div className="fastAdd" onClick={handleGetGateway}>快速添加</div>
      </div>
    </article>
  );
}
