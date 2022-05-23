import { Icon } from '@src/components/custom/Icon';
import React, { useState } from 'react';

const CONFIG = [
  ['我喜欢的', 0, true, ['riotous', 'colorful', 'multicolored', 'sky', 'ocean']],
  ['主题心情', 1, false, ['riotous', 'colorful', 'multicolored', 'sky', 'ocean']],
  ['假日陪伴', 2, false, ['riotous', 'colorful', 'multicolored', 'sky', 'ocean']],
  ['多彩生活', 3, false, ['riotous', 'colorful', 'multicolored', 'sky', 'ocean']],
];

const THEME = [
  ['riotous'],
  ['riotous', 'colorful', 'multicolored', 'sky', 'ocean', 'sunflower', 'forest', 'kungFu', 'dream', 'med', 'french', 'american'],
  ['halloween', 'easter', 'vDay', 'holi', 'diwali', 'independenceDay', 'christmas', 'birthday'],
  ['reading', 'job', 'leisure', 'night', 'buds', 'brighter', 'golden', 'warm'],
];

export function ScenePage({
  deviceData: { color_mode, power_switch },
  doControlDeviceData,
}) {
  const [selected, setSelected] = useState(0);

  const isSwitchOff = power_switch !== 1;
  const isChecked = (val: number | string) => !isSwitchOff && color_mode === val;
  const cls = isSwitchOff ? 'power-off' : '';

  return (
    <div className={`scene-page ${cls}`}>
      <div className="scene-tab">
        {CONFIG.map(([name, value], index) => (
          <div
            className={`tab-item ${selected === value ? 'active' : ''}`}
            key={index}
            onClick={() => setSelected(value as number)}
          >
            <span className="title">{name}</span>
          </div>
        ))}
      </div>
      <div className="scene-content">
        {THEME[selected].map(item => (
          <div key={item} className={`theme-item ${item}`}>
            <span className="item-title">海洋</span>
            <span className="item-like">
              <Icon name={isSwitchOff ? 'like-checked' : 'like'}></Icon>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
