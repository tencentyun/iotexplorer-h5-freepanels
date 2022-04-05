import React from 'react';
import MultiPicker from 'rmc-picker/lib/MultiPicker';
import Picker from 'rmc-picker';

export interface OptionProps {
  text: string;
  value: number;
}
export interface PickerViewGroupProps {
  value: string[] | number[];
  onChange: ((value: string[]) => void) | undefined;
  options: SelectorOption[][] | OptionProps[][];
  itemHeight?: string; // 单位 px
  height?: string; // 单位px
  showDivider?: boolean;
  className?: string;
  onScrollChange?: (value: string[]) => void;
}

export function PickerViewGroup({
  value,
  onChange,
  options,
  itemHeight = '132px',
  height = '869px',
  showDivider,
  className,
  onScrollChange,
}: PickerViewGroupProps) {
  return (
    <MultiPicker
      className={className}
      selectedValue={value}
      onValueChange={onChange}
      onScrollChange={onScrollChange}
      style={{ height }}
    >
      {options.map((itemGroup, groupIndex) => (
        <Picker
          key={groupIndex}
          indicatorStyle={{
            height: itemHeight,
            lineHeight: itemHeight,
          }}
          style={{ height }}
          itemStyle={{ height: itemHeight, lineHeight: itemHeight }}
        >
          {itemGroup.map(item => (
            <Picker.Item key={item.value} value={item.value}>
              {item.text}
            </Picker.Item>
          ))}
        </Picker>
      ))}
      {showDivider ? <div className="picker-view-divider">-</div> : <div />}
    </MultiPicker>
  );
}
