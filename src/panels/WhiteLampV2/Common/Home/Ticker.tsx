import React from 'react';
import { Icon } from '@custom/Icon';

const CONFIG = [
  ['白光', 'white', 'white'],
  ['情景', 'scene', 'scene'],
];

const Ticker = ({ deviceData: { work_mode = 'white', switch_led }, doControlDeviceData }) => {
  const isChecked = (val: string) => switch_led === 1 && work_mode === val;
  return (
    <div className="ticker">
      <div className="content">
        {CONFIG.map(([name, value, icon]) => (
          <div
            key={value}
            className={`item ${isChecked(value) ? 'checked' : ''}`}
            onClick={() => doControlDeviceData({ work_mode: value })}
          >
            <Icon name={`${icon}${isChecked(value) ? '-checked' : ''}`} />
            <div className="title">{name}</div>
          </div>
        ))}
      </div>
      <div className="line-h" />
    </div>
  );
};

export default Ticker;
