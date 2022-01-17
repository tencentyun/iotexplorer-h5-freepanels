/*
 * @Author: wrq
 * @Date: 2021-09-19 21:14:28
 * @Description: 通用开关组件
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { noop, toUnderscores } from '@libs/utillib';
import { StyledProps, ThemeType } from '@libs/global';
import './style.less';

export interface SwitchProps extends StyledProps {
  // 默认是否选中
  checked?: boolean;
  // switch 对应的 name 属性
  name: string;
  disabled?: boolean;
  theme?: ThemeType;
  onChange?: any;
  onClick?: any;
}

export function Switch({
  className,
  theme = 'normal',
  checked = false,
  onChange = noop,
  onClick = noop,
  disabled = false
}: SwitchProps) {
  const [isChecked, onToggleChecked] = useState(checked);

  const handleSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    const checked = !isChecked;
    onToggleChecked(checked);
    onClick(checked);
    onChange(checked);
  };

  return (
    <div
      className={classNames(
        '_component_base_switch_',
        `theme_${toUnderscores(theme)}`,
        className
      )}
    >
      <div
        className={[
          'switch-inner',
          isChecked ? 'is_checked' : '',
          disabled ? 'is_disabled' : ''
        ].join(' ')}
        onClick={handleSwitch}
      />
    </div>
  );
}
