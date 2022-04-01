import React, { useState } from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';
const labelEnum = {
  power_switch: {
    label: '总开关',
    value: ['关闭', '开启'],
  },
};

const getSwitchNumData = (powerSwitch, num) => {
  const value = 1 * powerSwitch;
  const changeData = { power_switch: value };
  for (let i = 0; i < num; i++) {
    changeData[`switch_${i + 1}`] = value;
  }
  return changeData;
};

export const TimerList = (props) => {
  const defaultValue = getSwitchNumData(0, props.context.switchNum);
  return <CloudTimerList {...props} labelEnum={labelEnum} defaultValue={defaultValue} />;
};
