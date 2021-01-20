import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { RawBtn } from '@components/Btn/Btn';
import { iconMoreBlue } from '@icons/common';

import './DeviceDetailBtn.less';

export function DeviceDetailBtn() {
  return (
    <RawBtn
      className="locator-panel-device-detail-btn"
      onClick={() => {
        sdk.goDeviceDetailPage();
      }}
    >
      <img src={iconMoreBlue} className="locator-panel-device-detail-icon" />
    </RawBtn>
  );
}
