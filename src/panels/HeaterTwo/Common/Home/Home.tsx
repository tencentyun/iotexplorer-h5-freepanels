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
      <header>
        {/* 童锁 */}
        <div className="child-lock-status">{deviceData.child_lock ? '童锁开' : '童锁关'}</div>
        {/* 更多 */}
        <div className="more-btn" onClick={() => {
          push(PATH.SETTINGS);
        }}>
          <Icon name='more'></Icon>
        </div>
      </header>
      {/* 表盘 */}
      <div className="disk-wrap">
        <Disk
          // deviceData={deviceData}
          // doControlDeviceData={doControlDeviceData}
        ></Disk>
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
      <footer>
        <div className="footer-top">
          <div
            className="block-button-word"
            onClick={() => {
              push(PATH.RECORD);
            }}
          >
            <p className="button-value">智能模式</p>
            <p className="button-label">模式</p>
          </div>
          <div
            className="block-button-word"
            onClick={() => {
              push(PATH.SETTINGS);
            }}
          >
            <p className="button-value">自动</p>
            <p className="button-label">档位</p>
          </div>
          <div
            className="block-button-word"
            onClick={() => {
              push(PATH.SETTINGS);
            }}
          >
            <p className="button-value">未设置</p>
            <p className="button-label">定时</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div
            className="rectangle-button"
            onClick={() => {
              push(PATH.RECORD);
            }}
          >
            <Switch></Switch>
            <p className="button-name">儿童锁</p>
          </div>
          <div
            className="rectangle-button"
            onClick={() => {
              push(PATH.RECORD);
            }}
          >
            <Icon name="switch"/>
            <p className="button-name">开关</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
