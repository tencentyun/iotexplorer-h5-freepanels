/*
 * @Author: wrq
 * @Date: 2021-10-03 22:42:07
 * @Description: 弹出框样式的列表选择器
 */
import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { Dialog } from 'antd-mobile';
import { SvgIcon } from '../../common';
import './style.less';
import { Action } from 'antd-mobile/es/components/dialog';
import { StyledProps, ThemeType } from '@libs/global';
import { toUnderscores } from '@libs/utillib';
import { getThemeType } from '@libs/theme';

export type SelectType = {
  Radio: 'radio';
  Multiple: 'multiple';
};

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ListPickerProps extends StyledProps {
  title?: string;
  visible?: boolean;
  value?: string[];
  defaultValue?: string[];
  type?: SelectType['Radio'] | SelectType['Multiple'];
  options: Option[];
  theme?: ThemeType;
  layoutType?: string; //normal,middle,spacebetween
  confirmText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onConfirm?: (checked: string[]) => void;
}

export function ListPicker(props: ListPickerProps) {
  const {
    type = 'radio',
    options,
    value,
    defaultValue,
    theme = getThemeType()
  } = props;
  const [checkList, setCheckList] = useState(['']);

  useMemo(() => {
    const val =
      value !== undefined ? value : defaultValue || [options[0].value];

    setCheckList(val);
  }, [props.visible]);

  const handleConfirm = () => {
    props.onConfirm && props.onConfirm(checkList);
    handleCancel();
  };

  const handleCancel = () => {
    props.onCancel && props.onCancel();
  };

  const onDialogAction = (action: Action) => {
    if (action.key === 'cancel') {
      handleCancel();
    } else if (action.key === 'confirm') {
      handleConfirm();
    }
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
        className={classNames('dialog-selection-item', {
          is_disabled: item.disabled,
          is_selected: isSelected
        })}
        key={item.value}
        onClick={() => handleSelect(item)}
      >
        {props.layoutType === 'middle' ? 
        (
          <div className="item">
            <div className="item-label">{item.label}</div>
            <div className="item-select-icon">
              {
                theme === 'dark' ? 
                <SvgIcon
                  name={isSelected ? 'icon-selected-dark' : 'icon-unselected'}
                /> : 
                <SvgIcon
                  name={isSelected ? 'icon-selected' : 'icon-unselected'}
                />
              }
            </div>
          </div>
        ) :
        (
          <>
            <div className="item-label">{item.label}</div>
            <div className="item-select-icon">
              {
                theme === 'dark' ? 
                <SvgIcon
                  name={isSelected ? 'icon-selected-dark' : 'icon-unselected'}
                /> : 
                <SvgIcon
                  name={isSelected ? 'icon-selected' : 'icon-unselected'}
                />
              }
            </div>
          </>
        )
      }
        
        
      </div>
    );
  };

  const selection = (
    <div className={classNames('dialog-selection')}>
      {options.map((option: Option) => selectItem(option))}
      {/* <CheckList
        multiple={type === 'multiple'}
        value={checkValue}
        onChange={(value: string[]) => onUpdateChecked(value)}
      >
        {options.map((option: Option) => (
          <CheckList.Item key={option.value} value={option.value}>
            {option.label}
          </CheckList.Item>
        ))}
      </CheckList> */}
    </div>
  );

  return (
    <div
      className={classNames(
        '_component_business_list_picker_',
        `theme_${toUnderscores(theme)}`,
        { is_hidden: !props.visible },
        props.className,
        {'layout-middle': props.layoutType === 'middle'},
        {'layout-spaceBetween': props.layoutType === 'spaceBetween'}
      )}
    >
      <Dialog
        visible={props.visible}
        title={props.title}
        content={selection}
        maskStyle={{ background: 'rgba(45,48,54,0.74)' }}
        actions={[
          [
            {
              key: 'cancel',
              text: props.cancelText || '取消'
            },
            {
              key: 'confirm',
              text: props.confirmText || '完成',
              disabled: !checkList || !checkList.length
            }
          ]
        ]}
        onAction={onDialogAction}
      />
    </div>
  );
}
