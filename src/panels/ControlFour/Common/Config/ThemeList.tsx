import React, { useState } from 'react';
import { ThemeSlider } from './ThemeSlider';

const items = ['1', '2', '3', '4', '5', '6', '7'];
const getIndex = (key) => {
  let index = 3;
  // SceneValueMap.map((item, i) => {
  //   if (item === key) {
  //     index = i;
  //   }
  // });
  return index;
};
export function ThemeList({ deviceData, doControlDeviceData }) {
  // const [value, setValue] = useState(getIndex(deviceData.scene_data));
  const [value, setValue] = useState(getIndex(1));

  return (
    <div className="theme-list">
      <ThemeSlider
        items={items}
        value={value}
        onChange={(value) => {
          console.log('外部值的变化:', value);
          // setValue(value);
          // doControlDeviceData('scene_data', SceneValueMap[value]);
        }}
      />
    </div>
  );
}
