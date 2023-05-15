import React from 'react';
import { Router } from '@router';
import { Home } from './Home/Home';
import { TimerList, TimerAdd, MainSwitch, Repeat } from '../Common/Timer';
import { SceneBind, SceneSetting,SceneList } from '@custom/Scene';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    // { path: '/home', Component: SceneSetting },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/scene/setting', Component: SceneSetting },
    { path: '/scene/bind', Component: SceneBind }, 
    { path: '/scene/list', Component: SceneList }, 
  ];
  return <Router route={route} {...props} />;
};

export default App;
