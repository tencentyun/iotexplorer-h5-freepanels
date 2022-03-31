import React from 'react';
import classNames from 'classnames';

export interface BtnOptions extends StyledProps {
  disabled?: boolean;
  // type=default = type:primary + reverse:true
  // type=cancel 时，只有一个样式，reverse和transparent无效
  type?: 'default' | 'primary' | 'danger' | 'cancel' | 'link' | 'sub';
  onClick?: any;
  icon?: string;
  reverse?: boolean; // 翻转颜色
  transparent?: boolean; // 透明底色
  btnText?: string | React.ReactNode;
  standalone?: boolean;
  size?: 'small' | 'default' | 'large';
  children?: React.ReactNode;
}

export function Btn({
  disabled,
  type = 'default',
  onClick,
  icon,
  reverse = false,
  transparent = false,
  style,
  className,
  btnText,
  standalone,
  children,
  size
}: BtnOptions) {
  const renderContent = () => (
    <>
      {icon && <img src={icon} className="btn-icon" />}
      <span className="btn-text">{btnText ? btnText : children}</span>
    </>
  );

  if (type === 'default') {
    type = 'primary';
    reverse = true;
  }

  // 如果透明底必须要翻转
  if (transparent) {
    reverse = true;
  }

  return (
    <button
      className={classNames('btn need-hover', `btn-size-${size}`, className, type ? `btn-${type}` : '', {
        standalone,
        disabled,
        transparent,
        reverse
      })}
      style={style}
      onClick={(e) => {
        if (disabled) {
          return;
        }

        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
    >
      {renderContent()}
    </button>
  );
}

export interface RawBtnProps extends StyledProps {
  onClick?: any;
  children?: string | React.ReactNode;
  hoverClass?: string;
  hoverStopPropagation?: boolean;
}

export function RawBtn({ className, style, onClick, children }: RawBtnProps) {
  return (
    <div
      className={classNames('need-hover', className)}
      style={{
        overflow: 'hidden',
        ...style
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
