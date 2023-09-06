import React from 'react';
import { Router } from '@router';
import { Home } from './Home/Home';
import { TimerList, TimerAdd, MainSwitch, Repeat } from '../Common/Timer';
import { Source } from '@src/panels/WirelessSwitchOneV4/Common/Source';
import { MoreSetting } from '@src/panels/SwitchV3/panel-qualityWhite/Home/MoreSetting';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/source', Component: Source },
    { path: '/more/setting', Component: MoreSetting },
  ];
  return <Router route={route} {...props}/>;
};

export default App;
