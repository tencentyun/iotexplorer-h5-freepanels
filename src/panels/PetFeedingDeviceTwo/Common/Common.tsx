import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Setting } from './Setting/Setting';
import { TimerList, TimerAdd, MainSwitch, Repeat } from './Timer';

const App = () => {
  const route = [
    { path: '/home', Component: Setting },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
  ];
  return <Router route={route} />;
};

export default App;
