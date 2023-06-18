import React, { useEffect } from 'react';
import { Detail } from './Detail';
import { Tabs } from '@custom/Tabs';
import { SceneBind, SceneSetting, SceneList } from '@custom/Scene';

// const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^switch/.test(v)).length || 1;


export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {}, switchNum } = props;
  const allSwitch = [
    ['switch_1', deviceData.name_button1 || '开关一'],
    ['switch_2', deviceData.name_button2 || '开关二'],
    ['switch_3', deviceData.name_button3 || '开关三'],
    ['switch_4', deviceData.name_button4 || '开关四'],
    ['switch_5', deviceData.name_button5 || '开关五'],
  ];

  // const switchNum = getSwitchNum(templateMap) / 3;
  const currentSwitch = allSwitch.slice(0, switchNum);
  console.log(templateMap, switchNum, currentSwitch)

  return (
    <div className="wireless-switch-home">
      {currentSwitch.length === 1 ? <>
        <Detail index={switchNum} currentSwitch={currentSwitch} {...props} />
      </> : <Tabs>
        {currentSwitch.map(([value, title], index) => <Tabs.Tab key={value} title={title}>
          <Detail index={index + 1} currentSwitch={currentSwitch} {...props} switchNum={switchNum} />
        </Tabs.Tab>)}
      </Tabs>}
    </div>
  );
}
