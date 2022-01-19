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
import { CurrentSkinProps } from '../skinProps';
import './main.less';

export function Main() {
  const history = useHistory();
  const [state] = useDeviceData(sdk);
  const deviceData = state.deviceData || {};
  const [brightValue, setBrightValue] = useState(0);
  const [isOpen, onToggleIsOpen] = useState(false);

  useEffect(() => {
    setBrightValue(deviceData.bright_value);
  }, [deviceData.bright_value]);

  const currentColor = (value: number) => {
    const status = value === 1 ? 'active' : 'default';
    const color = CurrentSkinProps[status];
    return color;
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div
          className={classNames(
            'dimmer-switch-main-view',
            brightValue > 0.3 ? 'bright' : ''
          )}
        >
          {!isOpen ? (
            <Home></Home>
          ) : (
            <Dimmer
              onClick={(value: boolean) => {
                onToggleIsOpen(value);
              }}
              onChange={(value: number) => {
                console.log(value, 'asdfasd');
                setBrightValue(value);
              }}
            ></Dimmer>
          )}

          <div
            className={classNames(
              'control-buttons',
              deviceData.power_switch === 1 ? 'active' : ''
            )}
          >
            <Block className="button" onClick={() => history.push('/timing')}>
              <SvgIcon
                name="icon-clock"
                {...currentColor(deviceData.power_switch).clock}
              />
              <p className="font_2">定时</p>
            </Block>
            <Block
              className="button"
              onClick={() => {
                onToggleIsOpen(!isOpen);
              }}
            >
              <SvgIcon
                name="icon-light"
                {...currentColor(deviceData.power_switch).light}
              />
              <p className="font_2">灯光</p>
            </Block>
            <Block
              className="button"
              onClick={() => history.replace('/setting')}
            >
              <SvgIcon
                name="icon-setting"
                {...currentColor(deviceData.power_switch).settings}
              />
              <p className="font_2">设置</p>
            </Block>
          </div>
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
}
