import React from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
export function LightSwitch({ value, name, hasCount, count, className, onChange }) {
  return (
    <div className={classNames('light-switch', className, { 'is-checked': value }, { 'has-count': hasCount },  'border-bg')} onClick={() => onChange(!value)}>
      <div className="content">
        <div className="wrapper">
          <Icon className="light-icon" name={value ? 'light-on' : 'light'} size="large" />
          <div className="flag"></div>
          {name ? <div className="name">{name}</div> : null}
          {hasCount ? <div className="switch-cus-count">{count || ''}</div> : null}
        </div>
      </div>
    </div>
  );
}
