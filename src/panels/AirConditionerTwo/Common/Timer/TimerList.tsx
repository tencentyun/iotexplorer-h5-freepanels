import React, { useState } from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';

export const TimerList = props => (
  <CloudTimerList
    {...props}
    renderLabel={item => `喂食份数：${item.manual_feed}`}
    defaultValue={{ manual_feed: 0 }}
  />
);
