import React from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
const labelEnum = {
  switch_led: {
    label: '开关',
    value: ['关闭', '开启'],
  },
};

export const TimerAdd = (props) => {
  const {
    context: { switch_led = 0 },
    history: { PATH, push },
  } = props;
  return (
    <CloudTimerAdd labelEnum={labelEnum}  {...props}>
      <List.Item
        prefix={'开关'}
        extra={labelEnum.switch_led.value[switch_led]}
        onClick={() => push(PATH.TIMER_ACTION_SWITCH)}
      />
    </CloudTimerAdd>
  );
};
