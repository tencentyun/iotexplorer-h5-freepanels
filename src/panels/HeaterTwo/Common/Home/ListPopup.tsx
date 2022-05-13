import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { Popup } from '@custom/Popup';

export type SelectType = {
  Radio: 'radio';
  Multiple: 'multiple';
};

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ListPopupProps {
  name?: string;
  title?: string;
  visible?: boolean;
  value?: string[];
  type?: SelectType['Radio'] | SelectType['Multiple'];
  options: Option[];
  layoutType?: string; // 'middle'
  onCancel?: () => void;
  onConfirm?: (checked: string[]) => void;
}

export function ListPopup(props: ListPopupProps) {
  const { type = 'radio', options, value } = props;
  const [checkList, setCheckList] = useState(['']);

  useMemo(() => {
    const val = value !== undefined ? value : [''];

    setCheckList(val);
  }, [props.visible]);

  const handleConfirm = () => {
    props.onConfirm && props.onConfirm(checkList);
    handleCancel();
  };

  const handleCancel = () => {
    props.onCancel && props.onCancel();
  };

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
          <Icon
            name={isSelected ? 'selected' : 'unselected'}
          ></Icon>
      </div>
    );
  };

  return (
    <Popup
      className="list-popup"
      visible={props.visible}
      onMaskClick={handleCancel}
    >
      <header>
        <div className="btn-cancel" onClick={handleCancel}>取消</div>
        <div>{props.title}</div>
        <div className="btn-confirm" onClick={handleConfirm}>确定</div>
      </header>
      <main className={classNames(props.layoutType !== 'middle' ? 'block-wrap' : 'block-wrap-middle')}>
        {options.map((option: Option) => selectItem(option))}
      </main>
    </Popup>
  );
}
