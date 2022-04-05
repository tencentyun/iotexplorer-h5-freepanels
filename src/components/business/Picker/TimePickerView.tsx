import React, { useMemo } from 'react';
import { PickerViewGroup, PickerViewGroupProps } from '@components/business/Picker/PickerViewGroup';
// import { rpx2rem } from '@utillib';

const genArr = (count, start = 0) => Array(...new Array(count)).map((a, index) => index + start);
const getHour = (showTwoDigit = false) => genArr(24).map(h => (h < 10 ? `${showTwoDigit ? '0' : ''}${h}` : String(h)));
const getMinute = (showTwoDigit = false) => genArr(60).map(m => (m < 10 ? `${showTwoDigit ? '0' : ''}${m}` : String(m)));

const px2vw = (px: number): string | number => {
  const vw = px * (100 / 1125);

  if (px === 0) {
    return px;
  }
  return `${vw.toFixed(3)}vw`;
};

export interface TimePickerViewProps extends Omit<PickerViewGroupProps, 'options' | 'value' | 'onChange'> {
  value: string[];
  onChange?: (value: string[]) => any;
  isTimeRange?: boolean;
  itemHeight?: number; // px
  height?: number; // px
  showUnit?: boolean;
  className?: string;
  hourUnit?: string;
  showSemicolon?: boolean;
  selectFlag?: string;
  minuteUnit?: string;
  showTwoDigit?: boolean;
}

export function TimePickerView({
  value,
  onChange,
  isTimeRange = false, // 时间范围
  // itemHeight = '132px',
  // itemHeight = '2.75rem',
  // height = '429px',
  // height = '8.9375em',
  itemHeight = 44,
  height = 143,
  showUnit,
  hourUnit,
  minuteUnit,
  showTwoDigit,
  showSemicolon,
  onScrollChange,
  className = '',
  ...props
}: TimePickerViewProps) {
  // pickerView 不支持 rpx
  const options = useMemo(() => {
    const hours = getHour(showTwoDigit);
    const minutes = getMinute(showTwoDigit);

    const hourOptions = hours.map(h => ({
      text: `${h}${showUnit ? hourUnit || '时' : ''}`,
      value: h,
    }));
    const minuteOptions = minutes.map(m => ({
      text: `${m}${showUnit ? minuteUnit || '分' : ''}`,
      value: m,
    }));

    let options = [hourOptions, minuteOptions];

    if (isTimeRange) {
      options = options.concat([hourOptions, minuteOptions]);
    }

    return options;
  }, [showTwoDigit, isTimeRange]);

  // select-flag 箭头表示
  const clsName = `select-flag ${className} ${showSemicolon ? ' semicolon' : ''}`;

  let formatValue = value;
  if (showTwoDigit) {
    formatValue = value.map((v: string) => (parseInt(v, 10) < 10 ? `0${parseInt(v, 10)}` : v));
  }

  return (
    <PickerViewGroup
      options={options}
      onChange={onChange}
      height={px2vw(height)}
      itemHeight={px2vw(itemHeight)}
      value={formatValue}
      onScrollChange={onScrollChange}
      showDivider={isTimeRange}
      {...props}
      className={clsName}
    />
  );
}
