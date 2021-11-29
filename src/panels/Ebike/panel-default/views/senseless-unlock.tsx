/*
 * @Description: 无感解锁页面
 */

import React, { useState } from 'react';
import { useDeviceData } from '@/hooks/useDeviceData';
import { getThemeType } from '@/business';
import { SvgIcon } from '@/components/common';
import { Block } from '@/components/layout';
import { Cell, Switch } from '@/components/base';

// @ts-ignore
import CarImage from '@/assets/images/electric-car/car.svg';
// @ts-ignore
import image from '@/assets/images/electric-car/normal-lock.svg';

// @ts-ignore
import Lock from '@/assets/images/electric-car/lock.svg';

const themeType = getThemeType();

export function SenselessUnlock() {
  // const state = useDeviceData(sdk);
  // const deviceData = state.deviceData || {};

  // 无感解锁
  const [unlockStatus, onToggleUnlockStatus] = useState(false);

  const imageSrc = () => {
    switch (themeType) {
      case 'normal':
        return <img className="car-unlock-image" src={image}></img>;
      case 'blueWhite':
        return CarImage;
      case 'dark':
        return CarImage;
      case 'colorful':
        return CarImage;
      case 'morandi':
        return CarImage;
      default:
        return CarImage;
    }
  };

  // 处理无感解锁
  const handleUnlock = () => {
    onToggleUnlockStatus(true);
  };

  return (
    <main className="senseless-unlock">
      <Block className="header-block">
        <img
          className="car-unlock-image"
          src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/diandongche_sklf/7661635905726_.pic_hd.jpg"
        ></img>
        <div className="tips">
          <img className="icon-unlock" src={Lock}></img>
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
