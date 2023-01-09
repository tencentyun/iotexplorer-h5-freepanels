import React from 'react';
import { Router } from '@router';
import { Home } from '../Common/Home';
import { TimerList, TimerAdd, MainSwitch, Repeat } from '../Common/Timer';
import { CountDownPage } from '../Common/CountDown';
import { Operator } from '../Common/Operator/Operator';
import { Process } from '../Common/Process/Process';
import { Temperature } from '../Common/Temperature/Temperature';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/timer/countdownpage', Component: CountDownPage },
    { path: '/operator', Component: Operator },
    { path: '/process', Component: Process },
    { path: '/temperature', Component: Temperature },
  ];
  return <Router route={route} {...props} />;
};

export default App;
