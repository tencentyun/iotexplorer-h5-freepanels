import React from 'react';
import { Router } from '@router';
import { Home } from '../Common/Home';
// import { TimerList, TimerAdd, MainSwitch, Repeat } from '../Common/Timer';

const App = () => {
  const route = [
    { path: '/home', Component: Home },
    // { path: '/timer/list', Component: TimerList },
    // { path: '/timer/add', Component: TimerAdd },
    // { path: '/timer/action/switch', Component: MainSwitch },
    // { path: '/timer/action/repeat', Component: Repeat },
  ];
  return <Router route={route} />;
};

export default App;
