import React from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';
const labelEnum = {
  power_switch: {
    label: '开关',
    value: ['关闭', '开启'],
  },
  mode: {
    label: '模式',
    value: ['离家模式', '循环模式', '入睡', '唤醒'],
  },
};

const getSwitchNumData = (powerSwitch) => {
  const value = 1 * powerSwitch;
  const changeData = { power_switch: value };
  return changeData;
};

export const TimerList = (props) => {
  const defaultValue = getSwitchNumData(0);
  return (
    <CloudTimerList
      {...props}
      labelEnum={labelEnum}
      defaultValue={defaultValue}
    />
  );
};
