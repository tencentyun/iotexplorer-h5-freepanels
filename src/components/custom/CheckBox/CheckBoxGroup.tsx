import React from 'react';
import classNames from 'classnames';
import { CheckBox } from './CheckBox';

export interface CheckBoxGroupProps {
  options: SelectorOption[];
  value: string | string[];
  onChange: (value: string[]) => void;
  type: 'checkbox';
}

export interface RadioGroupProps {
  options: SelectorOption[];
  value: | string[] | string;
  onChange: (value: string | string[]) => void;
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

      onChange(nextValue);
    }
  };

  return (
    <div className={classNames('checkbox-group', `type-${type}`)}>
      {options.map((item) => {
        let active = false;

        if (type === 'radio') {
          active = item.value === value;
        } else {
          const filterValue = (value as string[]) || [];

          active = filterValue.findIndex(v => v === item.value) > -1;
        }

        return (
          <div
            key={item.value}
            className={classNames('checkbox-item need-hover', {
              active,
            })}
            onClick={() => onClickItem(item)}
          >
            <CheckBox type={type} value={active} />
            <div className="checkbox-item-text text-overflow">{item.text}</div>
          </div>
        );
      })}
    </div>
  );
}
