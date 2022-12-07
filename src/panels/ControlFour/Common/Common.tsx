import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Config } from './Config';
import { Editor } from './Editor';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/config', Component: Config },
    { path: '/card/editor', Component: Editor },
  ];
  return <Router route={route} {...props} />;
};

export default App;
