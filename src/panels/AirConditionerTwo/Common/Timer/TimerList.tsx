import React from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';

export const TimerList = props => (
    <CloudTimerList
      {...props}
      renderLabel={item => `开关：${item.power_switch}`}
      defaultValue={{ power_switch: 0 }}
    />
);
