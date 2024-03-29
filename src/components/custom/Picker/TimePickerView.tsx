import React, { useMemo } from 'react';
import { PickerViewGroup, PickerViewGroupProps } from '@custom/Picker';
import { rpx2rem } from '@utillib';

const genArr = (count, start = 0) => Array(...new Array(count)).map((a, index) => index + start);
const getHour = (showTwoDigit = false) => genArr(24).map(h => (h < 10 ? `${showTwoDigit ? '0' : ''}${h}` : String(h)));
const getMinute = (showTwoDigit = false) => genArr(60).map(m => (m < 10 ? `${showTwoDigit ? '0' : ''}${m}` : String(m)));
const getSecond = (showTwoDigit = false) => genArr(60).map(m => (m < 10 ? `${showTwoDigit ? '0' : ''}${m}` : String(m)));

export interface TimePickerViewProps
  extends Omit<PickerViewGroupProps, 'options' | 'value' | 'onChange'> {
  value: string[];
  onChange?: (value: string[]) => void;
  isTimeRange?: boolean;
  itemHeight?:  string | undefined; // px
  height?: string | undefined; // px
  showUnit?: boolean;
  className?: string;
  hourUnit?: string;
  showSemicolon?: boolean;
  selectFlag?: string;
  minuteUnit?: string;
  showTwoDigit?: boolean;
  isSecond?:boolean; // 支持秒选择
}

export function TimePickerView({
  value,
  onChange,
  isTimeRange = false, // 时间范围
  // itemHeight = '132px',
  // itemHeight = '2.75rem',
  // height = '429px',
  // height = '8.9375em',
  itemHeight = '44',
  height = '143',
  showUnit,
  hourUnit,
  minuteUnit,
  showTwoDigit,
  isSecond,
  showSemicolon,
  onScrollChange,
  className = '',
  ...props
}: TimePickerViewProps) {
  // pickerView 不支持 rpx
  const options = useMemo(() => {
    const hours = getHour(showTwoDigit);
    const minutes = getMinute(showTwoDigit);
    const seconds = getSecond(showTwoDigit);

    const hourOptions = hours.map(h => ({
      text: `${h}${showUnit ? hourUnit || ' 时' : ''}`,
      value: h,
    }));
    const minuteOptions = minutes.map(m => ({
      text: `${m}${showUnit ? minuteUnit || ' 分' : ''}`,
      value: m,
    }));
    const secondsOptions = seconds.map(m => ({
      text: `${m}${showUnit ? minuteUnit || ' 秒' : ''}`,
      value: m,
    }));

    let options = [hourOptions, minuteOptions];
    if (isSecond) {
      options.push(secondsOptions);
    }

    if (isTimeRange) {
      options = options.concat([hourOptions, minuteOptions]);
    }

    return options;
  }, [showTwoDigit, isTimeRange]);

  const secondCls = isSecond ? 'second-cls' : '';
  // select-flag 箭头表示
  const clsName = `select-flag ${className} ${
    showSemicolon ? ' semicolon' : ''
  } ${secondCls}`;

  let formatValue = value;
  if (showTwoDigit) {
    formatValue = value.map((v: string) => (parseInt(v, 10) < 10 ? `0${parseInt(v, 10)}` : v));
  }

  return (
    <PickerViewGroup
      options={options}
      onChange={onChange}
      height={rpx2rem(height)}
      itemHeight={rpx2rem(itemHeight)}
      value={formatValue}
      onScrollChange={onScrollChange}
      showDivider={isTimeRange}
      {...props}
      className={clsName}
    />
  );
}
