import React from 'react';
import classNames from 'classnames';
import './water_heater_normal.less';
import Normal_Foot from './heater_foot/heater_foot';
import Normal_Center from './heater_center/heater_center';
import Normal_head from './heater_head/heater_head';

export function Heater_Normal() {
  return (
    <article className={classNames('normal_home')}>
      <Normal_head/>
      <Normal_Center/>
      <Normal_Foot/>
    </article>
  );
}

export default Heater_Normal;
