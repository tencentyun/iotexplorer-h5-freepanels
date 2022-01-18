import React, {useState} from 'react';
import { Dialog, Input } from 'antd-mobile';
import classNames from 'classnames';
import { Cell } from '@components/base';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './phoneList.less';

import PhoneImage from "../icons/normal/phone-icon.svg";
import PhoneImageMorandi from "../icons/morandi/phone-icon.svg";

export function PhoneList() {
  const themeType = getThemeType();
  const phoneImageSrc = () => {
    switch (themeType) {
      case 'morandi':
        return PhoneImageMorandi;
      default:
        return PhoneImage;
    }
  };
  // 密码
  const [password, onEditPassword] = useState('');
  const passwordEditor = (
    <Input
      placeholder="请输入密码"
      value={password}
      onChange={val => {
        onEditPassword(val);
        apiControlDeviceData({ password: val });
      }}
    />
  );
  // 报警电话号码
  const [callNumber, onEditCallNumber] = useState('');
  const callNumberEditor = (
    <Input
      placeholder="请输入报警电话号码"
      value={callNumber}
      onChange={val => {
        onEditCallNumber(val);
        apiControlDeviceData({ alarm_call_number: val });
      }}
    />
  );
  // 报警短信号码
  const [smsNumber, onEditSmsNumber] = useState('');
  const smsNumberEditor = (
    <Input
      placeholder="请输入报警短信号码"
      value={smsNumber}
      onChange={val => {
        onEditSmsNumber(val);
        console.log(val);
      }}
    />
  );
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url} onClick={delPhone}></img>
  );
  const delPhone = () => {
    Dialog.confirm({
      title: '删除电话号码',
      content: '确认删除该号码？',
      cancelText: '取消',
      confirmText: '完成',
      onConfirm: () => {}
    });
  };
  return (
    <article className={classNames('phone-list')}>
      <ul>
        <li className="list-item">
          <Cell
            size="medium"
            title="报警电话号码"
            prefixIcon={cellIcon(phoneImageSrc())}
            value=""
            valueStyle="gray"
            onClick={() => {
              Dialog.confirm({
                title: '修改电话号码',
                content: callNumberEditor,
                cancelText: '取消',
                confirmText: '完成',
                onConfirm: () => {}
              });
            }}
          />
        </li>
        <li className="list-item">
          <Cell
            size="medium"
            title="报警电话号码"
            prefixIcon={cellIcon(phoneImageSrc())}
            value=""
            valueStyle="gray"
            onClick={() => {
              Dialog.confirm({
                title: '修改电话号码',
                content: callNumberEditor,
                cancelText: '取消',
                confirmText: '完成',
                onConfirm: () => {}
              });
            }}
          />
        </li>
        <li className="list-item">
          <Cell
            size="medium"
            title="报警电话号码"
            value=""
            prefixIcon={cellIcon(phoneImageSrc())}
            valueStyle="gray"
            onClick={() => {
              Dialog.confirm({
                title: '修改电话号码',
                content: callNumberEditor,
                cancelText: '取消',
                confirmText: '完成',
                onConfirm: () => {}
              });
            }}
          />
        </li>
      </ul>
      <div
        className="add-phone"
        onClick={() => {
          Dialog.confirm({
            title: '输入电话号码',
            content: callNumberEditor,
            cancelText: '取消',
            confirmText: '完成',
            onConfirm: () => {}
          });
        }}
      >
        添加电话号码
      </div>
    </article>
  );
}
