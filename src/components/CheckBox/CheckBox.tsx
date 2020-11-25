import React from 'react';
import classNames from 'classnames';
import { iconCheckWhite } from '@icons/common';
import { noop } from '@utillib';
import './CheckBox.less';

export interface CheckBoxProps extends StyledProps {
  children?: React.ReactNode;
  value: boolean;
  onChange?: (value: boolean) => any;
  type?: 'checkbox' | 'radio';
  tips?: string | React.ReactNode;
}

export function CheckBox({
  children,
  value = true,
  onChange = noop,
  type = 'checkbox', // radio
  tips,
  className,
  style,
}: CheckBoxProps) {
  return (
    <div
      className={classNames('checkbox-container need-hover', `type-${type}`, className)}
      onClick={() => onChange(!value)}
      style={style}
    >
      <div
        className={classNames('checkbox', {
          checked: value,
        })}
      >
        <img
          className='checkbox-icon'
          src={iconCheckWhite}
        />
      </div>
      {Boolean(tips) ? (
        <span className='checkbox-tips'>{tips}</span>
      ) : Boolean(children) ? children : null}
    </div>
  );
}
