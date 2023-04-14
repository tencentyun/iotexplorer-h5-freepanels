import React from 'react';
import { Position } from './Position';
import LightBright from './LightBright';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';

export function Home(props) {
  return (
    <div className={`home`}>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        <div className="change-panel">
          <Position {...props}></Position>
          <LightBright
            iconName="brightness"
            controlName="bright_value"
            {...props}
          ></LightBright>
        </div>
        <Action {...props}></Action>
      </div>
    </div>
  );
}
