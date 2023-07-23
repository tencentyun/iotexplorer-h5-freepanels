import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import classNames from 'classnames';
export function Position(props) {
  const {
    deviceInfo,
    sdk
  } = props;

  const text = deviceInfo?.AliasName || deviceInfo?.DeviceName || '智能网关';
  const [status, setStatus] = useState(deviceInfo?.Online);

  const subText = status ? '在线' : '离线';
  const clsName = status ? 'open' : 'close';




  const handleWsStatusChange = ({ deviceId: deviceIdFromEvent, deviceStatus }: {
    deviceId: string;
    deviceStatus: number;
  }) => {
    if (deviceIdFromEvent === deviceInfo.DeviceId) {
      setStatus(deviceStatus);
    }
  };

  useEffect(() => {
    sdk.on('wsStatusChange', handleWsStatusChange);
    return () => {
      sdk.off('wsStatusChange', handleWsStatusChange);
    };
  }, [])


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
