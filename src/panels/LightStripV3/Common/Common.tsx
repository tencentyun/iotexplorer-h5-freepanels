import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { TimerList, TimerAdd, MainSwitch, Repeat } from './Timer';
import { CountDownPage } from '../Common/CountDown';
// import { CountDown } from './CountDown';

const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/timer/countdownpage', Component: CountDownPage },
    // { path: '/timer/countdown', Component: CountDown },
  ];
  return <Router route={route}  detail={false}  />;
};

export default App;
