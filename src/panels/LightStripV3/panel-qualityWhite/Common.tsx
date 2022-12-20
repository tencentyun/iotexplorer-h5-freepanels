import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { TimerList, TimerAdd, MainSwitch, Repeat } from '../Common/Timer';
import { CountDownPage } from '../Common/CountDown';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/timer/countdownpage', Component: CountDownPage },
  ];
  return <Router route={route} {...props} detail={false} />;
};

export default App;
