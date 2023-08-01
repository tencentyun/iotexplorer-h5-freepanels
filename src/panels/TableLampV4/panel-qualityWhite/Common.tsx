import React from 'react';
import { Router } from '@router';
import { Home } from './Home/Home';
import { MainSwitch, Repeat, TimerAdd, TimerList } from '../Common/Timer';
import { CountDownPage } from '../Common/CountDown';
import { SceneBind, SceneList, SceneSetting } from '@custom/Scene';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/timer/countdownpage', Component: CountDownPage },
    { path: '/scene/setting', Component: SceneSetting },
    { path: '/scene/bind', Component: SceneBind },
    { path: '/scene/list', Component: SceneList },
  ];
  return <Router route={route} {...props} detail={false} />;
};

export default App;
