import React from 'react';
import classNames from 'classnames';
import './environment.less';
import Gateways from './gateways/gateways';

const Environment = () => {
  return (
    <article className={classNames('environment')}>
      <div className="title">已添加的设备 ▼</div>
      <Gateways />
      <div className="add">添加子设备</div>
    </article>
  );
};

export default Environment;
