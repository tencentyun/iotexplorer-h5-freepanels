import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import Plugs from './plugs/plugs';
import { Power } from './power/power';

export function Home() {
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 0 && 'power-off'
      )}
    >
      <Plugs />
      <Power />
    </article>
  );
}
