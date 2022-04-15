import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { Switch } from '@custom//Switch';
import { Disk } from './Disk';

export function Home({
  deviceData,
  doControlDeviceData,
  history: { PATH, push },
}) {
  return (
    <main className="home">
      {/* 顶部 */}
      <div>
        <div className="image"></div>
      </div>

      {/* 表盘控制区 */}
      <div className="control-wrap">
        <div className="minus-btn">
          <Icon name="minus"></Icon>
        </div>
        <div className="plus-btn">
          <Icon name="plus"></Icon>
        </div>
      </div>

      {/* 设置按钮 */}
      <div className="setting-button-wrap">
        <div
          className="block-button-icon"
          onClick={() => {
            push(PATH.RECORD);
          }}
        >
          <Icon name="mode"/>
          <p className="button-name">模式</p>
        </div>
        <div
          className="block-button-icon"
          onClick={() => {
            push(PATH.SETTINGS);
          }}
        >
          <Icon name="gear"/>
          <p className="button-name">风速</p>
        </div>
        <div
          className="block-button-icon"
          onClick={() => {
            push(PATH.SETTINGS);
          }}
        >
          <Icon name="settings"/>
          <p className="button-name">设置</p>
        </div>
      </div>
      {/* 设置按钮 */}
      <footer>
        <div className="control-wrap">
          <div className="control-btn">
            <Icon name="minus"></Icon>
          </div>
          <div className="control-btn">
            <Icon name="switch"></Icon>
          </div>
          <div className="control-btn">
            <Icon name="plus"></Icon>
          </div>
        </div>
      </footer>
    </main>
  );
}
