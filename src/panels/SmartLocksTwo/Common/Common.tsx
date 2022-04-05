import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { Log } from './Log';
import { Settings, CameraConfig, VideoConfig } from './Settings';
import { Users, UserEdit, PasswordAdd, PasswordResult } from './Users';
import { VideoHistory } from './VideoHistory';
import { EventPreview } from './EventPreview';
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
    { path: '/video/history', Component: VideoHistory },
    { path: '/event/preview', Component: EventPreview },
  ];
  return <Router route={route} />;
};

export default App;
