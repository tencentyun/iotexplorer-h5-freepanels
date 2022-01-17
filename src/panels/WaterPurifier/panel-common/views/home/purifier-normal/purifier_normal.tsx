import React from 'react';
import './purifier_normal.less';
import Bormal_center from './bormal_center/bormal_center';
import Bormal_foot from './bormal_foot/bormal_foot';
import Bormal_head from './bormal_head/bormal_head';
export function Purifier_Normal() {
  return (
    <article>
      <Bormal_head />
      <Bormal_center />
      <Bormal_foot />
    </article>
  );
}
export default Purifier_Normal;
