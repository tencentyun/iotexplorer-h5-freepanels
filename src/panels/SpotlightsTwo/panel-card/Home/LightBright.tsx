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
      status={deviceData.power_switch === 1}
      iconName={iconName}
      minValue={0}
      maxValue={100}
      onChange={(value, endTouch) => endTouch && doControlDeviceData(controlName, value)}
    />
  </div>
);

export default LightBrightPage;
