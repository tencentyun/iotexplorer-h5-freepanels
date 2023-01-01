import React from 'react';
import { Position } from '../../Common/Home/Position';
import LightBright from '../../Common/Home/LightBright';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { getOptions } from '@utils';
import classNames from 'classnames';

const colorList = ['#FEFFFF', '#FCF0D2', '#BDD0FA', '#F9D276'];

export function Home(props) {
  const {
    templateMap,
    deviceData: { power_switch, color_mode = 1 },
    doControlDeviceData,
  } = props;
  return (
    <div className={`home ${!power_switch ? 'is-off' : ''}`}>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        <div className={classNames("change-panel")}>
          <Position {...props}></Position>
          <LightBright
            iconName="brightness"
            controlName="brightness"
            {...props}
          ></LightBright>
          <div className="mode-list">
            {getOptions(templateMap, 'color_mode').map(({ label, value }, index) => (
              <div
                key={index}
                className="mode-item"
                onClick={() => doControlDeviceData('color_mode', parseInt(value))}>
                <div className="item-color" style={{ background: `${colorList[index]}` }}></div>
                <div className="title">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <Action {...props}></Action>
      </div>
    </div>
  );
}
