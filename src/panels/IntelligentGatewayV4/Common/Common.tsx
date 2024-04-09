import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { SubDevice } from './SubDevice';
import { SearchDevice } from './SearchDevice/SearchDevice';
import { Record } from './Record';
import { Scene } from './Scene';
import { Alarm } from './Alarm';
import { NightLight } from './NightLight';
import { SceneBind, SceneList, SceneSetting } from '@custom/Scene';

const App = (props) => {
  const route = [
    // { path: '/home', Component: SearchDevice },
    // { path: '/home', Component: SubDevice },

    { path: '/home', Component: Home },
    { path: '/subDevice', Component: SubDevice },
    { path: '/search/device', Component: SearchDevice }, // 添加子设备
    { path: '/record', Component: Record },
    { path: '/alarm', Component: Alarm },
    { path: '/scene', Component: Scene },
    { path: '/nightlight', Component: NightLight },
    { path: '/scene/setting', Component: SceneSetting },
    { path: '/scene/bind', Component: SceneBind },
    { path: '/scene/list', Component: SceneList },
  ];
  return <Router route={route} {...props} />;
};

export default App;
