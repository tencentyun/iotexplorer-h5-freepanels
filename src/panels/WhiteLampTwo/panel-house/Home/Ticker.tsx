import React from 'react';
import { Icon } from '@custom/Icon';
import { Btn } from '@custom/Btn';

const CONFIG = [
  ['白光', 'white', 'white'],
  ['情景', 'scene', 'scene'],
];

const Ticker = ({
  deviceData: { work_mode = 'white', switch_led },
  doControlDeviceData,
}) => {
  const isSwitchOff = switch_led !== 1;
  const isChecked = (val: number | string) => !isSwitchOff && work_mode === val;
  const cls = isSwitchOff ? 'ticker-off' : '';
  return (
    <div className={`ticker ${cls}`}>
      <div className="content">
        {CONFIG.map(([name, value, icon]) => (
          <Btn
            key={value}
            type={isChecked(value) ? 'primary' : 'reverse'}
            onClick={() => doControlDeviceData({ work_mode: value })}
          >
            <Icon name={`${icon}${isChecked(value) ? '-checked' : ''}`} />
            <div className="title">{name}</div>
          </Btn>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
