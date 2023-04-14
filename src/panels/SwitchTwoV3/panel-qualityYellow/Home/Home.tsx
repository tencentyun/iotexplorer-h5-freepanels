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
  ['switch_5', 'mode_swtch5', 'name_button5'],
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
  const Label = ({ name }) => {
    const time = deviceData?.[name];
    if (time) {
      const hour = `${Math.floor(time / 3600)}`;
      const minute = `${Math.floor((time % 3600) / 60)}`;
      return <div>
        <div>
          <span>{hour}</span>
          h
          <span>{minute}</span>
          min
        </div>
        <div>
          后关闭
        </div>
      </div>;
    }
    return null;
  };
  return (
    <div className="home">
      <Tabs className={`custom-tabs + switch-${switchNum}-tab` }>
        {currentSwitch.map(([value, text], index) => (<Tabs.Tab title={deviceData[value.replace('switch_', 'name_button')] || text} key={index}>
            <div className={`dashboard switch-${switchNum}`}>
              <LightSwitch
                key={value}
                hasCount={true}
                name={text}
                count={<Label name={`count_down${index + 1}`}></Label>}
                value={!!deviceData[value]}
                className={`light-switch-${index + 1}`}
                onChange={onChange.bind(null, value)}
              />
            </div>
            <Detail {...props} currentSwitch={currentSwitch} currentIndex={index} currentItem={currentItem[index]} />
          </Tabs.Tab>))}
      </Tabs>
    </div>
  );
}
