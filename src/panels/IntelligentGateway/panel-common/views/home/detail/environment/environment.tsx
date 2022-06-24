import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './environment.less';
import Gateways from './gateways/gateways';

const Environment = () => {
  return (
    <article className={classNames('environment')}>
      <div className="title">已添加的设备 ▼</div>
      <Gateways />
      <div className="add" onClick={() => sdk.goGatewayAddSubDevicePage(sdk.deviceId)}>添加子设备</div>
    </article>
  );
};

export default Environment;
