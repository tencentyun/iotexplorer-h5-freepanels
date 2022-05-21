import React from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';

export const TimerList = props => (
  <CloudTimerList
    {...props}
    renderLabel={item => `电源开关:${item.power_switch ? '开启' : '关闭'} 百分比控制:${
      item.percent_control || 0
    }%`
    }
    defaultValue={{ power_switch: 0, percent_control: 0 }}
  />
);
