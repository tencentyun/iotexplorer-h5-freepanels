import React from 'react';
import { Btn } from '@custom/Btn';

const CONFIG = [
  ['白光', 0, 'white'],
  ['彩光', 1, 'colour'],
  ['场景', 2, 'scene'],
];

const Ticker = ({
  deviceData: { work_mode = 'white', power_switch },
  doControlDeviceData,
}) => {
  const isSwitchOff = power_switch !== 1;
  const isChecked = (val: number | string) => work_mode === val;
  const cls = isSwitchOff ? 'ticker-off' : '';
  return (
    <div className={`ticker ${cls}`}>
      <div className="content">
        {CONFIG.map(([name, index, value]) => (
          <Btn
            className={isSwitchOff && isChecked(value)  ? 'btn-disable' : '' }
            key={index}
            type={!isSwitchOff && isChecked(value) ? 'primary' : 'reverse'}
            onClick={() => {
              if (!isSwitchOff) {
                doControlDeviceData({ work_mode: value });
              }
            }}
          >
            <div className="title">{name}</div>
          </Btn>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
