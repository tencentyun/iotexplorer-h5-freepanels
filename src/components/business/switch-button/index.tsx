/*
 * @Author: wrq
 * @Date: 2021-10-16 14:54:48
 * @Description: 通用业务开关组件
 */
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { StyledProps } from '@libs/global';
import { ThemeType } from '@libs/global';
import './style.less';

export interface BizSwitchProps extends StyledProps {
  value?: boolean;
  defaultValue?: boolean;
  name?: string;
  size?: 'normal' | 'small';
  theme?: ThemeType;
  onChange?: (value: boolean) => void;
}

export function BizSwitch(props: BizSwitchProps) {
  // 开关状态
  const [status, onToggleStatus] = useState(false);
  useMemo(() => {
    const value =
      props.value !== undefined ? props.value : props.defaultValue || false;

    onToggleStatus(value);
  }, []);
  useMemo(() => {
    props.onChange && props.onChange(status);
  }, [status]);

  const handleClick = () => {
    onToggleStatus(!status);
  };

  return (
    <div
      className={classNames(
        '_component_business_switch_',
        { is_on: status },
        `theme_type_${props.theme || 'normal'}`,
        props.className
      )}
      onClick={handleClick}
    >
      {props.name ? (
        <p className="switch-name font_line_3">{props.name}</p>
      ) : null}

      <div className="switch-wrapper">
        <div className="switch-panel">
          {/* <img
            className="switch-bar"
            src={themIcon(props.theme || 'normal')}
          ></img> */}
          <span className="switch-bar"></span>
          <span className="switch-status-desc font_line_3">
            {status ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>
    </div>
  );
}
