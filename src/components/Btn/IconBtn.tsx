import React from 'react';
import classNames from 'classnames';
import { RawBtn } from '@components/Btn/Btn';

import './IconBtn.less';

export interface IconBtnOptions extends StyledProps {
  disabled?: boolean;
  title: string;
  message?: string;
  icon?: string;
  size?: string | number;
  onClick?: any;
  children?: React.ReactNode;
  iconBackground?: string;
}

export function IconBtn({
  onClick,
  icon,
  size,
  iconBackground,
  style,
  className,
  title,
  message,
  children,
}: IconBtnOptions) {
  const btnSize = size ? { width: size, height: size } : {};

  return (
    <div
      className={classNames('icon-btn-container', className)}
      style={{
        ...style,
      }}
    >
      <RawBtn
        className='icon-btn'
        onClick={onClick}
        style={{
          background: iconBackground,
          ...btnSize,
        }}
      >
        {icon ? (
          <img
            className='btn-icon'
            src={icon as string}
          />
        ) : children}
      </RawBtn>
      <div
        className='icon-btn-title text-overflow'
      >
        {title}
      </div>
      {Boolean(message) && (
        <div
          className='icon-btn-msg text-overflow'
        >
          {message}
        </div>
      )}
    </div>
  );
}
