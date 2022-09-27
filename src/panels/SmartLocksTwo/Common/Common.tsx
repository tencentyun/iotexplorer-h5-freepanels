import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Log } from './Log';
import { Settings, CameraConfig, VideoConfig } from './Settings';
import { Users, UserEdit, PasswordAdd, PasswordResult } from './Users';
import { TempPassword, AddTempPassword } from './TempPassword';
const App = () => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/log', Component: Log },
    { path: '/settings/index', Component: Settings },
    { path: '/settings/camera', Component: CameraConfig },
    { path: '/settings/video', Component: VideoConfig },
    { path: '/users/index', Component: Users },
    { path: '/users/edit', Component: UserEdit },
    { path: '/users/psdadd', Component: PasswordAdd },
    { path: '/users/psdresult', Component: PasswordResult },
    { path: '/temp/password/index', Component: TempPassword },
    { path: '/temp/password/add', Component: AddTempPassword },
  ];
  return <Router route={route} detail={false} />;
};

export default App;
