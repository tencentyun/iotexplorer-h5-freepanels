import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Popup } from '@custom/Popop';
import { DatePickerView } from '@custom/Picker';
import dayjs from 'dayjs';
export interface DimePickerProps extends StyledProps {
  visible?: boolean;
  value?: Date;
  title?: string;
  unit?: string;
  showUnit?: boolean;
  showTime?: boolean;
  isShowUnit?: boolean;
  cancelText?: string;
  showSemicolon?: boolean;
  selectFlag?: string;
  confirmText?: string;
  onCancel?: () => void;
  showTwoDigit?: boolean;
  mask?: boolean;
  onConfirm?: (value: Date, date: string) => void;
  onChange?: (value: string[]) => void;
  isPopUp?: boolean;
  itemHeight?: number;
  height?: number;
}

const Container = ({ children, className, ...props }) => (
  <div className={`${className} un-pop`} {...props}>
    {children}
  </div>
);
const defaultValue = new Date();
export function DatePicker(props: DimePickerProps) {
  const {
    cancelText = '取消',
    confirmText = '确认',
    className,
    visible,
    title,
    showSemicolon, // 是否显示分号
    value = defaultValue,
    mask = true,
    showTwoDigit = true,
    itemHeight = 58,
    height = 175,
    onChange,
    onCancel = () => ({}),
    onConfirm = () => ({}),
    isPopUp = true,
  } = props;

  const [pickerValue, setPickerValue] = useState(value);

  const handleConfirm = () => {
    onConfirm(pickerValue, dayjs(pickerValue).format('YYYY-MM-DD'));
  };

  const ref = useRef(null);

  const Com = isPopUp ? Popup : Container;

  // 跟流畅的动画
  const onChangeValue = (val) => {
    const date = dayjs(val.join('-')).$d;
    setPickerValue(date);
    onChange && onChange(date);
  };

  const onCancelClick = () => {
    setPickerValue(value);
    onCancel();
  };

  return (
    <div ref={ref} id="current-time">
      <Com
        className={classNames('cus-date-picker', className)}
        visible={visible}
        position="bottom"
        mask={mask}
        destroyOnClose={true}
        maskClassName="time-picker-popup-mask"
      >
        {title ? <div className="picker-header center">{title}</div> : null}
        <div className="picker-body">
          <DatePickerView
            value={pickerValue}
            itemHeight={itemHeight}
            height={height}
            showTwoDigit={showTwoDigit}
            showSemicolon={showSemicolon}
            onScrollChange={onChangeValue}
            onChange={onChangeValue}
          />
        </div>
        <div className="picker-footer">
          <button onClick={onCancelClick}>{cancelText}</button>
          <button onClick={handleConfirm}>{confirmText}</button>
        </div>
      </Com>
    </div>
  );
}
