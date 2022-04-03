import React, { useEffect, useState } from 'react';
import { PickerViewGroup } from '@custom/Picker';
import { rpx2rem } from '@utillib';
import dayjs from 'dayjs';
import { getYears, getMouths, getDays } from './utils';
export interface DatePickerViewProps {
  value: Date;
  max: Date; // 选择的最大日期
  min: Date; // 选择的最小日期
  onChange?: (value: string[]) => void;
  isTimeRange?: boolean;
  itemHeight?: number; // px
  height?: number; // px
  dayUnit?: string;
  mouthUnit?: string;
  yearUnit?: string;
  className?: string;
  showSemicolon?: boolean;
  selectFlag?: string;
  onScrollChange?: (value: string[]) => void;
  showTwoDigit?: boolean;
}

export interface OptionProps {
  text: string;
  value: number;
}

const [defaultMin, defaultMax] = [dayjs()?.$d as Date, dayjs(0)?.$d as Date];

export function DatePickerView({
  value = defaultMax,
  max = defaultMin, // 默认当前时间
  min = defaultMax, // 默认开始时间
  onChange,
  isTimeRange = false, // 时间范围
  itemHeight = 44,
  height = 143,
  yearUnit = '年',
  mouthUnit = '',
  dayUnit = '',
  showTwoDigit = true,
  showSemicolon,
  onScrollChange,
  className = '',
  ...props
}: DatePickerViewProps) {
  const [options, setOption] = useState<OptionProps[][]>([] as OptionProps[][]);
  const [date, setDate] = useState<number[]>([] as number[]);

  useEffect(() => {
    const d = dayjs(value);
    setOption([
      getYears(min, max, yearUnit, showTwoDigit),
      getMouths(mouthUnit, showTwoDigit),
      getDays(dayUnit, showTwoDigit, d.$d),
    ]);
    setDate([d.$y, d.$M + 1, d.$D]);
  }, [min, max, value]);

  const clsName = `select-flag ${className} ${
    showSemicolon ? ' semicolon' : ''
  }`;

  return (
    <PickerViewGroup
      options={options}
      onChange={onChange}
      height={rpx2rem(height)}
      itemHeight={rpx2rem(itemHeight)}
      value={date}
      onScrollChange={onScrollChange}
      showDivider={isTimeRange}
      {...props}
      className={clsName}
    />
  );
}
