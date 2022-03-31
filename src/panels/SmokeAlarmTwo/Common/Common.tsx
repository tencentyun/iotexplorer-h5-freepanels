import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Record } from './Record';
import { Settings } from './Settings';
import { commonIcon } from '@src/assets';
const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/record', Component: Record },
    { path: '/settings', Component: Settings }
  ];
  return <Router route={route} />;
};

export default App;
