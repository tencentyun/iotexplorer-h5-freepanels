import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { Popup } from 'antd-mobile';
import { TimePickerView } from '@components/business/Picker';
import { StyledProps } from '@libs/global';
import './TimePicker.less';

export interface TimePickerProps extends StyledProps {
  visible?: boolean;
  value?: string[];
  title?: string;
  // columns?: PickerProps['columns'];
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
  onConfirm?: (value: string[]) => void;
  isPopUp?: boolean;
  theme?: string;
}

const Container = ({ children, className, ...props }) => (
  <div className={`${className} un-pop`} {...props}>
    {children}
  </div>
);
const defaultValue = ['00', '00'];
export function TimePicker(props: TimePickerProps) {
  const {
    // columns = [renderClock(24), renderClock(60)],
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
    onCancel = () => ({}),
    onConfirm = () => ({}),
    isPopUp = true,
  } = props;
  const getDefaultValue = value => (value.length ? value : defaultValue);
  const [pickerValue, setPickerValue] = useState(getDefaultValue(value));

  const handleConfirm = () => {
    onConfirm(pickerValue as string[]);
    onCancel();
  };

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

  return (
    <div ref={ref} id="current-time">
      <Com
        className={classNames(
          'cus-time-picker',
          className,
          `time-picker-${props.theme}`,
        )}
        visible={visible}
        position="bottom"
        mask={mask}
        destroyOnClose={true}
        maskClassName="time-picker-popup-mask"
      >
        {title ? <div className="picker-header">{title}</div> : null}
        {showTime ? <div className="picker-show-time">{formatValue.join(':')}</div> : null}
        <div className="picker-body">
          <TimePickerView
            value={formatValue}
            itemHeight={114}
            height={343}
            showTwoDigit={showTwoDigit}
            showUnit={showUnit}
            showSemicolon={showSemicolon}
            onScrollChange={setPickerValue}
            onChange={setPickerValue}
          />
        </div>
        <div className="picker-footer">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={handleConfirm}>{confirmText}</button>
        </div>
      </Com>
    </div>
  );
}
