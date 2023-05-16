import React from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';
const labelEnum = {
  switch_led: {
    label: '开关',
    value: ['关闭', '开启'],
  },
};

const getSwitchNumData = (powerSwitch) => {
  const value = 1 * powerSwitch;
  const changeData = { switch_led: value };
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
