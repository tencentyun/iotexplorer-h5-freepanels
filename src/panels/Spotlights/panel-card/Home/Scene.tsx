import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@src/components/custom/Icon';

const CONFIG = [
  ['我喜欢的', 0, true],
  ['主题心情', 1, false],
  ['假日陪伴', 2, false],
  ['多彩生活', 3, false],
];

const THEME = [
  [{ id: 2, name: '炫彩', value: 'colorful', isLike: true },
    { id: 20, name: '生日', value: 'birthday', isLike: true },
    { id: 21, name: '梦幻', value: 'dream', isLike: true },
    { id: 23, name: '法式', value: 'french', isLike: true },
    { id: 22, name: '地中海', value: 'med', isLike: true },
    { id: 5, name: '海洋', value: 'ocean', isLike: true },
    { id: 6, name: '向日葵', value: 'sunflower', isLike: true },
    { id: 12, name: '美式', value: 'american', isLike: true }],
  [{ id: 1, name: '缤纷', value: 'riotous', isLike: false },
    { id: 2, name: '炫彩', value: 'colorful', isLike: true },
    { id: 3, name: '斑斓', value: 'multicolored', isLike: false },
    { id: 4, name: '蓝天', value: 'sky', isLike: false },
    { id: 5, name: '海洋', value: 'ocean', isLike: true },
    { id: 6, name: '向日葵', value: 'sunflower', isLike: true },
    { id: 7, name: '森林', value: 'forest', isLike: false },
    { id: 8, name: '功夫', value: 'kungFu', isLike: false },
    { id: 9, name: '梦幻', value: 'dream', isLike: false },
    { id: 10, name: '地中海', value: 'med', isLike: false },
    { id: 11, name: '法式', value: 'french', isLike: false },
    { id: 12, name: '美式', value: 'american', isLike: true }],
  [{ id: 13, name: '万圣节', value: 'halloween', isLike: false },
    { id: 14, name: '复活节', value: 'easter', isLike: false },
    { id: 15, name: '胜利日', value: 'vDay', isLike: false },
    { id: 16, name: '洒红节', value: 'holi', isLike: false },
    { id: 17, name: '排灯节', value: 'diwali', isLike: false },
    { id: 18, name: '独立日', value: 'independenceDay', isLike: false },
    { id: 19, name: '圣诞节', value: 'christmas', isLike: false },
    { id: 20, name: '生日', value: 'birthday', isLike: true },
    { id: 21, name: '梦幻', value: 'dream', isLike: true },
    { id: 22, name: '地中海', value: 'med', isLike: true },
    { id: 23, name: '法式', value: 'french', isLike: true },
    { id: 24, name: '美式', value: 'american', isLike: false }],
  [{ id: 25, name: '阅读', value: 'reading', isLike: false },
    { id: 26, name: '工作', value: 'job', isLike: false },
    { id: 27, name: '休闲', value: 'leisure', isLike: false },
    { id: 28, name: '晚安', value: 'night', isLike: false },
    { id: 29, name: '春天的嫩芽', value: 'buds', isLike: false },
    { id: 30, name: '夏天的清亮', value: 'brighter', isLike: false },
    { id: 31, name: '秋天的金黄', value: 'golden', isLike: false },
    { id: 32, name: '冬天的温暖', value: 'warm', isLike: false }],
];

interface themeItem {
  id: number;
  name: string;
  value: string;
  isLike: boolean;
}

export function ScenePage({
  deviceData: { power_switch },
}) {
  // tab切换
  const [tabValue, setTabValue] = useState(0);
  // 主题数据
  const [themeList, setThemeList] = useState(THEME);

  const favoriteHandle = (id: number, isLike: boolean) => {
    const newList = themeList[tabValue].map((value: themeItem) => (value.id === id
      ? { ...value, isLike: !isLike } : value));
    themeList[tabValue] = [...newList];
    setThemeList([...themeList]);
  };

  return (
    <div className={classNames('scene-page', power_switch !== 1 ? 'off-scene' : '')}>
      <div className="scene-tab">
        {CONFIG.map(([name, value], index) => (
          <div
            className={`tab-item ${tabValue === value ? 'active' : ''}`}
            key={index}
            onClick={() => setTabValue(value as number)}
          >
            <span className="title">{name}</span>
          </div>
        ))}
      </div>
      <div className="scene-content">
        {themeList[tabValue].map(({ id, name, value, isLike }) => (
          <div key={id} className={`theme-item ${value}`}>
            <span className="item-title">{name}</span>
            <span
              className={`item-like ${isLike ? 'like-checked' : ''}`}
              onClick={() => {
                favoriteHandle(id, isLike);
              }}>
              <Icon name={isLike ? 'like-checked' : 'like'}></Icon>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
