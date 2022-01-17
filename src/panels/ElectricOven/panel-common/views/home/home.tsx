import React from 'react';
import classNames from 'classnames';
import './home.less';
import Purifier_Normal from './electric_oven_normal/electric_oven_normal'
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Home() {
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch != 1 && 'power-off'
      )}
    >
      <Purifier_Normal/>
    </article>
  );
}

export default Home;
