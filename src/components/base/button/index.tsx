/*
 * @Author: wrq
 * @Date: 2021-09-23 21:53:58
 * @Description: 按钮组件
 */
import React from 'react';
import classNames from 'classnames';
import './style.less';
import { ThemeType } from '@src/libs/theme';
import { noop } from '@libs/utillib';

export interface ButtonProps extends StyledProps {
  // 按钮类型（预留）
  type?: string;
  // 主题类型 normal-黑白色 blueWhite-蓝白色 dark-暗黑色 colorful-多彩色 morandi-莫兰迪色
  theme?: ThemeType;
  className: string;
  // 是否圆角按钮
  round?: boolean;
  // 是否加载中状态
  loading?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 前缀图标
  prefixIcon?: string | React.ReactNode;

  children?: string;

  onClick: any;
}

export function Button(props: ButtonProps) {
  const {
    className = '',
    theme = 'normal',
    round = false,
    loading = false,
    disabled = false,
    onClick = noop
  } = props;

  const inner = () => {
    if (!loading) {
      return (
        <>
          {/* 图标 */}
          <i className="prefix-icon"></i>
          {props.children}
        </>
      );
    }
    return (
      <span className="loading">
        <i></i>加载中...
      </span>
    );
  };

  const handleClick = (e: React.ReactEventHandler) => {
    if (disabled || loading) return;

    onClick && onClick(e);
  };

  return (
    <button
      className={classNames(
        '_component_base_button_',
        className,
        `button_theme_${theme}`,
        { is_loading: loading, is_disabled: disabled, is_round_button: round }
      )}
      onClick={handleClick}
    >
      <div className="button-inner">{inner()}</div>
    </button>
  );
}
