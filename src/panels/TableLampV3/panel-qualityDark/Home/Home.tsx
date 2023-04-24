import React, { useState } from 'react';
import { Position } from '../../Common/Home/Position';
import LightBright from '../../Common/Home/LightBright';
import Action from './Action';
import { DeviceDetail } from '@custom/DeviceDetail';
import { getOptions } from '@utils';
import classNames from 'classnames';
const colorList = ['#F9D276', '#FCF0D2', '#FEFFFF', '#BDD0FA'];

export function Home(props) {
  const {
    templateMap,
    deviceData: { power_switch, color_mode = 1 },
    doControlDeviceData,
  } = props;
  const [showCountDown, setShowCountDown] = useState(false);
  const [countDown, setCountDown] = useState('00:00:00');
  return (
    <div className={`home ${!power_switch ? 'is-off' : ''}`}>
      <div className="custom-mask"></div>
      <DeviceDetail></DeviceDetail>
      <div className='content-bottom'>
        {showCountDown && <div className="count-down">
          <span>倒计时：</span>
          <span>{countDown}</span>
        </div>}
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
        <Action {...props} setCountDown={(value) => {
          if (value) {
            const hour = `${Math.floor(value / 3600)}`;
            const minute = `${Math.floor((value % 3600) / 60)}`;
            const second = `${Math.floor((value % 3600) % 60)}`;
            setCountDown(`${hour >= 10 ? hour : '0' + hour}:${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`)
          }
          setShowCountDown(true);
        }}></Action>
      </div>
    </div>
  );
}
