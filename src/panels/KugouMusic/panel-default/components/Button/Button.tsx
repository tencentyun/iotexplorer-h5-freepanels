import React from 'react';
import './Button.less';

export const Button = (props: any) => {
  const { children, ...restProps } = props;
  return (
    <div
      className="button"
      {...restProps}>
      {children}
    </div>
  );
};
