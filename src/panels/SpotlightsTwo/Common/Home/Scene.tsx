import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@src/components/custom/Icon';

const CONFIG = [
  ['我喜欢的', 0, true],
  ['主题心情', 1, false],
  ['假日陪伴', 2, false],
  ['多彩生活', 3, false],
];

// const THEMECONFIG = [
//   { id: 1, name: '缤纷', value: 'riotous', isLike: false },
//   { id: 2, name: '炫彩', value: 'colorful', isLike: false },
//   { id: 3, name: '斑斓', value: 'multicolored', isLike: false },
//   { id: 4, name: '蓝天', value: 'sky', isLike: false },
//   { id: 5, name: '海洋', value: 'ocean', isLike: false },
//   { id: 6, name: '七夕节', value: 'qixi_festival', isLike: false },
//   { id: 7, name: '端午节', value: 'dragon_boat_festival', isLike: false },
//   { id: 8, name: '中秋节', value: 'mid_autumn_festival', isLike: false },
//   { id: 9, name: '国庆节', value: 'national_day', isLike: false },
//   { id: 10, name: '生日', value: 'birthday', isLike: false },
//   { id: 11, name: '阅读', value: 'reading', isLike: false },
//   { id: 12, name: '工作', value: 'working', isLike: false },
//   { id: 13, name: '休闲', value: 'relaxation', isLike: false },
//   { id: 14, name: '晚安', value: 'night', isLike: false },
//   { id: 15, name: '柔和', value: 'cozy', isLike: false },
// ];
const THEME = [
  [],
  [{ id: 1, name: '缤纷', value: 'riotous', isLike: false },
    { id: 2, name: '炫彩', value: 'colorful', isLike: false },
    { id: 3, name: '斑斓', value: 'multicolored', isLike: false },
    { id: 4, name: '蓝天', value: 'sky', isLike: false },
    { id: 5, name: '海洋', value: 'ocean', isLike: false },
  ],
  [{ id: 6, name: '七夕节', value: 'qixi_festival', isLike: false },
    { id: 7, name: '端午节', value: 'dragon_boat_festival', isLike: false },
    { id: 8, name: '中秋节', value: 'mid_autumn_festival', isLike: false },
    { id: 9, name: '国庆节', value: 'national_day', isLike: false },
    { id: 10, name: '生日', value: 'birthday', isLike: false },
  ],
  [{ id: 11, name: '阅读', value: 'reading', isLike: false },
    { id: 12, name: '工作', value: 'working', isLike: false },
    { id: 13, name: '休闲', value: 'relaxation', isLike: false },
    { id: 14, name: '晚安', value: 'night', isLike: false },
    { id: 15, name: '柔和', value: 'cozy', isLike: false },
  ],
];

interface themeItem {
  id: number;
  name: string;
  value: string;
  isLike: boolean;
}

export function ScenePage({
  deviceData: { switch_led },
  doControlDeviceData,
}) {
  // tab切换
  const [tabValue, setTabValue] = useState(1);
  // 主题数据
  const [themeList, setThemeList] = useState(THEME);

  const favoriteChangeHandle = (newThemeList) => {
    const list: themeItem[] = [];
    newThemeList.forEach((item) => {
      item.forEach((value) => {
        if (value.isLike) {
          list.push(value);
        }
      });
    });
    return list;
  };

  const favoriteHandle = (id: number, isLike: boolean) => {
    const newList = themeList[tabValue].map((value: themeItem) => (value.id === id
      ? { ...value, isLike: !isLike } : value));
    if (tabValue !== 0) {
      themeList[tabValue] = [...newList];
    }
    themeList[0] = [];
    themeList[0] = [...favoriteChangeHandle(themeList)];
    setThemeList([...themeList]);
  };

  return (
    <div className={classNames('scene-page', switch_led !== 1 ? 'off-scene' : '')}>
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
            {tabValue !== 0
              ? <span
                className={`item-like ${isLike ? 'like-checked' : ''}`}
                onClick={() => {
                  favoriteHandle(id, isLike);
                  // doControlDeviceData('like', !isLike ? 'like' : 'dislike');
                  doControlDeviceData(!isLike ? 'like' : 'dislike', id);
                }}>
                <Icon name={isLike ? 'like-checked' : 'like'}></Icon>
              </span> : null
            }
          </div>
        ))}
        {themeList[tabValue].length === 0 ? <div className="empty">暂无数据</div> : null}
      </div>
    </div>
  );
}
