import React, {useState} from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Dialog, Input } from 'antd-mobile';
import classNames from 'classnames';
import { Cell, Switch } from '@components/base';
import { getThemeType } from '@libs/theme';
import { toggleBooleanByNumber } from '@libs/utillib';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './setting.less';

export function Setting() {
  const themeType = getThemeType();
  // 2.4G
  const [nameTwoFour, onEditNameTwoFour] = useState('');
  const nameTwoFourEditor = (
    <Input
      placeholder="请输入名称"
      value={nameTwoFour}
      onChange={val => {
        onEditNameTwoFour(val);
        apiControlDeviceData({ name_24g: val });
      }}
    />
  );
  const [pwdTwoFour, onEditPwdTwoFour] = useState('');
  const pwdTwoFourEditor = (
    <Input
      placeholder="请输入密码"
      value={pwdTwoFour}
      onChange={val => {
        onEditPwdTwoFour(val);
        apiControlDeviceData({ sta_config_24g: val });
      }}
    />
  );
  // 5G
  const [nameFive, onEditNameFive] = useState('');
  const nameFiveEditor = (
    <Input
      placeholder="请输入名称"
      value={nameFive}
      onChange={val => {
        onEditNameFive(val);
        apiControlDeviceData({ name_24g: val });
      }}
    />
  );
  const [pwdFive, onEditPwdFive] = useState('');
  const pwdFiveEditor = (
    <Input
      placeholder="请输入密码"
      value={pwdFive}
      onChange={val => {
        onEditPwdFive(val);
        apiControlDeviceData({ sta_config_24g: val });
      }}
    />
  );
  return (
    <article className={classNames('setting')}>
      <ul className="setting-list">
        <li className="list-item">
          <div className="item-title">2.4G Wi-Fi</div>
          <Cell
            size="medium"
            title="Wi-Fi开关"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_24g ? sdk.deviceData.switch_24g : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_24g: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="Wi-Fi名称"
            value={sdk.deviceData.name_24g}
            valueStyle="gray"
            onClick={() => {
              Dialog.confirm({
                title: '设置2.4G Wi-Fi名称',
                content: nameTwoFourEditor,
                cancelText: '取消',
                confirmText: '完成',
                onConfirm: () => {}
              });
            }}
          />
          <Cell
            size="medium"
            title="Wi-Fi密码"
            value={sdk.deviceData.sta_config_24g}
            valueStyle="gray"
            onClick={() => {
              Dialog.confirm({
                title: '设置2.4G Wi-Fi密码',
                content: pwdTwoFourEditor,
                cancelText: '取消',
                confirmText: '完成',
                onConfirm: () => {}
              });
            }}
          />
        </li>
        <li className="list-item">
          <div className="item-title">5G Wi-Fi</div>
          <Cell
            size="medium"
            title="Wi-Fi开关"
            isLink={false}
            value={
              <Switch
                name={''}
                theme={themeType}
                checked={toggleBooleanByNumber(
                  sdk.deviceData.switch_5g ? sdk.deviceData.switch_5g : 0
                )}
                onChange={(value: boolean) => {
                  apiControlDeviceData({ switch_5g: value ? 1 : 0 });
                }}
              />
            }
            valueStyle="gray"
          />
          <Cell
            size="medium"
            title="Wi-Fi名称"
            value={sdk.deviceData.name_5g}
            valueStyle="gray"
            onClick={() => {
              Dialog.confirm({
                title: '设置密码',
                content: nameFiveEditor,
                cancelText: '取消',
                confirmText: '完成',
                onConfirm: () => {}
              });
            }}
          />
          <Cell
            size="medium"
            title="Wi-Fi密码"
            value={sdk.deviceData.sta_config_5g}
            valueStyle="gray"
            onClick={() => {
              Dialog.confirm({
                title: '设置密码',
                content: pwdFiveEditor,
                cancelText: '取消',
                confirmText: '完成',
                onConfirm: () => {}
              });
            }}
          />
        </li>
      </ul>
    </article>
  );
}
