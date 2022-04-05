import React from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
const labelEnum = {
  power_switch: {
    label: '开关',
    value: ['关闭', '开启'],
  },
};

export const TimerAdd = (props) => {
  const {
    context: { power_switch = 0 },
    history: { PATH, push },
  } = props;
  return (
    <CloudTimerAdd labelEnum={labelEnum}  {...props}>
      <List.Item
        prefix={'开关'}
        extra={labelEnum.power_switch.value[power_switch]}
        onClick={() => push(PATH.TIMER_ACTION_SWITCH)}
      />
    </CloudTimerAdd>
  );
};
