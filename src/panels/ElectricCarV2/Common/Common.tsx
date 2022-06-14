import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Unlock } from './Unlock';
const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/unlock', Component: Unlock },
  ];
  return <Router route={route}  detail={false}/>;
};

export default App;
