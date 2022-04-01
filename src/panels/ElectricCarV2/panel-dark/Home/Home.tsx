import React from 'react';
import classNames from 'classnames';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { HeaderBlock } from '../../Common/Home/HeaderBlock';
import { SettingBlock } from '../../Common/Home/SettingBlock';
import SwipeUnlock from './SwipeUnlock';
import './Home.less';

export function Home({
  deviceData,
  doControlDeviceData,
  history: { PATH, push },
}) {
  const handleLock = () => {
    doControlDeviceData('lock_switch', Number(!deviceData.lock_switch));
  };

  return (
    <main className="home">
      {/* 顶部 */}
      <HeaderBlock deviceData={deviceData}></HeaderBlock>
      {/* 开/关按钮 */}
      <SwipeUnlock success={handleLock} resetClick={handleLock}></SwipeUnlock>
      <div className="content-wrap">
        {/* 设置按钮 */}
        <SettingBlock deviceData={deviceData} doControlDeviceData={doControlDeviceData}></SettingBlock>
        <footer className="footer">
          <Cell title="无感解锁" size="medium" onClick={() => {
            push(PATH.UNLOCK);
          }}></Cell>
          <Cell title="投保服务" size="medium" onClick={() => {}}></Cell>
        </footer>
      </div>
    </main>
  );
}
