/*
 * @Description: 首页-开/关按钮
 */

import React from 'react';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { onControlDevice } from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './index.less';

export function StatusBlock() {

  // 处理开锁/关锁
  const handleLock = () => {
    onControlDevice('lock_switch', Number(!sdk.deviceData.lock_switch));
  };

  return (
    <Block
      className={classNames(
        'status-block',
        sdk.deviceData.lock_switch === 1 ? 'active' : ''
      )}
      onClick={handleLock}
    >
      <div
        className={classNames(
          sdk.deviceData.lock_switch === 1 ? 'icon-unlock' : 'icon-lock'
        )}
      ></div>
      <p className="status-name">
        {sdk.deviceData.lock_switch === 1 ? '已开锁' : '已关锁'}
      </p>
    </Block>
  );
}
