import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { toggleBooleanByNumber } from '@libs/utillib';
import { Dialog, Input } from 'antd-mobile';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
// 模版数据
import { DeviceContext } from '../deviceContext';
// 接口，处理属性更改
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { SvgIcon } from '@components/common';
import { SkinProps } from '../skinProps';
import './details.less';

export function Details() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const history = useHistory();
  const { ProductId, DeviceId, FamilyId, DeviceName } = sdk.deviceInfo;
  const [aliasName, setAliasName] = useState('');
  useEffect(() => {
    // 获取设备别名
    const getAliasName = async () => {
      try {
        const info = await sdk.requestTokenApi('AppGetDeviceInFamily', {
          Action: 'AppGetDeviceInFamily',
          ProductId,
          DeviceName,
          FamilyId,
        });
        setAliasName(info.Data.AliasName);
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getAliasName();
  }, []);
  // 删除设备
  const deleteDevice = () => {
    sdk.deleteDevice({ deviceId: DeviceId });
  };
  let deviceName = '';
  const nameEditor = (
    <Input
      defaultValue={aliasName}
      placeholder="请填写名称"
      onChange={(val) => {
        deviceName = val;
      }}
    />
  );
  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <div className="details-wrap">
          {/* 基本信息 */}
          <Block className="setting-block basic-info-block">
            <div className="basic-info">
              <div className="left">
                <SvgIcon
                  className="warmth"
                  name="icon-heater-warmth"
                  {...CurrentSkinProps.warmth}
                ></SvgIcon>
                <p>{aliasName || '取暖器'}</p>
              </div>
              <div
                className="right"
                onClick={() => {
                  Dialog.confirm({
                    title: '编辑名称',
                    content: nameEditor,
                    cancelText: '取消',
                    confirmText: '完成',
                    onConfirm: () => {
                      setAliasName(deviceName);
                      sdk.requestTokenApi('AppUpdateDeviceInFamily', {
                        Action: 'AppUpdateDeviceInFamily',
                        ProductId,
                        DeviceName,
                        AliasName: deviceName,
                      });
                    },
                  });
                }}
              >
                <SvgIcon
                  className="edit"
                  name="icon-edit"
                  {...CurrentSkinProps.edit}
                ></SvgIcon>
              </div>
            </div>
            <Cell
              title="设备信息"
              valueStyle={'gray'}
              size="medium"
              isLink={true}
              onClick={() => {
                sdk.showDeviceDetail();
              }}
            ></Cell>
            <Cell
              title="房间信息"
              valueStyle={'gray'}
              size="medium"
              isLink={true}
              onClick={() => {
                sdk.showDeviceDetail();
              }}
            ></Cell>
            <Cell
              title="设备分享"
              valueStyle={'gray'}
              size="medium"
              isLink={true}
              onClick={() => {
                sdk.showDeviceDetail();
              }}
            ></Cell>
            <Cell
              title="固件升级"
              valueStyle={'gray'}
              size="medium"
              isLink={true}
              onClick={() => {
                sdk.showDeviceDetail();
              }}
            ></Cell>
          </Block>
          {/* 云端定时 */}
          <Block className="setting-block">
            <Cell
              title="云端定时"
              valueStyle={'gray'}
              size="medium"
              isLink={true}
              onClick={() => {
                history.push('/timing');
              }}
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="童锁"
              valueStyle={'gray'}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="mode"
                  theme={themeType}
                  checked={
                    deviceData.child_lock
                      ? toggleBooleanByNumber(deviceData.child_lock)
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('child_lock', Number(val));
                  }}
                />
              }
            ></Cell>
            <Cell
              title="摇头"
              valueStyle={'gray'}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="mode"
                  theme={themeType}
                  checked={
                    deviceData.swing
                      ? toggleBooleanByNumber(deviceData.swing)
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('swing', Number(val));
                  }}
                />
              }
            ></Cell>
            <Cell
              title="负离子"
              valueStyle={'gray'}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="mode"
                  theme={themeType}
                  checked={
                    deviceData.anion
                      ? toggleBooleanByNumber(deviceData.anion)
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('anion', Number(val));
                  }}
                />
              }
            ></Cell>
            <Cell
              title="灯光"
              valueStyle={'gray'}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="mode"
                  theme={themeType}
                  checked={deviceData.light ? Boolean(deviceData.light) : false}
                  onChange={(val: boolean) => {
                    onControlDevice('light', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          {/* 温标切换 */}
          <Block className="unit-convert-block">
            <div className="label">
              <SvgIcon
                className="unit-convert"
                name="icon-heart-unit-convert"
                {...CurrentSkinProps.unit}
              ></SvgIcon>
              温标切换
            </div>
            <div className="temp-btn-wrap">
              <div
                className={classNames(
                  'temp-btn',
                  deviceData.unit_convert === 0 ? 'selected' : '',
                )}
                onClick={() => {
                  onControlDevice('unit_convert', 0);
                }}
              >
                &#176;C
              </div>
              <div
                className={classNames(
                  'temp-btn',
                  deviceData.unit_convert === 1 ? 'selected' : '',
                )}
                onClick={() => {
                  onControlDevice('unit_convert', 1);
                }}
              >
                &#176;F
              </div>
            </div>
          </Block>
          {/* 移除设备 */}
          <section className="card-wrap">
            <div className="remove" onClick={deleteDevice}>
              移除设备
            </div>
          </section>
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
