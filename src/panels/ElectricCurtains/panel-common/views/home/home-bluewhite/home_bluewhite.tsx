import React from 'react';
import classNames from 'classnames';
import './home_bluewhite.less';
import Side_Head from './side_head/side_head';
import Side_Foot from './side_foot/side_foot';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function HomeBlueWhite() {
  return (
    <article
      className={classNames(
        'sidehome',
        sdk.deviceData.power_switch === 0 && 'power-off',
      )}
    >
      <Side_Head/>
      <Side_Foot/>
    </article>
  );
}

export default HomeBlueWhite;
