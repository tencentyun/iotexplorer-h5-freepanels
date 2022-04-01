import React from 'react';
import classNames from 'classnames';
import './purifier_dark.less';
import Bormal_foot from './bormal_foot/bormal_foot';
import Bormal_head from './bormal_head/bormal_head';

export function Purifier_Dark() {
  return (
    <article
      className={classNames('dark_home')}
    >
      <Bormal_head/>
      {/* <Bormal_center /> */}
      <Bormal_foot/>
    </article>
  );
}

export default Purifier_Dark;
