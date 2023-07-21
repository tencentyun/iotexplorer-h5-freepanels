import React from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';
export function Position(props) {
  const {
    deviceInfo,
    deviceData,
    doControlDeviceData
  } = props;
  const text = deviceInfo?.DeviceName || deviceInfo?.AliasName || '智能网关';
  const subText = deviceInfo?.Online ? '在线' : '离线';
  const clsName = deviceInfo?.Online ? 'open' : 'close';
  return (
    // <div className="position center" onClick={() => { doControlDeviceData('guard_mode', !deviceData?.guard_mode) }}>
    <div className="position center">
      <div className={classNames('area', clsName)}>
        <div className="circular-outer center">
          <div className="circular-inner center">
            <div className="content v-center">
              <Icon name="gateway" className="gateway-icon"></Icon>
              <div className="text">{text}</div>
              <div className='sub-text'>{subText}</div>
            </div>
          </div>
        </div>
        <div className="layer">
          <div className="dot1" />
          <div className="dot2" />
          <div className="dot3" />
          <div className="dot4" />
          <div className="dot5" />
        </div>
      </div>
    </div>
  );
}
