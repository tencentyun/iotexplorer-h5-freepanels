import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { Popup } from '@custom/Popup';
import { DatePickerView } from 'antd-mobile';
import { Precision } from 'antd-mobile/es/components/date-picker/date-picker-utils';
import './DatePicker.less';
import dayjs from 'dayjs';
export interface DimePickerProps extends StyledProps {
  visible?: boolean;
  value?: Date;
  min?: Date;
  max?: Date;
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
  precision?: Precision;
  mask?: boolean;
  onConfirm?: (value: Date, date: string) => void;
  onChange?: (value: string[]) => void;
  isPopUp?: boolean;
  itemHeight?: number;
  height?: number;
  showTwoDigit?: boolean; //
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
    precision,
    className,
    visible,
    title,
    value = defaultValue,
    mask = true,
    onChange,
    onCancel = () => ({}),
    onConfirm = () => ({}),
    isPopUp = true,
    min,
    max,
  } = props;

  const [pickerValue, setPickerValue] = useState(value);

  const handleConfirm = () => {
    onConfirm(pickerValue, dayjs(pickerValue).format('YYYY-MM-DD'));
  };

  const ref = useRef(null);

  const Com = isPopUp ? Popup : Container;

  // 跟流畅的动画
  const onChangeValue = (val) => {
    setPickerValue(val);
    onChange && onChange(val);
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
            className='date-picker-view'
            precision={precision}
            value={pickerValue}
            defaultValue={new Date}
            min={min}
            max={max}
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
