import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Add } from './Add';

const App = () => {
  const route = [
    // { path: '/home', Component: Add },
    { path: '/home', Component: Home },
    { path: '/add', Component: Add },
  ];
  return <Router route={route}/>;
};

export default App;
