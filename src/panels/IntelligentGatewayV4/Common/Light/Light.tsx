import React from 'react';
import { Icon } from '@custom/Icon';
import { LightBright } from '@custom/LightBright';

export function Light(props) {
  const { deviceData = {}, doControlDeviceData = () => { } } = { ...props }
  return (
    <div className="night-bright">
      <div className="switch-content" >
        <div className="custom-circle" onClick={() => {
          console.log(!deviceData?.night_switch)
          doControlDeviceData('night_switch', !deviceData?.night_switch)
        }}>
          <div className="custom-ring">
            <Icon name="switch" />
          </div>
        </div>
      </div>
      <LightBright
        defaultValue={deviceData['night_brightness']}
        status={!!deviceData?.night_switch}
        iconName="light"
        minValue={0}
        maxValue={100}
        onChange={(value, endTouch) => endTouch && doControlDeviceData('night_brightness', value)}
      ></LightBright>
    </div>
  );
}
