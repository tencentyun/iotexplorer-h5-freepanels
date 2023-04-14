import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@src/components/custom/Icon';

const THEME = [
  [],
  [
    { id: 0, name: '会客模式', value: 'ocean', isLike: false },
    { id: 1, name: '休闲模式', value: 'relaxation', isLike: false },
    { id: 2, name: '观影模式', value: 'forest', isLike: false },
    { id: 3, name: '用餐模式', value: 'sky', isLike: false },
    { id: 4, name: '变幻模式', value: 'colorful', isLike: false },
    { id: 5, name: '浪漫模式', value: 'riotous', isLike: false },
    { id: 6, name: '工作模式', value: 'job', isLike: false },
    { id: 7, name: '睡眠模式', value: 'night', isLike: false },
    { id: 8, name: '阅读模式', value: 'reading', isLike: false },
    { id: 9, name: '清扫模式', value: 'multicolored', isLike: false },
    { id: 10, name: '智能感光模式', value: 'cozy', isLike: false },

  ],
];

export function ScenePage({
  deviceData: { power_switch, scene_data, count_down },
  doControlDeviceData,
}) {
  // tab切换
  const [tabValue] = useState(1);
  // 主题数据
  const [themeList] = useState(THEME);
  const favoriteHandle = (id: number) => {
    doControlDeviceData('scene_data', id);
  };

  return (
    <div
      className={classNames('scene-page', power_switch !== 1 ? 'off-scene' : '', count_down ? 'scene-page-count' : '')}
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
