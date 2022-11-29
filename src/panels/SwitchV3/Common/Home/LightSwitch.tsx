import React from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
export function LightSwitch({ value, name, className, onChange }) {
  return (
    <div className={classNames('light-switch', className, { 'is-checked': value })} onClick={() => onChange(!value)}>
      <div className="wrapper v-center">
        <Icon className="light-icon" name="light" size="large" />
        <div className="flag"></div>
        {name ? <div className="name">{name}</div> : null}
      </div>
    </div>
  );
}
