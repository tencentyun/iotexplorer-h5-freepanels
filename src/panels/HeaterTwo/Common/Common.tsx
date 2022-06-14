import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Settings } from './Settings';
import { TimerList, TimerAdd, MainSwitch, Repeat } from './Timer';
const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/settings', Component: Settings },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
  ];
  // TODO 当前产品的设计配置 与查看设备冲突--等UCD设计完成后调整
  return <Router route={route} detail={false} />;
};

export default App;
