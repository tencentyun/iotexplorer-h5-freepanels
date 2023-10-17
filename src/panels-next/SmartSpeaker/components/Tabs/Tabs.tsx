import React from 'react';
import classnames from 'classnames';
import './Tabs.less';
import { noop } from '@utillib';

export function Tabs({
  options,
  value,
  onChange = noop,
}: {
  options: Array<{
    text: string;
    value: any
  }>;
  value: any;
  onChange: (val: any) => void;
}) {
  return (
    <div className='ll-tabs'>
      {options.map(option => (
        <div
          key={option.value}
          className={classnames('ll-tabs-item', { active: option.value === value })}
          onClick={() => onChange(option.value)}>
          <div className='ll-tabs-option-text'>{option.text}</div>
        </div>
      ))}
    </div>
  );
}
