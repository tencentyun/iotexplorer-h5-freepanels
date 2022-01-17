import React from 'react';
import './detail.less';
import classNames from 'classnames';
import Environment from './environment/environment';
import { Power } from './power/power';

export function Detail() {
  return (
    <article className={classNames('detail')}>
      {/*电源操作栏*/}
      <Power />
      {/*功能操作栏*/}
      <Environment />
    </article>
  );
}
