import React from 'react';
import './MoreSetting.less';
import { List, Switch } from 'antd-mobile';
import { noop } from '@utillib';

export function MoreSetting() {
  return (
    <div className='page-more-setting'>
      <List header='基础设置'>
        <List.Item extra={<Switch defaultChecked />}>基础设置-1</List.Item>
      </List>
      <List header='其他设置' style={{ marginTop: 12 }}>
        <List.Item extra={'设置'} onClick={noop}>设置-2</List.Item>
        <List.Item extra={'设置'} onClick={noop}>设置-3</List.Item>
        <List.Item extra={'设置'} onClick={noop}>设置-4</List.Item>
      </List>
    </div>
  );
}
