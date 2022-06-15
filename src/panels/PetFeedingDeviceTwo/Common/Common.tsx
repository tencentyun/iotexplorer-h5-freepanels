import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Setting } from './Setting/Setting';
import { TimerList, TimerAdd, MainSwitch, Repeat } from './Timer';

const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/setting', Component: Setting },
  ];
  return <Router route={route} detail={false} />;
};

export default App;
