import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { SubDevice } from './SubDevice';
import {SearchDevice} from "./SearchDevice/SearchDevice";
import { Record } from './Record';
import { Scene } from './Scene';
import { Alarm } from './Alarm';
import { SceneBind, SceneSetting, SceneList } from '@custom/Scene';

const App = () => {
  const route = [
    { path: '/home', Component: SearchDevice },
    // { path: '/home', Component: Home },
    { path: '/subDevice', Component: SubDevice },
    { path: '/search/device', Component: SearchDevice }, // 添加子设备
    { path: '/record', Component: Record },
    { path: '/alarm', Component: Alarm },
    { path: '/scene', Component: Scene },
    { path: '/scene/setting', Component: SceneSetting },
    { path: '/scene/bind', Component: SceneBind },
    { path: '/scene/list', Component: SceneList },

  ];
  return <Router route={route} />;
};

export default App;
