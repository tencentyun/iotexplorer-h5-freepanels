/*
 * @Author: wrq
 * @Date: 2021-10-23 17:07:50
 * @Description: 首页
 */
import React from 'react';
import classNames from 'classnames';
import { DeviceSateContext } from '../deviceStateContext';
import { onControlDevice } from '@hooks/useDeviceData';
import './home.less';

export function Home() {
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div className="home-view">
          <img
            className={classNames(
              'lamp-icon',
              deviceData.power_switch === 1 ? 'open' : 'close',
            )}
            src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/light/light.png"
            onClick={() => {
              onControlDevice('power_switch', Number(!deviceData.power_switch));
            }}
          ></img>

          <div className="switch-button font_line_3">
            {deviceData.power_switch === 1
              ? `亮度: ${parseInt(deviceData.bright_value ? deviceData.bright_value.toString() : '0')}%`
              : '轻触开启'}
          </div>
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
}
