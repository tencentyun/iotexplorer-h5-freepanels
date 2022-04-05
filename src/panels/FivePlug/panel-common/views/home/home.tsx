import React from 'react';
import classNames from 'classnames';
import './home.less';
import Operate from './operate/operate';
import Dashboard from './dashboard/dashboard';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Home() {
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off',
      )}
    >
      {/* 灯*/}
      {/* <section className={classNames('dashboard')}> */}
      <Dashboard />
      {/* </section> */}
      <Operate />
      {/* 详情区域*/}
      {/* <Detail /> */}
    </article>
  );
}
