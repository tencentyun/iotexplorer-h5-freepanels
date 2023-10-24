import React, { useEffect, useState } from 'react';
import { IconBattery } from '@src/panels-next/SmartSpeaker/components/IconBattery';
import './Home.less';
import { useDeviceStore } from '@src/panels-next/PanelWrap';
import {
  iconSetting,
  iconSleepMode,
  iconSmartVoice,
  iconSubDevice,
  iconVolAdd,
  iconVolSubtract,
} from '@src/panels-next/SmartSpeaker/assets';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Cell } from '@src/panels-next/SmartSpeaker/components/Cell';
import { useHistory } from 'react-router-dom';
import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';

export function Home() {
  const { deviceData, controlDeviceData } = useDeviceStore();
  const history = useHistory();

  const [volume, setVolume] = useState(deviceData.volume || 49);

  useEffect(() => {
    if (deviceData.volume) {
      setVolume(deviceData.volume);
    }
  }, [deviceData.volume]);

  return (
    <div className='page-home'>
      <div className='banner'>
        <img
          src='https://qcloudimg.tencent-cloud.cn/raw/a5c40f219a2460427093d2a3a9fb3110.png'
          alt=''
        />
      </div>

      <div className='battery'>
        <IconBattery percent={deviceData.battery || 50} />
        <span className='battery-text'>{deviceData.battery || 50}%</span>
      </div>

      <div className='volume-set'>
        <img src={iconVolSubtract} alt='' />
        <div className='slider-view'>
          <Slider
            value={volume}
            min={0}
            max={100}
            onChange={setVolume}
            onAfterChange={(val) => {
              controlDeviceData({ volume: val });
            }}
          />
        </div>
        <img src={iconVolAdd} alt='' />
      </div>

      <div className='setting-view-horizontal'>
        <Cell icon={iconSmartVoice} title='智能语控' onClick={() => history.push('/voice-control')} />
        <Cell icon={iconSleepMode} title='睡眠模式' onClick={() => history.push('/sleep-mode')} />
      </div>
      <div className='setting-view-vertical'>
        <Cell
          icon={iconSubDevice}
          title='子设备管理'
          onClick={() => {
            h5PanelSdk.callMpApi('navigateTo', {
              url: `/pages/Device/GatewaySubDeviceList/GatewaySubDeviceList?gatewayDeviceId=${h5PanelSdk.deviceId}&isLLSyncGateway=true`,
            });
          }}
        />
        <Cell
          title='基础设置'
          icon={iconSetting}
          onClick={() => {
            h5PanelSdk.callMpApi('navigateTo', {
              url: `/pages/Device/DeviceDetail/DeviceDetail?deviceId=${h5PanelSdk.deviceId}`,
            });
          }}
        />
      </div>
    </div>
  );
}
