import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { SubDevice } from './SubDevice';

const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/subDevice', Component: SubDevice },
  ];
  return <Router route={route} />;
};

export default App;
