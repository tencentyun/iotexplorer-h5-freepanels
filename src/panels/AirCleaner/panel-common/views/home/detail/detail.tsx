import React from 'react';
import './detail.less';
import { Power } from './power/power';
import { Lock } from './lock/lock';
import { Title } from './title/title';
import classNames from 'classnames';
import Environment from './environment/environment';
import Position from './position/position';

export function Detail() {
  return (
    <article className={classNames('detail')}>
      {/* 锁*/}
      <Lock />
      {/* 设备状态*/}
      <Title />
      {/* 电源操作栏*/}
      <Power />
      {/* 温度、湿度和滤芯使用率*/}
      <Position />
      {/* 产品模式*/}
      <Environment />
    </article>
  );
}
