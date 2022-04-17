import React, { useState } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}
export function Position({
  deviceData: { battery_percentage },
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
          <Circular max={330} min={30} touch={true} value={(battery_percentage)  * 30 || 30} />
        </div>
      </div>
    </div>
  );
}
