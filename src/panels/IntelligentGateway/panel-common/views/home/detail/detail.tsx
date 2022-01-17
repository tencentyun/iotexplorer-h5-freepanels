import React from 'react';
import classNames from 'classnames';
import Environment from './environment/environment';
import './detail.less';

export function Detail() {
  return (
    <article className={classNames('detail')}>
      {/*温度和湿度*/}
      <Environment />
    </article>
  );
}
