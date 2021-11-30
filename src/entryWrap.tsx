import './styles/index.less';

import { UseDeviceInfoHandler, UserDeviceInfoData } from '@hooks/useDeviceInfo';

import React from 'react';
import ReactDOM from 'react-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

try {
  sdk.setTriggerVibrateShortFilter(property => property.define.type === 'bool' && property.id === 'power_switch');
} catch (err) {
  console.warn('setAutoTriggerVibrateShort fail', err);
}

export interface PanelComponentProps extends UserDeviceInfoData, UseDeviceInfoHandler {
  onGoTimingProject?: () => any;
  onGoDeviceDetail?: () => any;
  onGoCountDown?: () => any;
  onSwitchChange?: () => any;
}

export function entryWrap(Component) {
  function resize() {
    const docEle = window.document.documentElement;
    const windowWidth = docEle.getBoundingClientRect().width;

    if (windowWidth >= 640) {
      docEle.style.fontSize = '40px';
    } else {
      if (windowWidth <= 320) {
        docEle.style.fontSize = '20px';
      } else {
        docEle.style.fontSize = `${(windowWidth / 320) * 20}px`;
      }
    }
  }

  window.addEventListener('resize', resize);

  resize();

  ReactDOM.render(<Component/>, document.getElementById('app'));
}
