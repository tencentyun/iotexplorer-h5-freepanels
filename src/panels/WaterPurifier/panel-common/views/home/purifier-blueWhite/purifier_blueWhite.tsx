import React from 'react';
import classNames from 'classnames';
import './purifier_blueWhite.less';
import Bormal_center from './bormal_center/bormal_center';
import Bormal_foot from './bormal_foot/bormal_foot';
import Bormal_head from './bormal_head/bormal_head';

export function Purifier_BlueWhite() {
  return (
    <article
      className={classNames(
        'blueWhite_home'
      )}
    >
      <Bormal_center/>
      <Bormal_head/>
      <Bormal_foot/>
    </article>
  );
}

export default Purifier_BlueWhite;
