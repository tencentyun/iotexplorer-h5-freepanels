import React from 'react';
import { LightBright } from '@custom/LightBright';

const LightBrightPage = ({
  deviceData,
  doControlDeviceData,
  iconName,
  controlName,
}) => (
  <div className={`light-bright ${deviceData.power_switch ? 'on-switch' : 'off-switch'}`}>
    <LightBright
      defaultValue={deviceData[controlName]}
      status={deviceData.power_switch}
      iconName={iconName}
      onChange={(value, endTouch) => endTouch && doControlDeviceData(controlName, value)}
    />
  </div>
);

export default LightBrightPage;
