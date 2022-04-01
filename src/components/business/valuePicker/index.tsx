/*
 * @Author: wrq
 * @Date: 2021-10-04 10:03:27
 * @Description: 数值选择器
 */
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Popup, PickerView } from 'antd-mobile';
import { PickerProps, PickerValue } from 'antd-mobile/es/components/picker';
import { formatPxUnit, noop } from '@libs/utillib';
import { StyledProps } from '@libs/global';
import './style.less';

export interface ValueSelectProps extends StyledProps {
  visible?: boolean;
  value?: PickerValue[];
  title?: string;
  columns: PickerProps['columns'];
  unit?: string;
  // 是否显示单位
  isShowUnit?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: (value: PickerValue[]) => void;
}

export function ValuePicker(props: ValueSelectProps) {
  const {
    columns,
    cancelText = '取消',
    confirmText = '保存',
    onCancel = noop,
    onConfirm = noop,
  } = props;
  const [value, setPickerValue] = useState(props.value);

  const handleConfirm = () => {
    onConfirm && onConfirm(value as PickerValue[]);
    onCancel && onCancel();
  };

  useMemo(() => {
    setPickerValue(props.value);
  }, [props.value]);

  return (
    <Popup
      className={classNames(
        '_component_business_value_picker_',
        props.className,
      )}
      visible={props.visible}
      position="bottom"
      // bodyStyle={{ minHeight: formatPxUnit('450px') }}
      maskStyle={{ background: 'rgba(45, 48, 54, 0.74)' }}
    >
      {props.title ? <div className="picker-title">{props.title}</div> : null}
      <div className="picker-body">
        <PickerView
          value={value}
          className="value-picker-view"
          columns={columns}
          onChange={(value: PickerValue[]) => {
            setPickerValue(value);
          }}
        />
      </div>
      <div className="picker-footer">
        <button onClick={() => onCancel && onCancel()}>{cancelText}</button>
        <button onClick={() => handleConfirm()}>{confirmText}</button>
      </div>
    </Popup>
  );
}
