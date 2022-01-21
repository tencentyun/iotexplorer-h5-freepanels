/*
 * @Description: 温控器设置
 */

import React from 'react';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { SvgIcon } from '@components/common';
// 模版数据
import { DeviceContext } from '../deviceContext';
// 接口，处理属性更改
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { toggleBooleanByNumber } from '@libs/utillib';
import { CurrentSkinProps } from '../skinProps';

const themeType = getThemeType();

export function Settings() {
  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="thermostat-setting">
          <Block className="setting-block">
            <Cell
              title="童锁"
              prefixIcon={
                <span className="icon-child-lock"></span>
                // <SvgIcon className="svg-icon" name="icon-child-lock" {...CurrentSkinProps.lock}/>
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="childLock"
                  theme={themeType}
                  checked={toggleBooleanByNumber(deviceData.child_lock)}
                  onChange={(val: boolean) => {
                    onControlDevice('child_lock', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="负离子"
              prefixIcon={
                <SvgIcon
                  className="svg-icon"
                  name="icon-anion"
                  {...CurrentSkinProps.anion}
                />
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="anion"
                  theme={themeType}
                  checked={toggleBooleanByNumber(deviceData.anion)}
                  onChange={(val: boolean) => {
                    onControlDevice('anion', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="灯光"
              prefixIcon={
                <SvgIcon
                  className="svg-icon"
                  name="icon-lamplight"
                  {...CurrentSkinProps.lamplight}
                />
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="light"
                  theme={themeType}
                  checked={Boolean(deviceData['light'])}
                  onChange={(val: boolean) => {
                    onControlDevice('light', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="声音"
              prefixIcon={
                <SvgIcon
                  className="svg-icon"
                  name="icon-sound"
                  {...CurrentSkinProps.sound}
                />
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="sound"
                  theme={themeType}
                  checked={Boolean(deviceData['sound'])}
                  onChange={(val: boolean) => {
                    onControlDevice('sound', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="ECO模式"
              prefixIcon={
                <SvgIcon
                  className="svg-icon"
                  name="icon-eco"
                  {...CurrentSkinProps.eco}
                />
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="eco"
                  theme={themeType}
                  checked={Boolean(deviceData['eco'])}
                  onChange={(val: boolean) => {
                    onControlDevice('eco', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="开窗检测"
              prefixIcon={
                <SvgIcon
                  className="svg-icon"
                  name="icon-window-ins"
                  {...CurrentSkinProps.window}
                />
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="window"
                  theme={themeType}
                  checked={Boolean(deviceData['window_check'])}
                  onChange={(val: boolean) => {
                    onControlDevice('window_check', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="睡眠功能"
              prefixIcon={
                <SvgIcon
                  className="svg-icon"
                  name="icon-sleep-fun"
                  {...CurrentSkinProps.sleep}
                />
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="sleep"
                  theme={themeType}
                  checked={Boolean(deviceData['sleep'])}
                  onChange={(val: boolean) => {
                    onControlDevice('sleep', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="防霜冻功能"
              prefixIcon={
                <SvgIcon
                  className="svg-icon"
                  name="icon-anti-frost"
                  {...CurrentSkinProps.frost}
                />
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="frost"
                  theme={themeType}
                  checked={Boolean(deviceData['frost'])}
                  onChange={(val: boolean) => {
                    onControlDevice('frost', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <Cell
              title="阀门检测"
              prefixIcon={
                <SvgIcon
                  className="svg-icon"
                  name="icon-valve-ins"
                  {...CurrentSkinProps.frost}
                />
              }
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="valve"
                  theme={themeType}
                  checked={Boolean(deviceData['valve_check'])}
                  onChange={(val: boolean) => {
                    onControlDevice('valve_check', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
          <Block className="setting-block">
            <div>
              <SvgIcon
                className="svg-icon"
                name="icon-heart-unit-convert"
                {...CurrentSkinProps.unit}
              />
              <span className="unit-convert-label">温标切换</span>
            </div>
            <div className="temp-btn-wrap">
              <div
                className={classNames(
                  'temp-btn',
                  deviceData.temp_unit_convert === 0 ? 'selected' : ''
                )}
                onClick={() => {
                  onControlDevice('temp_unit_convert', 0);
                }}
              >
                &#176;C
              </div>
              <div
                className={classNames(
                  'temp-btn',
                  deviceData.temp_unit_convert === 1 ? 'selected' : ''
                )}
                onClick={() => {
                  onControlDevice('temp_unit_convert', 1);
                }}
              >
                &#176;F
              </div>
            </div>
          </Block>
        </main>
      )}
    </DeviceContext.Consumer>
  );
}