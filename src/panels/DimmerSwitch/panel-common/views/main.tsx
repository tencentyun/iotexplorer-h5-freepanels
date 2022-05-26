/*
 * @Author: wrq
 * @Date: 2021-10-23 16:36:37
 * @Description: 首页
 */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Block } from '@components/layout';
import { SvgIcon } from '@components/common';
import { Home } from './home';
import { Dimmer } from './dimmer';
import { DeviceSateContext } from '../deviceStateContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';
import './main.less';

export function Main() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const history = useHistory();
  const [state] = useDeviceData(sdk);
  const deviceData = state.deviceData || {};
  const [brightValue, setBrightValue] = useState(0);
  const [isOpen, onToggleIsOpen] = useState(false);

  useEffect(() => {
    setBrightValue(deviceData.bright_value / 100);
  }, [deviceData.bright_value]);

  const currentColor = (value: number) => {
    const status = value === 1 ? 'active' : 'default';
    const color = CurrentSkinProps[status];
    return color;
  };

  const handleSetting = () => {
    sdk.goDeviceDetailPage();
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div
          className={classNames(
            'dimmer-switch-main-view',
            { bright: brightValue > 0.3 },
            { dark: brightValue <= 0.3 },
          )}
        >
          <div className="settings" onClick={handleSetting}>
            <div className="icon-more"></div>
          </div>
          {!isOpen ? (
            <Home></Home>
          ) : (
            <Dimmer
              onClick={(value: boolean) => {
                if (!value) {
                  document.body.style.overflow = 'auto';
                }
                onToggleIsOpen(value);
              }}
              onChange={(value: number) => {
                setBrightValue(value);
              }}
            ></Dimmer>
          )}

          <div
            className={classNames(
              'control-buttons',
              deviceData.power_switch === 1 ? 'active' : '',
            )}
          >
            <Block className="button"
              onClick={() => {
                if (!deviceData.power_switch) return;
                history.push('/timing');
              }}>
              <SvgIcon
                className="icon-clock"
                name="icon-clock"
                {...currentColor(deviceData.power_switch).clock}
              />
              <p>定时</p>
            </Block>
            <Block
              className="button"
              onClick={() => {
                if (!deviceData.power_switch) return;
                if (!isOpen) {
                  document.body.style.overflow = 'hidden';
                  onToggleIsOpen(true);
                } else {
                  document.body.style.overflow = 'auto';
                  onToggleIsOpen(false);
                }
              }}
            >
              <SvgIcon
                className="icon-light"
                name="icon-light"
                {...currentColor(deviceData.power_switch).light}
              />
              <p>灯光</p>
            </Block>
            <Block
              className="button"
              onClick={() => {
                if (!deviceData.power_switch) return;
                history.replace('/setting');
              }}
            >
              <SvgIcon
                className="icon-setting"
                name="icon-setting"
                {...currentColor(deviceData.power_switch).settings}
              />
              <p>设置</p>
            </Block>
          </div>
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
}
