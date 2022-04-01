import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Settings } from './Settings';
const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/settings', Component: Settings },
  ];
  return <Router route={route} />;
};

export default App;
