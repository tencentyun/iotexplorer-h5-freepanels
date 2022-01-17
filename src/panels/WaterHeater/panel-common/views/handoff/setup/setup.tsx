import React from 'react';
import classNames from 'classnames';
import './setup.less';
import Normal_Center from './heater_center/heater_center';
import Setup_head from './heater_head/heater_head';

export function Home_Set_Up() {
  return (
    <article className={classNames('setup_home')}>
      <Setup_head/>
      <Normal_Center/>
    </article>
  );
}

export default Home_Set_Up;
