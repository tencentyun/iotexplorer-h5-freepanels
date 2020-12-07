import React, { useContext } from 'react';
import { CheckBox } from '@components/CheckBox';
import { RawBtn } from '@components/Btn';
import { LocatorPanelContext } from '../../LocatorPanelContext';

import './PositioningModeSelect.less';

export function PositioningModeSelect() {
  const { deviceData, doControlDeviceData } = useContext(LocatorPanelContext);
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
            doControlDeviceData('positioning_mode', option.value);
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
