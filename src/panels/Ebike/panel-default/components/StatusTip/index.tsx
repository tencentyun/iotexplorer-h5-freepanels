import React from 'react';
import classNames from 'classnames';
import './index.less';

export function StatusTip(props: {
  style: React.CSSProperties;
  className: string;
}) {
  const { style, className } = props;
  return (
    <div
      className={classNames('loading-icon spinner', className)}
      style={style}
    >
      <div className="bounce bounce1" />
      <div className="bounce bounce2" />
      <div className="bounce bounce3" />
    </div>
  );
}
