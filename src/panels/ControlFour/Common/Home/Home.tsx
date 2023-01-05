import React, { useState, useEffect } from 'react';
import { LightSwitch } from './LightSwitch';
import { Detail } from './Detail';
import { Modal } from '@custom/Modal';
import { Icon } from '@custom/Icon';
import { Btn as Button, BtnGroup } from '@custom/Btn';


const allSwitch = [
  ['switch_1', '开关一'],
  ['switch_2', '开关二'],
  ['switch_3', '开关三'],
  ['switch_4', '开关四'],
  ['switch_5', '开关五'],
];

const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^switch/.test(v)).length || 1;

export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {} } = props;
  // const switchNum = getSwitchNum(templateMap);
  const switchNum = 3;
  const currentSwitch = allSwitch.slice(0, switchNum);
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);
  useEffect(() => {
    setContext({ switchNum });
    // setCurrentName(deviceData['name_button1'])
  }, []);
  return (
    <div className="home">
      <div className={`dashboard switch-${switchNum}`}>
        {currentSwitch.map(([key, name], index) => (
          <LightSwitch
            key={key}
            name={name}
            value={!!deviceData[key]}
            className={`light-switch-${index + 1}`}
            onChange={onChange.bind(null, key)}
          />
        ))}
      </div>
      <Detail {...props} currentSwitch={currentSwitch} />
    </div>
  );
}