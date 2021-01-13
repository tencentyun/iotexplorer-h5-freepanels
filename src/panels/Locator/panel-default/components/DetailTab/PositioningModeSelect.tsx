import React, { useContext } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { CheckBox } from '@components/CheckBox';
import { RawBtn } from '@components/Btn';
import { LocatorPanelContext } from '../../LocatorPanelContext';

import './PositioningModeSelect.less';

export function PositioningModeSelect() {
  const { isDeviceOffline, deviceData, doControlDeviceData } = useContext(LocatorPanelContext);
  const onPositioningModeChange = (value) => {
    if (isDeviceOffline) {
      sdk.tips.showError('设备离线，无法更改定位模式');
    } else {
      doControlDeviceData('positioning_mode', value);
    }
  };

  const options = [
    { text: '省电模式', value: 0, },
    { text: '普通模式', value: 1, },
    { text: '性能模式', value: 2, },
  ];

  return (
    <div className="locator-positioning-mode-container">
      {options.map(option => (
        <RawBtn
          key={option.value}
          className="locator-positioning-mode-item"
          onClick={() => {
            if (deviceData.positioning_mode !== option.value) {
              onPositioningModeChange(option.value);
            }
          }}
        >
          <span>{option.text}</span>
          <span className="icon-right">
            <CheckBox
              value={deviceData.positioning_mode === option.value}
              type="radio"
            />
          </span>
        </RawBtn>
      ))}
    </div>
  );
}
