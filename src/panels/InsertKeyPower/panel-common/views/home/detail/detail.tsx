import React from 'react';
import classNames from 'classnames';
import Environment from './environment/environment';
import { Power } from './power/power';
import './detail.less';

export function Detail() {
  return (
    <article className={classNames('detail')}>
      {/* 电源操作栏*/}
      <Power />
      {/* 断电延时和卡状态*/}
      <Environment />
    </article>
  );
}
