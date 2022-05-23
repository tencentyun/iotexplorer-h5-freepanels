import React, { useMemo } from 'react';
import MultiPicker from 'rmc-picker/lib/MultiPicker';
import Picker from 'rmc-picker';
import './PickerViewGroup.less';
import { rpx2rem } from '@utillib';

export interface PickerViewGroupProps {
    value: string[];
    onChange: (value: string[]) => any;
    options: SelectorOption[][];
    itemHeight?: number; // 单位 rpx
    height?: number; // 单位rpx
    showDivider?: boolean;
    onScrollChange?: (value: string[]) => any;
}

export function PickerViewGroup({
  value,
  onChange,
  options,
  itemHeight = 80,
  height = 400,
  showDivider,
  onScrollChange,
}: PickerViewGroupProps) {
  const itemHeightRem = useMemo(() => rpx2rem(itemHeight), [itemHeight]);
  const heightRem = useMemo(() => rpx2rem(height), [height]);

  return (
        <MultiPicker
            selectedValue={value}
            onValueChange={onChange}
            onScrollChange={onScrollChange}
            style={{
              height: heightRem,
            }}
        >
            {options.map((itemGroup, groupIndex) => (
                <Picker
                    key={groupIndex}
                    indicatorStyle={{
                      height: itemHeightRem,
                      lineHeight: itemHeightRem,
                    }}
                    style={{
                      height: heightRem,
                    }}
                    itemStyle={{
                      height: itemHeightRem,
                      lineHeight: itemHeightRem,
                    }}
                >
                    {itemGroup.map(item => (
                        <Picker.Item
                            key={item.value}
                            value={item.value}
                        >
                            {item.text}
                        </Picker.Item>
                    ))}
                </Picker>
            ))}
            {showDivider ? (
                <div className='picker-view-divider'>-</div>
            ) : <div/>}
        </MultiPicker>
  );
}
