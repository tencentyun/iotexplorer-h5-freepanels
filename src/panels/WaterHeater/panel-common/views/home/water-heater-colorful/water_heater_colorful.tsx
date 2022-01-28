import React from 'react';
import classNames from 'classnames';
import './water_heater_colorful.less';
import Normal_Foot from './heater_foot/heater_foot';
import Normal_Center from './heater_center/heater_center';
import Normal_head from './heater_head/heater_head';

export function Heater_Colorful() {
  return (
    <article className={classNames('colorful_home')}>
      <Normal_Foot/>
      <Normal_head/>
      <Normal_Center/>
    </article>
  );
}

export default Heater_Colorful;
