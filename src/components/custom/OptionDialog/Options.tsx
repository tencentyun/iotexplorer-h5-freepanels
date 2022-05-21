import React, { useState, useMemo } from 'react';
import classNames from 'classnames';

export type SelectType = {
  Radio: 'radio';
  Multiple: 'multiple';
};

export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface OptionProps {
  visible?: boolean;
  value?: string[] | number[];
  type?: SelectType['Radio'] | SelectType['Multiple'];
  options: Option[];
  defaultValue?: string[] | number[];
}

export function Options(props: OptionProps) {
  const { type = 'radio', options, value, defaultValue } = props;
  const [checkList, setCheckList] = useState([] as (string | number)[]);

  useMemo(() => {
    if (props.visible) {
      // 显示的时候才渲染
      let val = defaultValue || [options[0]?.value];
      if (value !== void 0) {
        val = value;
      }
      setCheckList(val);
    }
  }, [props.visible]);


  const handleSelect = (option: Option) => {
    if (option.disabled) return;

    const { value } = option;
    if (type === 'radio') {
      // 单选模式
      setCheckList([value]);
    } else {
      // 多选模式
      const index = checkList.indexOf(value);
      const checked = checkList.filter(t => t !== '');

      if (index > -1) {
        checked.splice(index, 1);
      } else {
        checked.push(value);
      }
      setCheckList(checked);
    }
  };

  const selectItem = (item: Option) => {
    const isSelected = checkList.indexOf(item.value) > -1;

    return (
      <div
        className={classNames('item-block', {
          isDisabled: item.disabled,
          isSelected,
        })}
        key={item.value}
        onClick={() => handleSelect(item)}
      >
        <div className="item-label">{item.label}</div>
        <div
          className={classNames(isSelected ? 'item-icon-selected' : 'item-icon-unselected')}
        ></div>
      </div>
    );
  };

  return (
    <main className="dialog-content">
      {options.map((option: Option) => selectItem(option))}
    </main>
  );
}
