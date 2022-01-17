import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './lock.less';
import { getThemeType } from '@libs/theme';
import LockImageGray from '../../../icons/normal/lock-close.svg';
import LockImageBlack from '../../../icons/normal/lock-open.svg';
import LockImageWhite from '../../../icons/blue-white/lock-close.svg';
import LockImageWhiteOpen from '../../../icons/blue-white/lock-open.svg';
import LockImageBlue from '../../../icons/colorful/lock-open.svg';

export function Lock() {
  const themeType = getThemeType();
  const lockImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.power_switch === 1
          ? LockImageBlack
          : LockImageGray;
      case 'colorful':
        return sdk.deviceData.power_switch === 1
          ? LockImageBlue
          : LockImageGray;
      default:
        return sdk.deviceData.power_switch === 1
          ? LockImageWhiteOpen
          : LockImageWhite;
    }
  };
  return <img className="lock-img" src={lockImageSrc()} alt="" />;
}
