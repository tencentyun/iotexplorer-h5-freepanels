import React from 'react';
import { Route } from 'react-router-dom';
import { DeviceInfo } from '@src/panels/KugouMusic/panel-default/IndexPage/DeviceInfo/DeviceInfo';
import { LoginPanel } from '@src/panels/KugouMusic/panel-default/IndexPage/LoginPanel/LoginPanel';
import { KugouIndex } from '@src/panels/KugouMusic/panel-default/KugouPage/KugouIndex';
import { TabBar } from '@src/panels/KugouMusic/panel-default/components/TabBar/TabBar';
import './IndexPage.less';

export const IndexPage = () => {
  const tabs = [
    {
      path: '/index/deviceInfo',
      name: '设备信息',
      component: DeviceInfo,
    },
    {
      path: '/index/login',
      name: '登录调试',
      component: LoginPanel,
    },
    {
      path: '/kugou',
      name: '酷狗页面',
      component: KugouIndex,
    },
  ];

  return (
    <>
      {
        tabs.map(({ path, component }) => (
          <Route key={path} path={path} component={component}/>
        ))
      }
      <TabBar tabs={tabs}/>
    </>
  );
};
