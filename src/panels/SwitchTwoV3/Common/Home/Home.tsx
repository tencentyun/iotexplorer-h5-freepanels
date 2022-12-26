import React, { useEffect } from 'react';
import { LightSwitch } from './LightSwitch';
import { Detail } from './Detail';


const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^switch/.test(v)).length || 1;


export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {} } = props;

  const allSwitch = [
    ['switch_1', deviceData.name_button1 || '开关一'],
    ['switch_2', deviceData.name_button2 || '开关二'],
    ['switch_3', deviceData.name_button3 || '开关三'],
    ['switch_4', deviceData.name_button4 || '开关四'],
    ['switch_5', deviceData.name_button5 || '开关五'],
  ];

  const allMode = [
    ['mode_switch1', 'name_button1', deviceData.name_button1 || '开关一'],
    ['mode_switch2', 'name_button2', deviceData.name_button2 || '开关二'],
    ['mode_switch3', 'name_button3', deviceData.name_button3 || '开关三'],
    ['mode_switch4', 'name_button4', deviceData.name_button4 || '开关四'],
    ['mode_switch5', 'name_button5', deviceData.name_button5 || '开关五'],
  ];

  const switchNum = getSwitchNum(templateMap);
  const currentSwitch = allSwitch.slice(0, switchNum);
  const currentMode = allMode.slice(0, switchNum);
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);
  useEffect(() => {
    setContext({ switchNum });
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
      <div className={`dashboard switch-${switchNum}`}>
        <div className="operator">
          <div className="operator-btn editor">
          </div>
          <div className="operator-btn setting"></div>
        </div>
        <div className="light-list">
          {currentSwitch.map(([key, name], index) => (
            <LightSwitch
              key={key}
              hasCount={true}
              name={name}
              count={<Label name={`count_down${index + 1}`}></Label>}
              value={!!deviceData[key]}
              className={`light-switch-${index + 1}`}
              onChange={onChange.bind(null, key)}
            />
          ))}
        </div>
      </div>
      <Detail {...props} currentSwitch={currentSwitch} currentMode={currentMode} />
    </div>
  );
}
