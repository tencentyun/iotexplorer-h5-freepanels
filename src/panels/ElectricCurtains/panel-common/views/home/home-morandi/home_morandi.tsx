import React from 'react';
import classNames from 'classnames';
import './home_morandi.less';
import Morandi_head from './morandi_head/morandi_head';
import Morandi_body from './morandi-body/morandi_body';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function HomeMorandi() {
  return (
    <article
      className={classNames(sdk.deviceData.power_switch === 0 && 'power-off')}
    >
      <Morandi_head/>
      <Morandi_body/>
    </article>
  );
}

export default HomeMorandi;
