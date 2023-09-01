import React, { useEffect } from 'react';
import { LightSwitch } from '../../Common/Home/LightSwitch';
import { Detail } from './Detail';
import { useSwitchNameMap } from '@src/panels/SwitchV3/hooks/useSwitchNameMap';

export const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^switch/.test(v)).length || 1;

export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {} } = props;
  const allSwitch = [
    ['switch_1', deviceData.name_button1 || '开关一'],
    ['switch_2', deviceData.name_button2 || '开关二'],
    ['switch_3', deviceData.name_button3 || '开关三'],
    ['switch_4', deviceData.name_button4 || '开关四'],
    ['switch_5', deviceData.name_button5 || '开关五'],
  ];

  const switchNum = getSwitchNum(templateMap);
  const currentSwitch = allSwitch.slice(0, switchNum);
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);

  useEffect(() => {
    setContext({ switchNum });
  }, []);

  const { data: switchNameMap = {} } = useSwitchNameMap({ switchNum, sdk: props.sdk });

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
    return <></>;
  };


  return (
    <div className="home">
      <div className={`dashboard switch-${switchNum}`}>
        {currentSwitch.map(([key], index) => (
          <LightSwitch
            key={key}
            hasCount={false}
            name={switchNameMap[`switch_${index + 1}`]}
            count={<Label name={`count_down${index + 1}`}></Label>}
            value={!!deviceData[key]}
            className={`light-switch-${index + 1}`}
            onChange={v => onChange(key, v)}
          />
        ))}
      </div>
      <Detail {...props} currentSwitch={currentSwitch} switchNum={switchNum} />
    </div>
  );
}
