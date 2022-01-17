import React from 'react';
import './detail.less';
import { Power } from './power/power';
import classNames from 'classnames';
import Environment from './environment/environment';

export function Detail() {
  return (
    <article className={classNames('detail')}>
      {/*产品模式*/}
      <Environment />
      {/*电源操作栏*/}
      <Power />
    </article>
  );
}
