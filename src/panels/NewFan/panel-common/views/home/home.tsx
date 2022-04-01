import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './home.less';
import { Detail } from './detail/detail';
import Ticker from './tiker/ticker';
export function Home() {
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off',
      )}
    >
      {/* 仪表盘*/}
      <section className={classNames('dashboard')}>
        <Ticker
          title={'PM2.5'}
          text="室内空气 优"
          text1="室外空气 优(32)"
          value={sdk.deviceData.pm2_5 ? sdk.deviceData.pm2_5 : '300'}
          unit={''}
          badNum={'900'}
          status={sdk.deviceData.power_switch === 1 ? '1' : '0'}
        />
      </section>
      {/* 详情区域*/}
      <Detail />
    </article>
  );
}
