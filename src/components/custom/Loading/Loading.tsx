import React from 'react';
import classNames from 'classnames';
import { iconLoadingDark, iconLoadingBlue } from '@icons/common';
import './Loading.less';

export type LoadingType = 'spinner' | 'rotate-grey' | 'rotate-blue';

export interface LoadingProps extends StyledProps {
  type?: LoadingType;
  size?: number;
  color?: string;
}

export function Loading({
  style = {},
  className,
  type = 'spinner',
  size,
  color,
}: LoadingProps) {
  let height;
  let width;

  if (size) {
    height = width = `${size}rpx`;
  }

  switch (type) {
    case 'rotate-grey':
      return (
        <img
          className={classNames('loading-icon loading-rotate loading-grey', className)}
          src={iconLoadingDark}
          style={{
            height,
            width,
            ...style,
          }}
        />
      );
    case 'rotate-blue':
      return (
        <img
          className={classNames('loading-icon loading-rotate loading-blue', className)}
          src={iconLoadingBlue}
          style={{
            height,
            width,
            ...style,
          }}
        />
      );
    case 'spinner':
    default: {
      const spinnerStyle = {
        backgroundColor: color,
      };

      return (
        <div
          className={classNames('loading-icon spinner', className)}
          style={style}
        >
          <div className='bounce bounce1' style={spinnerStyle}/>
          <div className='bounce bounce2' style={spinnerStyle}/>
          <div className='bounce bounce3' style={spinnerStyle}/>
        </div>
      );
    }
  }
}
