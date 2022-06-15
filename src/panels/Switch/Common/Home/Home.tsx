import React, { useEffect } from 'react';
import { BizSwitch } from '@src/components/custom/BizSwitch/BizSwitch';
import { Detail } from './Detail';
import { DeviceDetail } from '@custom/DeviceDetail';

const allSwitch = [
  ['switch_1', '开关1'],
  ['switch_2', '开关2'],
  ['switch_3', '开关3'],
  ['switch_4', '开关4'],
  ['switch_5', '开关5'],
];

const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^switch/.test(v)).length || 1;

export function Home(props) {
  const {
    doControlDeviceData,
    templateMap,
    setContext,
    deviceData = {},
  } = props;
  const switchNum = getSwitchNum(templateMap);
  const currentSwitch = allSwitch.slice(0, switchNum);
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);
  useEffect(() => {
    setContext({ switchNum });
  }, []);
  return (
    <div className="home">
      <div className={`dashboard switch-${switchNum}`}>
        <DeviceDetail></DeviceDetail>
        {currentSwitch.map(([key, name], index) => (
          <BizSwitch
            key={key}
            name={name}
            value={!!deviceData[key]}
            className={`biz-switch-${index + 1}`}
            onChange={onChange.bind(null, key)}
          />
        ))}
      </div>
      <Detail {...props} currentSwitch={currentSwitch} />
    </div>
  );
}
