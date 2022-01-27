/*
 * @Description: 设置页面
 */

import React, { useState } from 'react';
import { Block } from '@components/layout';
import { Cell } from '@components/base';
import { Dialog, Input } from 'antd-mobile';

export function Settings() {
  // 昵称
  const [deviceName, onEditDeviceName] = useState('');

  // 设备名称编辑框
  const deviceNameEditor = (
    <Input
      placeholder="请填写设备名称"
      value={deviceName}
      onChange={val => {
        onEditDeviceName(val);
      }}
    />
  );

  return (
    <main className="setting-wrap">
      <Block className="setting-block">
        <Cell
          title="设备名称"
          value={'设备名称'}
          valueStyle={'gray'}
          size="medium"
          onClick={() => {
            Dialog.confirm({
              title: '编辑设备名称',
              content: deviceNameEditor,
              cancelText: '取消',
              confirmText: '完成',
              onConfirm: () => {}
            });
          }}
        ></Cell>
        <Cell
          title="设备信息"
          value={'设备信息'}
          valueStyle={'gray'}
          size="medium"
        ></Cell>
        <Cell
          title="房间设置"
          value={'房间设置'}
          valueStyle={'gray'}
          size="medium"
        ></Cell>
        <Cell
          title="设备分享"
          value={'设备分享'}
          valueStyle={'gray'}
          size="medium"
        ></Cell>
        <Cell
          title="固件升级"
          value={'固件升级'}
          valueStyle={'gray'}
          size="medium"
        ></Cell>
      </Block>

      <Block className="setting-block delete-button">删除设备</Block>

      <Block className="setting-block">删除设备并清除数据</Block>
    </main>
  );
}
