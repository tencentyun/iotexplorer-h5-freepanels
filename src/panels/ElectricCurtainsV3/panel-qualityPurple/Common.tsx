import React from 'react';
import { Router } from '@router';
import { Home } from './Home/Home';
import { More } from '../Common/Home/More';
import { TimerList, TimerAdd, Repeat } from '../Common/Timer';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/more', Component: More },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/repeat', Component: Repeat },
  ];
  return <Router route={route} {...props} />;
};

export default App;
