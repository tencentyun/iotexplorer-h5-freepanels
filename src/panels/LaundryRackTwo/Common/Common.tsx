import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { More } from './Home/More';
import { TimerList, TimerAdd, Repeat } from './Timer';

const App = () => {
  const route = [
    { path: '/home', Component: Home },
    // { path: '/more', Component: More },
    // { path: '/timer/list', Component: TimerList },
    // { path: '/timer/add', Component: TimerAdd },
    // { path: '/timer/action/repeat', Component: Repeat },
  ];
  return <Router route={route} />;
};

export default App;
