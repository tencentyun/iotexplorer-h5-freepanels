/*
 * @Description: 取暖器-设置页面
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { InputDialog } from './InputDialog';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Settings({
  deviceData,
  deviceInfo,
  doControlDeviceData,
  history: { PATH, push },
}) {
  const [aliasName, setAliasName] = useState(deviceInfo.AliasName || '');
  const [nameEditVisible, setNameEdit] = useState(false);

  return (
    <main className="settings-wrap">
      <Cell
        className="cell-settings"
        title="设备名称"
        value={aliasName}
        valueStyle="set"
        onClick={() => {
          setNameEdit(true);
        }}
      >
        <InputDialog
          visible={nameEditVisible}
          title="编辑名称"
          placeholder="请输入设备名称"
          defaultValue={aliasName}
          max={10}
          onCancel={() => {
            setNameEdit(false);
          }}
          onConfirm={(value) => {
            setAliasName(value);
            sdk.requestTokenApi('AppUpdateDeviceInFamily', {
              Action: 'AppUpdateDeviceInFamily',
              ProductId: deviceInfo.ProductId,
              DeviceName: deviceInfo.DeviceName,
              AliasName: value,
            });
          }}
        ></InputDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="设备信息"
        onClick={() => {
          sdk.goDeviceDetailPage();
        }}
      ></Cell>
      <Cell
        className="cell-settings"
        title="房间信息"
        onClick={() => {
          sdk.goDeviceDetailPage();
        }}
      ></Cell>
      <Cell
        className="cell-settings"
        title="设备分享"
        onClick={() => {
          sdk.goDeviceDetailPage();
        }}
      ></Cell>
      <Cell
        className="cell-settings"
        title="固件升级"
        onClick={() => {
          sdk.goDeviceDetailPage();
        }}
      ></Cell>
      <Cell
        className="cell-settings mt"
        title="温标切换"
        size="medium"
        isLink={false}
      >
        <div className="unit-convert">
          <div
            className={classNames('unit-btn', { active: deviceData.temp_unit_convert === 'celsius' })}
            onClick={() => {
              doControlDeviceData('temp_unit_convert', 'celsius');
            }}
          >°C</div>
          <div
            className={classNames('unit-btn', { active: deviceData.temp_unit_convert === 'fahrenheit' })}
            onClick={() => {
              doControlDeviceData('temp_unit_convert', 'fahrenheit');
            }}
          >°F</div>
        </div>
      </Cell>
      <Cell
        className="cell-settings mt"
        title="云端定时"
        onClick={() => {
          push(PATH.TIMER_LIST);
        }}
      ></Cell>
      <Cell
        className="cell-settings mt"
        title="童锁开关"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.child_lock === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('child_lock', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="摇头"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.swing === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('swing', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="负离子"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.anion === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('anion', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="灯光"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.light === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('light', Number(value));
            }}
          />
        }
      ></Cell>
      <footer className="footer">
        <div className="footer-button" onClick={() => {
          sdk.deleteDevice({ deviceId: deviceInfo.DeviceId });
        }}>
          移除设备
        </div>
      </footer>
    </main>
  );
}
