/*
 * @Author: wrq
 * @Date: 2021-10-16 14:54:48
 * @Description: 通用业务开关组件
 */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
// import { StyledProps, ThemeType } from '@libs/global';
// import './style.less';

export interface BizSwitchProps extends React.CSSProperties {
  className?: string;
  value?: boolean;
  defaultValue?: boolean;
  name?: string;
  size?: 'normal' | 'small';
  // theme?: ThemeType;
  onChange?: (value: boolean) => void;
  onInitChange?: (value: boolean) => void;
}

export function BizSwitch(props: BizSwitchProps) {
  // 开关状态
  const [status, onToggleStatus] = useState(false);

  useEffect(() => {
    const value = props.value !== undefined ? props.value : props.defaultValue || false;

    onToggleStatus(value);
  }, [props.value]);

  useMemo(() => {
    props.onChange && props.onChange(status);
    props.onInitChange && props.onInitChange(true);
  }, [status]);

  const handleClick = () => onToggleStatus(!status);

  return (
    <div className={classNames('biz-switch', props.className, { 'is-checked': status })} onClick={handleClick}>
      {props.name ? <p className="switch-name">{props.name}</p> : null}
      <div className="switch-wrapper">
        <div className="switch-panel">
          <span className="switch-bar"/>
          <span className="switch-status-desc">{status ? 'ON' : 'OFF'}</span>
        </div>
      </div>
    </div>
  );
}
