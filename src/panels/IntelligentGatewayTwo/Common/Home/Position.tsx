import React from 'react';
import { Icon } from '@custom/Icon';
export function Position(props) {
  const {
    deviceData: { battery_percentage },
    onLine = 0,
  } = props;
  return (
    <div className="position center">
      <div className="area">
        <div className="circular-outer center">
          <div className="circular-inner center">
            <div className="content v-center">
              <div className="num">{onLine}</div>
              <div className='dev'>在线设备</div>
              <Icon name="gateway" className="gateway-icon"></Icon>
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
