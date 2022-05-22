import React, { useState } from 'react';

const CONFIG = [
  ['我喜欢的', 0, true, ['riotous', 'colorful', 'multicolored', 'sky', 'ocean']],
  ['主题心情', 1, false, ['riotous', 'colorful', 'multicolored', 'sky', 'ocean']],
  ['假日陪伴', 2, false, ['riotous', 'colorful', 'multicolored', 'sky', 'ocean']],
  ['多彩生活', 3, false, ['riotous', 'colorful', 'multicolored', 'sky', 'ocean']],
];

// const CONFIG = [
//   ['我喜欢的', 0, true],
//   ['主题心情', 1, false],
//   ['假日陪伴', 2, false],
//   ['多彩生活', 3, false],
// ];
// riotous、colorful、multicolored、sky、ocean 、sunflower、forest、kungFu、dream、med、french、american
// halloween、easter、vDay、holi、diwali、independenceDay、christmas、birthday
// reading、job、leisure、night、buds、brighter、golden、warm

export function ScenePage({
  deviceData: { color_mode, power_switch },
  doControlDeviceData,
}) {
  const isSwitchOff = power_switch !== 1;
  const isChecked = (val: number | string) => !isSwitchOff && color_mode === val;
  const cls = isSwitchOff ? 'ticker-off' : '';

  return (
    <div className={`scene-page ${cls}`}>
      <div className="content">
        {CONFIG.map(([name, value, status, list]) => (
          <span
            key={value}
            type={isChecked(value) ? 'primary' : 'reverse'}
            onClick={() => doControlDeviceData({ color_mode: value })}
          >
            <div className="title">{name}</div>
            {isChecked(value) ? list.map(name => (
              <div key={name} className={`theme-item ${name}`}></div>
            )) : null
          }
          </span>
        ))}
      </div>
    </div>
  );
}
