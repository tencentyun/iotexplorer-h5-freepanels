import React from 'react';
import { Router } from '@router';
import render from '@custom/Render';
import { Home } from './Home';
import { Unlock } from '../Common/Unlock';
import '@theme/panel-dark';
import './app.less';

const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/unlock', Component: Unlock },
  ];
  return <Router route={route} />;
};
render(App);
