import React from 'react';
import './electric_oven_normal.less';
import Oven_center from './oven_center/oven_center';
import Oven_foot from './oven_foot/oven_foot';
import Oven_head from './oven_head/oven_head';

export function Purifier_Normal() {
  return (
    <article>
      <Oven_head/>
      <Oven_center/>
      <Oven_foot/>
    </article>
  );
}

export default Purifier_Normal;
