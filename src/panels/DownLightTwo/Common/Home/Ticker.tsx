import React from 'react';
import { Btn } from '@custom/Btn';
import { t } from '@locales';

const CONFIG = [
  [t('白光'), 0, 'white'],
  [t('彩光'), 1, 'colour'],
  [t('场景'), 2, 'scene'],
];

const Ticker = ({
  deviceData: { work_mode = 'white', switch_led },
  doControlDeviceData,
}) => {
  const isSwitchOff = switch_led !== 1;
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
