import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Source } from './Source';
import { SceneBind, SceneSetting, SceneList } from '@custom/Scene';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/scene/setting', Component: SceneSetting },
    { path: '/scene/bind', Component: SceneBind },
    { path: '/scene/list', Component: SceneList },
    { path: '/source', Component: Source },
  ];
  return <Router route={route} {...props} />;
};

export default App;
