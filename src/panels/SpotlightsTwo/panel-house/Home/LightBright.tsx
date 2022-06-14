import React from 'react';
import { LightBright } from '@custom/LightBright';

const LightBrightPage = ({
  deviceData,
  doControlDeviceData,
  iconName,
  controlName,
}) => (
  <div className={`light-bright ${deviceData.switch_led ? 'on-switch' : 'off-switch'}`}>
    <LightBright
      defaultValue={deviceData[controlName]}
      status={deviceData.switch_led === 1}
      iconName={iconName}
      minValue={0}
      maxValue={100}
      onChange={(value, endTouch) => endTouch && doControlDeviceData(controlName, value)}
    />
  </div>
);

export default LightBrightPage;
