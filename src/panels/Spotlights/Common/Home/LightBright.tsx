import React from 'react';
import { LightBright } from '@custom/LightBright';

const LightBrightPage = ({
  deviceData: { brightness, power_switch },
  doControlDeviceData,
  iconName,
  controlName,
}) => (
  <div className={`light-bright ${power_switch ? 'on-switch' : 'off-switch'}`}>
    <LightBright
      defaultValue={brightness}
      status={power_switch}
      iconName={iconName}
      onChange={(value, endTouch) => endTouch && doControlDeviceData(controlName, value)}
    />
  </div>
);

export default LightBrightPage;
