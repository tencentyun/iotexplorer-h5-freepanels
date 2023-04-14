import React from 'react';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { Switch } from '@custom/Switch';
import { Icon } from '@custom/Icon';

export function Home(props) {
  const { deviceData, doControlDeviceData } = props;
  const onSwitchClick = () => {
    doControlDeviceData('power_switch', Number(!deviceData.power_switch));
  }
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
          <div className="right">
            <Icon name="light" />
          </div>
        </div>
        <Action {...props}></Action>
      </div>
    </div>
  );
}
