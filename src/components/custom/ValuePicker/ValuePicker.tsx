/*
 * @Description: 数值选择器
 */
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Popup } from '@custom/Popup';
import { PickerViewGroup, PickerViewGroupProps } from '@custom/Picker';
import { rpx2rem } from '@utillib';

interface OptionProps {
  text: string;
  value: number;
}

export interface ValueSelectProps {
  className?: string;
  visible?: boolean;
  title?: string;
  value: string[] | number[];
  optionsValue: string[] | number[];
  isTimeRange?: boolean;
  itemHeight?:  string | undefined; // px
  height?: string | undefined; // px
  onCancel?: () => void;
  onConfirm?: (value: string[] | number[]) => void;
}

export interface ValueSelectProps
  extends Omit<PickerViewGroupProps, 'options' | 'value' | 'onChange'> {
  className?: string;
  visible?: boolean;
  title?: string;
  value: string[] | number[];
  optionsValue: string[] | number[];
  isTimeRange?: boolean;
  itemHeight?:  string | undefined; // px
  height?: string | undefined; // px
  onCancel?: () => void;
  onConfirm?: (value: string[] | number[]) => void;
}

export function ValuePicker(props: ValueSelectProps) {
  const {
    className = '',
    value,
    optionsValue,
    itemHeight = '58',
    height = '175',
    onCancel,
    onConfirm,
  } = props;
  const [pickerValue, setPickerValue] = useState(value);

  const handleConfirm = () => {
    onConfirm && onConfirm(pickerValue);
    onCancel && onCancel();
  };

  useMemo(() => {
    console.log('useMemo');
    setPickerValue(props.value);
  }, [props.value]);

  const optionsList = useMemo(() => {
    const options: OptionProps[] = [];

    optionsValue.map((item) => {
      const obj: OptionProps = {
        text: item.toString(),
        value: item,
      };
      return options.push(obj);
    });

    return options;
  }, []);

  const onChangeValue = (item) => {
    console.log(item, 'item===onChange');
    setPickerValue(item);
    // onChangeValue && onChangeValue(item);
  };

  const onScrollChange = (item) => {
    console.log(item, 'item===onScrollChange');
  };

  const formatValue = optionsValue;

  return (
    <Popup
      className={classNames(
        'cus-value-picker',
        props.className,
      )}
      visible={props.visible}
      position="bottom"
    >
      <div className="picker-header">
        <button onClick={() => onCancel && onCancel()}>取消</button>
        {props.title ? <div className="picker-title">{props.title}</div> : null}
        <button onClick={() => handleConfirm()}>确认</button>
      </div>
      <div className="picker-body">
        <PickerViewGroup
          className={className}
          value={value}
          options={[optionsList]}
          height={rpx2rem(height)}
          itemHeight={rpx2rem(itemHeight)}
          onChange={onChangeValue}
          // onScrollChange={onScrollChange}
        />
      </div>
    </Popup>
  );
}

