import React, { useEffect } from 'react';
import { LightSwitch } from '../../Common/Home/LightSwitch';
import { Detail } from './Detail';
import { Tabs } from '@custom/Tabs';


const allSwitch = [
  ['switch_1', '开关一'],
  ['switch_2', '开关二'],
  ['switch_3', '开关三'],
  ['switch_4', '开关四'],
  ['switch_5', '开关五'],
];

const allItem = [
  ['switch_1', 'mode_swtch1', 'name_button1'],
  ['switch_2', 'mode_swtch2', 'name_button2'],
  ['switch_3', 'mode_swtch3', 'name_button3'],
  ['switch_4', 'mode_swtch4', 'name_button4'],
  ['switch_5', 'mode_swtch5', 'name_button5']
];

const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^switch/.test(v)).length || 1;

export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {} } = props;
  const switchNum = getSwitchNum(templateMap);
  const currentSwitch = allSwitch.slice(0, switchNum);
  const currentItem = allItem.slice(0, switchNum);
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);

  useEffect(() => {
    setContext({ switchNum });
    // setCurrentName(deviceData['name_button1'])
  }, []);
  return (
    <div className="home">
      <Tabs className="custom-tabs">
        {currentSwitch.map(([value, text], index) => {
          return (<Tabs.Tab title={deviceData[value.replace('switch_', 'name_button')] || text} key={index}>
            <div className={`dashboard switch-1`}>
              <LightSwitch
                key={value}
                name={text}
                value={!!deviceData[value]}
                className={`light-switch-${index + 1}`}
                onChange={onChange.bind(null, value)}
              />
            </div>
            <Detail {...props} currentSwitch={currentSwitch} currentIndex={index} currentItem={currentItem[index]} />
          </Tabs.Tab>);
        })}
      </Tabs>
    </div>
  );
}
