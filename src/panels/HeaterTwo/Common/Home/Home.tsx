import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { Switch } from '@custom//Switch';
import { Disk } from './Disk';

export function Home({
  deviceData,
  doControlDeviceData,
  history: { PATH, push }
}) {
  const [isOn, setPowerOn] = useState(false);
  const [recordTime, setRecordTime] = useState('');
  const [recordStatus, setRecordStatus] = useState('');

  return (
    <main className="home">
      {/* 顶部 */}
      <header>
        {/* 童锁 */}
        <h3>{deviceData.child_lock ? '童锁开' : '童锁关'}</h3>
        {/* 更多 */}
        <Icon name='more'></Icon>
      </header>
      {/* 表盘 */}
      <Disk
        deviceData={deviceData}
        doControlDeviceData={doControlDeviceData}
      ></Disk>
      {/* 设置按钮 */}
      <footer>
        <div className="footer-top">
          <div
            className="block-button-word"
            onClick={()=>{push(PATH.RECORD)}}
          >
            <p className="button-value">智能模式</p>
            <p className="button-label">模式</p>
          </div>
          <div
            className="block-button-word"
            onClick={()=>{push(PATH.SETTINGS)}}
          >
            <p className="button-value">自动</p>
            <p className="button-label">档位</p>
          </div>
          <div
            className="block-button-word"
            onClick={()=>{push(PATH.SETTINGS)}}
          >
            <p className="button-value">未设置</p>
            <p className="button-label">定时</p>
          </div>
        </div>
        <div>
          <div
            className="setting-button"
            onClick={()=>{push(PATH.RECORD)}}
          >
            <Switch></Switch>
            <p className="button-name">儿童锁</p>
          </div>
          <div
            className="setting-button"
            onClick={()=>{push(PATH.RECORD)}}
          >
            <Icon name="record"/>
            <p className="button-name">开关</p>
          </div>
        </div>
      </footer>
    </main>
  );
}