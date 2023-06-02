import React from 'react';
import { LightBright } from '@custom/LightBright';

const LightBrightPage = ({
  deviceData,
  doControlDeviceData,
  iconName,
  controlName,
  onChange,
  minValue,
  maxValue
}) => {
  return <div className={`light-bright ${deviceData.power_switch ? 'on-switch' : 'off-switch'}`}>
    <LightBright
      defaultValue={deviceData[controlName] || 80}
      value={deviceData[controlName]}
      status={deviceData.power_switch === 1}
      iconName={iconName}
      minValue={minValue || 1}
      maxValue={maxValue || 100}
      onChange={(value, endTouch) => {
        onChange && onChange(value);
        endTouch && doControlDeviceData(controlName, value)
      }}
    />
  </div>

}


export default LightBrightPage;
