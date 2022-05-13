import React from 'react';
import { Router } from '@router';
import render from '@custom/Render';
import { Home } from './Home';
import { Settings } from '../Common/Settings';
import { TimerList, TimerAdd, MainSwitch, Repeat } from '../Common/Timer';
import '@theme/panel-house';
import './app.less';

const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/settings', Component: Settings },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
  ];
  return <Router route={route} />;
};
render(App);
