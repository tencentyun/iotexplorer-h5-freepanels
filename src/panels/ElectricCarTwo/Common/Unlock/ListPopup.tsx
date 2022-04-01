import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
// import { SvgIcon } from '@components/common/icon';
import { Popup } from '@custom/Popop';

export type SelectType = {
  Radio: 'radio';
  Multiple: 'multiple';
};

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ListPopupProps extends StyledProps {
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

    setCheckList([value]);
    props.onConfirm && props.onConfirm([value]);
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
      </div>
    );
  };

  return (
    <Popup
      className="list-popup"
      visible={props.visible}
      onMaskClick={handleCancel}
    >
      <main className={classNames(props.layoutType !== 'middle' ? 'block-wrap' : 'block-wrap-middle')}>
        {options.map((option: Option) => selectItem(option))}
      </main>
    </Popup>
  );
}
