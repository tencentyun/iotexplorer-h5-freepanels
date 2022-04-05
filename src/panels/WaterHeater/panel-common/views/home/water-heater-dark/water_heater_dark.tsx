import React from 'react';
import classNames from 'classnames';
import './water_heater_dark.less';
import Normal_Foot from './heater_foot/heater_foot';
import Normal_Center from './heater_center/heater_center';
import Normal_head from './heater_head/heater_head';

export function Heater_Dark() {
  return (
    <article className={classNames('dark_home')}>
      <Normal_head/>
      <Normal_Foot/>
      <Normal_Center/>
    </article>
  );
}

export default Heater_Dark;
