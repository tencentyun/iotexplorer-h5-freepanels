import React from 'react';
import './detail.less';
import classNames from 'classnames';
import Environment from './environment/environment';
import Position from './position/position';
import { Power } from './power/power';

export function Detail() {
  return (
    <article className={classNames('detail')}>
      {/* 电源操作栏*/}
      <Power />
      {/* 温度和湿度*/}
      <Position />
      {/* 控制栏*/}
      <Environment />
    </article>
  );
}
