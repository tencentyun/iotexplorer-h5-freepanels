import React from 'react';
import { Input } from '@custom/Input';

const defaultValue = {
  local: [['开关1', 'switch_1'], ['开关2', 'switch_2'], ['开关3', 'switch_3']],
  infinite: [
    ['无限开关1', 'infinite_switch_1'],
    ['无限开关2', 'infinite_switch_2'],
    ['无限开关3', 'infinite_switch_3'],
    ['无限开关4', 'infinite_switch_4'],
    ['无限开关5', 'infinite_switch_5'],
    ['无限开关6', 'infinite_switch_6']
  ]
};

function Switch(props) {
  const { doControlDeviceData, deviceData } = { ...props };
  return (
    <div className="switch-list-panel">
      <div className="switch-group">
        <span className="title">本地开关</span>
        {defaultValue.local.map(([value, key], index) => <Input
          key={index}
          className="custom-input"
          placeholder='请输入'
          defaultValue={value}
          clearable
          onBlur={(e) => {
            const v = e.currentTarget.value;
            doControlDeviceData(key, v);
          }} />)}
      </div>
      <div className="switch-group">
        <span className="title">无线开关</span>
        {defaultValue.infinite.map(([value, key], index) => <Input
          key={index}
          className="custom-input"
          placeholder='请输入'
          defaultValue={value}
          clearable
          onBlur={(e) => {
            const v = e.currentTarget.value;
            doControlDeviceData(key, v);
          }} />)}
      </div>
    </div>
  );
}

export default Switch;