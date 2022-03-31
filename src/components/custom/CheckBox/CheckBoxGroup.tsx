import React from 'react';
import classNames from 'classnames';
import { noop } from '@utillib';
import { CheckBox } from './CheckBox';


export interface CheckBoxGroupProps {
  options: SelectorOption[];
  value: string[];
  onChange: (value: string[]) => any;
  type: 'checkbox';
}

export interface RadioGroupProps {
  options: SelectorOption[];
  value: string;
  onChange: (value: string) => any;
  type: 'radio';
}

export function CheckBoxGroup(props: CheckBoxGroupProps | RadioGroupProps) {
  const {
    options = [],
    value,
    onChange,
    type = 'checkbox', // checkbox/radio
  } = props;

  const onClickItem = (item) => {
    if (type === 'radio') {
      onChange(item.value);
    } else {
      const nextValue: string[] = [...(value || [])];

      const itemIndex = nextValue.findIndex(v => v === item.value);

      if (itemIndex > -1) {
        nextValue.splice(itemIndex, 1);
      } else {
        nextValue.push(item.value);
      }

      onChange(nextValue as any);
    }
  };

  return (
    <div className={classNames('checkbox-group', `type-${type}`)}>
      {options.map((item) => {
        let actived = false;

        if (type === 'radio') {
          actived = item.value === value;
        } else {
          const _value = value as string[] || [];

          actived = _value.findIndex(v => v === item.value) > -1;
        }

        return (
          <div
            key={item.value}
            className={classNames('checkbox-item need-hover', {
              actived,
            })}
            onClick={() => onClickItem(item)}
          >
            <CheckBox
              type={type}
              value={actived}
              onChange={noop}
            />
            <div className='checkbox-item-text text-overflow'>
              {item.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
