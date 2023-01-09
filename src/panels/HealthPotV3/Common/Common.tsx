import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { TimerList, TimerAdd, MainSwitch, Repeat } from './Timer';
import { CountDownPage } from './CountDown';
import { Process } from './Process/Process';
import { Operator } from './Operator/Operator';
import { Temperature } from './Temperature/Temperature';

const App = () => {
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
  return <Router route={route} />;
};

export default App;
