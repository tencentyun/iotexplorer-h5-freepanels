import React from 'react';
import { Router } from '@router';
import { Home } from './Home/Home';
import { TimerList, TimerAdd, MainSwitch, Repeat } from '../Common/Timer';
import { Source } from '@src/panels/WirelessSwitchOneV4/Common/Source';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/source', Component: Source },
  ];
  return <Router route={route} {...props}/>;
};

export default App;
