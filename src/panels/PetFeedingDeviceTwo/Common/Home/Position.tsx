import React, { useState } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { Icon } from '@custom/Icon';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}
export function Position({
  deviceData: { battery_percentage },
  doControlDeviceData,
}) {
  return (
    <div className="position_card">
      <div className="main-bg center">
        <div className="circle-ring">
          <div className="bg">
            <div
              className="circle outer center"
            >
              <div className="circle inner"></div>
            </div>
            <div className="bg-img center">

            </div>
          </div>
          <Circular value={battery_percentage  * 36 || 0} />
        </div>
      </div>
    </div>
  );
}
