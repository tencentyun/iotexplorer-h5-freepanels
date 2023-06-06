import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Editor } from './Editor';
import { Theme } from './Theme';
import LayoutSort from './Layout/LayoutSort';
import Switch from './Switch';
import EcChart from './EcChart';
import PowerChart from './PowerChart';

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/editor', Component: Editor },
    { path: '/theme', Component: Theme },
    { path: '/sort', Component: LayoutSort },
    { path: '/switch', Component: Switch },
    { path: '/ecchart', Component: EcChart },
    { path: '/powerchart', Component: PowerChart },
  ];
  return <Router route={route} {...props} />;
};

export default App;
