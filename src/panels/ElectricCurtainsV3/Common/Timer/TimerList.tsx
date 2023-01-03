import React from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';

export const TimerList = props => (
  <CloudTimerList
    {...props}
    renderLabel={item => `开关:${item.power_switch ? '开启' : '关闭'} 百分比控制:${
      item.position || 0
    }%`
    }
    defaultValue={{ power_switch: 0, position: 0 }}
  />
);
