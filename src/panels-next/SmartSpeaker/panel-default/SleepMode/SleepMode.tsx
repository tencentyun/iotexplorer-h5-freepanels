import React from 'react';
import './SleepMode.less';
import { List, Switch } from 'antd-mobile';
import { noop } from '@utillib';

export function SleepMode() {
  return (
    <div className='page-sleep-mode'>
      <List header='开启睡眠模式后音箱灯光会变暗，声音会变小'>
        <List.Item extra={<Switch defaultChecked />}>睡眠模式</List.Item>
      </List>
      <List style={{ marginTop: 12 }}>
        <List.Item extra={'22:00'} onClick={noop}>开始时间</List.Item>
        <List.Item extra={'06:00'} onClick={noop}>结束时间</List.Item>
        <List.Item extra={'周二、周三'} onClick={noop}>有效日</List.Item>
      </List>
    </div>
  );
}
