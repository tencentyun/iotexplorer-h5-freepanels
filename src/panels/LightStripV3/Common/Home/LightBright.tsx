import React from 'react';
import { LightBright } from '@custom/LightBright';

const LightBrightPage = ({
  deviceData,
  doControlDeviceData,
  iconName,
  minValue = 0,
  maxValue = 100,
  controlName,
  defaultValue = 80
}) => (
  <div className={`light-bright ${deviceData.power_switch ? 'on-switch' : 'off-switch'}`}>
    <LightBright
      defaultValue={deviceData[controlName] || defaultValue}
      status={deviceData.power_switch === 1}
      iconName={iconName}
      minValue={minValue}
      maxValue={maxValue}
      onChange={(value, endTouch) => endTouch && doControlDeviceData(controlName, value)}
    />
  </div>
);

export default LightBrightPage;
