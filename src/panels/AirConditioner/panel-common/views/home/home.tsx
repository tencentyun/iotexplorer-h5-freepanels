import React from 'react';
import classNames from 'classnames';
import { DeviceSateContext } from '../../deviceStateContext';
import { ToolsBar } from './components/tools-bar';
import Device from './components/device/device';
import { Power } from './components/power/power';
import Environment from './components/environment/environment';
import { getThemeType } from '@libs/theme';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Home() {
  const themeType = getThemeType();

  const domPosition = () => {
    switch (themeType) {
      case 'normal':
        return [
          <ToolsBar key={'toolsBar'} />,
          <Power key={'power'} />,
          <Environment key={'environment'} />,
        ];
      case 'blueWhite':
      case 'dark':
      case 'colorful':
      case 'morandi':
        return [
          <Power key={'power'} />,
          <Environment key={'environment'} />,
          <ToolsBar key={'toolsBar'} />,
        ];
      default:
        return [
          <ToolsBar key={'toolsBar'} />,
          <Power key={'power'} />,
          <Environment key={'environment'} />,
        ];
    }
  };

  const handleBaseSetting = () => {
    sdk.goDeviceDetailPage();
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article
          className={classNames(
            'home',
            deviceData.power_switch !== 1 && 'power-off',
          )}
        >
          <div className="settings" onClick={handleBaseSetting}>
            <div className="icon-more"></div>
          </div>
          <Device />
          {domPosition()}
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
