import React from 'react';
import { Icon } from '@custom/Icon';

const CONFIG = [
  ['白光', 0, 'white'],
  ['情景', 1, 'scene'],
];

const Ticker = ({ deviceData: { color_mode = 0, power_switch }, doControlDeviceData }) => {
  const isChecked = (val: number) => power_switch === 1 && color_mode === val;
  return (
    <div className="ticker">
      <div className="content">
        {CONFIG.map(([name, value, icon]) => (
          <div
            key={value}
            className={`item ${isChecked(value) ? 'checked' : ''}`}
            onClick={() => doControlDeviceData({ color_mode: value })}
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
