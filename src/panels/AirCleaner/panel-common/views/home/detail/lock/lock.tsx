import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './lock.less';
import { getThemeType } from '@libs/theme';
import LockImageGray from '../../../icons/normal/lock-close.svg';
import LockImageBlack from '../../../icons/normal/lock-open.svg';
import LockImageWhite from '../../../icons/blue-white/lock-close.svg';
import LockImageWhiteOpen from '../../../icons/blue-white/lock-open.svg';
import LockImageBlue from '../../../icons/colorful/lock-open.svg';
import {apiControlDeviceData} from "@hooks/useDeviceData";

export function Lock() {
  const themeType = getThemeType();
  const handleChildLock = () => {
    apiControlDeviceData({
      child_lock: sdk.deviceData.child_lock === 1 ? 0 : 1
    });
  };
  const lockImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.child_lock === 1
          ? LockImageGray
          : LockImageBlack;
      case 'colorful':
        return sdk.deviceData.child_lock === 1
          ? LockImageGray
          : LockImageBlue;
      default:
        return sdk.deviceData.child_lock === 1
          ? LockImageWhite
          : LockImageWhiteOpen;
    }
  };
  return (
    <div onClick={handleChildLock} >
      <img className="lock-img" src={lockImageSrc()} alt="" />
    </div>
  );
}
