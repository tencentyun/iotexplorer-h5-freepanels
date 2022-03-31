import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
const App = () => {
  const route = [
    { path: '/home', Component: Home }
  ];
  return <Router route={route} />;
};

export default App;
