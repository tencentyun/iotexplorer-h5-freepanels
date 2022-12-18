import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@src/components/custom/Icon';

const THEME = [
  [],
  [
    { id: '1', name: '海洋', value: 'ocean', isLike: true },
    { id: '2', name: '向日葵', value: 'sunflower', isLike: true },
    { id: '3', name: '森林', value: 'forest', isLike: false },
    { id: '49', name: '草原', value: 'sky', isLike: false },
    { id: '5', name: '炫彩', value: 'colorful', isLike: false },
  ],
];

export function ScenePage({
  deviceData: { switch_led, scene_data },
  doControlDeviceData,
}) {
  // tab切换
  const [tabValue] = useState(1);
  // 主题数据
  const [themeList] = useState(THEME);
  const favoriteHandle = (id: string) => {
    doControlDeviceData('scene_data', id);
  };

  return (
    <div
      className={classNames('scene-page', switch_led !== 1 ? 'off-scene' : '')}
    >
      <div className="scene-content">
        {themeList[tabValue].map(({ id, name, value }) => {
          const isLike = id === scene_data;
          return (
            <div
              key={id}
              onClick={() => {
                favoriteHandle(id);
              }}
              className={`theme-item ${value}`}
            >
              <span className="item-title">{name}</span>
              {tabValue !== 0 ? (
                <span className={`item-like ${isLike ? 'like-checked' : ''}`}>
                  <Icon name={isLike ? 'like-checked' : 'like'}></Icon>
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
