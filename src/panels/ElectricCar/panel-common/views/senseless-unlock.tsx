/*
 * @Description: 无感解锁页面
 */

import React, { useState } from 'react';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { getThemeType } from '@libs/theme';

const themeType = getThemeType();

export function SenselessUnlock() {
  // const state = useDeviceData(sdk);
  // const deviceData = state.deviceData || {};

  // 无感解锁
  const [unlockStatus, onToggleUnlockStatus] = useState(false);

  const imageSrc = () => {
    switch (themeType) {
      case 'normal':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/19331640748320_.pic_hd.jpg';
      case 'blueWhite':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/19341640748320_.pic_hd.jpg';
      case 'dark':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/19321640748320_.pic_hd.jpg';
      case 'colorful':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/diandongche_sklf/7661635905726_.pic_hd.jpg';
      case 'morandi':
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/19321640748320_.pic_hd.jpg';
      default:
        return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/19321640748320_.pic_hd.jpg';
    }
  };

  // 处理无感解锁
  const handleUnlock = () => {
    onToggleUnlockStatus(true);
  };

  return (
    <main className="senseless-unlock">
      <Block className="header-block">
        <img className="car-unlock-image" src={imageSrc()}></img>
        <div className="tips">
          <div className="icon-unlock"></div>
          <p className="tips-name">手机靠近车辆自动解锁</p>
        </div>
      </Block>

      <Block className="setting-block">
        <Cell
          title="无感解锁"
          size="medium"
          isLink={false}
          value={
            <Switch
              name="mode"
              theme={themeType}
              checked={false}
              onChange={handleUnlock}
            />
          }
        ></Cell>
      </Block>
    </main>
  );
}
