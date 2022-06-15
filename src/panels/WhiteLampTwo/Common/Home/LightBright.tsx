import React from 'react';
import { LightBright } from '@custom/LightBright';

const LightBrightPage = ({ deviceData: { bright_value, switch_led }, doControlDeviceData }) => (
  <div className={`light-bright ${switch_led ? 'on-switch' : 'off-switch'}`}>
    <LightBright
      defaultValue={bright_value}
      status={switch_led}
      onChange={(bright_value, endTouch) => endTouch && doControlDeviceData({ bright_value })}
    />
  </div>
);

export default LightBrightPage;
