import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './title.less';

export function Title() {
  return (
    <div className="device-state">
      {sdk.deviceData.power_switch === 0 ? '空净关' : '空净开'}
    </div>
  );
}
