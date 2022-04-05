import React from 'react';
import './detail.less';
import classNames from 'classnames';
import Environment from './environment/environment';

export function Detail() {
  return (
    <article className={classNames('detail')}>
      <Environment />
    </article>
  );
}
