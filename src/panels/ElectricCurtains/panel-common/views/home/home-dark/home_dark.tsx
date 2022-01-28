import React from 'react';
import classNames from 'classnames';
import './home_dark.less';
import Dark_head from './dark_head/dark_head';
import Dark_body from './dark_body/dark_body';
import Dark_foot from './dark_foot/dark_foot';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function HomeDark() {
  return (
    <article
      className={classNames(
        sdk.deviceData.power_switch === 0 && 'power-off'
      )}
    >
      <Dark_head/>
      <Dark_body/>
      <Dark_foot/>
    </article>
  );
}

export default HomeDark;
