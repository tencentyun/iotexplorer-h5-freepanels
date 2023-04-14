import React, { useEffect } from 'react';
import { Icon } from '@custom/Icon';
import { Switch } from '@custom/Switch';

export function Home(props) {
  const {
    deviceData,
    doControlDeviceData,
    history: { PATH, push },
  } = { ...props };

  useEffect(() => {
    if (!!deviceData.power_switch) {
      if (deviceData.status === 4) {
        push(PATH.PROCESS);
        return;
      }
      push(PATH.OPERATOR)
    }
  }, [deviceData.power_switch])

  const onSwitchClick = () => {
    doControlDeviceData('power_switch', 1);
  }

  return (
    <main className="home">
      <div className="switch-total">
        <div className="switch-title">开关</div>
        <Switch
          className="reverse custom-switch"
          checked={!!deviceData.power_switch}
          onChange={onSwitchClick}
        />
      </div>
      <div className="photo">
        <Icon name="pot" />
        <div className="bottom-bg"></div>
      </div>
      <div className="operator" onClick={() => {
        push(PATH.OPERATOR)
      }}>
        <Icon name="switch" />
        <div className="title">开关</div>
      </div>
    </main>
  );
}
