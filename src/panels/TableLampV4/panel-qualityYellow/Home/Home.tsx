import React, { useState } from 'react';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { Switch } from '@custom/Switch';
import { Icon } from '@custom/Icon';

export function Home(props) {
  const { deviceData, doControlDeviceData } = props;
  const onSwitchClick = () => {
    doControlDeviceData('power_switch', Number(!deviceData.power_switch));
  }

  const [showCountDown, setShowCountDown] = useState(false);
  const [countDown, setCountDown] = useState('00:00:00');
  return (
    <div className={`home ${!deviceData.power_switch ? 'is-off' : ''}`}>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        <div className="change-panel">
          <div className="switch-total">
            <div className="switch-title">开关</div>
            <Switch
              className="reverse custom-switch"
              checked={!!deviceData.power_switch}
              onChange={onSwitchClick}
            />
          </div>

          {showCountDown && <div className="count-down">
            <span>倒计时：</span>
            <span>{countDown}</span>
          </div>}
          <div className="right">
            <Icon name="light" />
          </div>
        </div>
        <Action {...props} setCountDown={(value) => {
          if (value) {
            const hour = `${Math.floor(value / 3600)}`;
            const minute = `${Math.floor((value % 3600) / 60)}`;
            const second = `${Math.floor((value % 3600) % 60)}`;
            setCountDown(`${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`)
          }
          setShowCountDown(true);
        }}></Action>
      </div>
    </div>
  );
}
