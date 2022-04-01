import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Record } from './Record';
const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/record', Component: Record },
  ];
  return <Router route={route} />;
};

export default App;
