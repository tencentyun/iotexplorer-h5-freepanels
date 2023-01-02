import React, { useEffect } from 'react';
import { Icon } from '@custom/Icon';

export function Home(props) {
  const {
    deviceData,
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

  return (
    <main className="home">
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
