import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Popup } from '@custom/Popop';
import { Switch } from '@custom/Switch';
import { TimePickerView } from '@custom/Picker';
export interface TimePickerProps extends StyledProps {
  visible?: boolean;
  value?: string[];
  title?: string;
  unit?: string;
  showUnit?: boolean;
  showTime?: boolean;
  isTimeRange?: boolean;
  isShowUnit?: boolean;
  cancelText?: string;
  showSemicolon?: boolean;
  selectFlag?: string;
  confirmText?: string;
  onCancel?: () => void;
  showTwoDigit?: boolean;
  mask?: boolean;
  onConfirm?: (value: string[], isChecked: boolean) => void;
  onChange?: (value: string[]) => void;
  isPopUp?: boolean;
  isShowSwitch?: boolean;
  switchIsOpen?: boolean;
  onSwitchChange?: (value: boolean) => void;
  itemHeight?: number;
  height?: number;
}

const Container = ({ children, className, ...props }) => (
  <div className={`${className} un-pop`} {...props}>
    {children}
  </div>
);
const defaultValue = ['00', '00'];
export function TimePicker(props: TimePickerProps) {
  const {
    cancelText = '取消',
    confirmText = '保存',
    showTime = true,
    className,
    visible,
    title,
    showUnit, // 是否显示时、分的单位
    showSemicolon, // 是否显示分号
    value,
    mask = true,
    showTwoDigit = true,
    itemHeight = 115,
    height = 345,
    onChange,
    onCancel = () => ({}),
    onConfirm = () => ({}),
    isPopUp = true,
    isShowSwitch = false,
    switchIsOpen,
    isTimeRange,
    onSwitchChange
  } = props;
  const getDefaultValue = (value) => (value.length ? value : defaultValue);
  const [pickerValue, setPickerValue] = useState(getDefaultValue(value));
  const [isChecked, setChecked] = useState(switchIsOpen);
  const handleConfirm = () => {
    onConfirm(pickerValue as string[], isChecked as boolean);
  };
  useEffect(() => {
    setChecked(switchIsOpen);
  }, [switchIsOpen, visible]);

  useEffect(() => {
    setPickerValue(getDefaultValue(value));
    return () => {
      setPickerValue(defaultValue);
    };
  }, [value]);

  const time = pickerValue.length ? pickerValue : defaultValue;
  const ref = useRef(null);

  const Com = isPopUp ? Popup : Container;

  let formatValue = time;
  if (showTwoDigit) {
    formatValue = time.map((v: string) => (parseInt(v, 10) < 10 ? `0${parseInt(v, 10)}` : v));
  }
  // 跟流畅的动画
  const onChangeValue = (val) => {
    setPickerValue(val);
    onChange && onChange(val);
  };

  return (
    <div ref={ref} id="current-time">
      <Com
        className={classNames('cus-time-picker', className, isTimeRange ? 'cus-time-picker-range' : '')}
        visible={visible}
        position="bottom"
        mask={mask}
        destroyOnClose={true}
        maskClassName="time-picker-popup-mask"
      >
        {title ? <div className="picker-header center">{title}</div> : null}
        {showTime ? <div className="picker-show-time">{formatValue.join(':')}</div> : null}
        <div className="picker-body">
          <TimePickerView
            value={formatValue}
            itemHeight={itemHeight}
            height={height}
            isTimeRange={isTimeRange}
            showTwoDigit={showTwoDigit}
            showUnit={showUnit}
            showSemicolon={showSemicolon}
            onScrollChange={onChangeValue}
            onChange={onChangeValue}
          />
        </div>
        {isShowSwitch ? (
          <div className="picker-action">
            <span>倒计时开关</span>
            <Switch checked={isChecked} onChange={onSwitchChange || setChecked} />
          </div>
        ) : null}

        <div className="picker-footer">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={handleConfirm}>{confirmText}</button>
        </div>
      </Com>
    </div>
  );
}
