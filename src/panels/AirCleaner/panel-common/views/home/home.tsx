import React from 'react';
import classNames from 'classnames';
import './home.less';
import { Detail } from './detail/detail';
import Ticker from './tiker/ticker';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Home() {
  const handleAirQuality = (num: string) => {
    switch (num) {
      case '0':
        return '优';
      case '1':
        return '良';
      case '2':
        return '轻度污染';
      case '3':
        return '中度污染';
      case '4':
        return '严重污染';
      default:
        return '良';
    }
  };
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off'
      )}
    >
      {/*仪表盘*/}
      <section className={classNames('dashboard')}>
        <Ticker
          title={'PM2.5'}
          text={
            sdk.deviceData.air_quality
              ? handleAirQuality(sdk.deviceData.air_quality)
              : '良'
          }
          value={sdk.deviceData.pm2_5 ? sdk.deviceData.pm2_5 : '300'}
          unit={''}
          badNum={'900'}
          status={sdk.deviceData.power_switch === 1 ? '1' : '0'}
        />
      </section>
      {/*详情区域*/}
      <Detail />
    </article>
  );
}
