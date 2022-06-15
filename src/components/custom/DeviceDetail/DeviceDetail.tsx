import React from 'react';
import { Icon } from '@custom/Icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function DeviceDetail({ disable = false }) {
  const disableCls = disable ? 'disable' : 'normal';
  return (
    <div
      className={`cus-dev-detail dev-${disableCls}`}
      onClick={() => !disable && sdk.goDeviceDetailPage()}
    >
      <Icon name="dev-detail" className="dev-more" />
    </div>
  );
}
