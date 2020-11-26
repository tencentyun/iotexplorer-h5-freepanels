import React, { useMemo } from 'react';
import { PickerViewGroup, PickerViewGroupProps } from '@components/Picker';

// @ts-ignore
const genArr = (count, start = 0) => Array(...new Array(count)).map((a, index) => index + start);
const getHour = (showTwoDigit = false) => genArr(24).map(h => (h < 10 ? `${showTwoDigit ? '0' : ''}${h}` : String(h)));
const getMinute = (showTwoDigit = false) => genArr(60).map(m => (m < 10 ? `${showTwoDigit ? '0' : ''}${m}` : String(m)));

export interface TimePickerViewProps extends Omit<PickerViewGroupProps, 'options' | 'value' | 'onChange'> {
	value: number[];
	onChange: (value: number[]) => any;
	isTimeRange?: boolean;
	itemHeight?: number; // 单位 rpx
	height?: number; // 单位rpx
	showUnit?: boolean;
	hourUnit?: string;
	minuteUnit?: string;
	showTwoDigit?: boolean;
}

export function TimePickerView({
	value,
	onChange,
	isTimeRange = false, // 时间范围
	itemHeight = 80,
	height = 400,
	showUnit,
	hourUnit,
	minuteUnit,
	showTwoDigit,
	...props
}: TimePickerViewProps) {
	// pickerView 不支持 rpx
	const options = useMemo(() => {
		const hours = getHour(showTwoDigit);
		const minutes = getMinute(showTwoDigit);

		const hourOptions = hours.map(h => ({
			text: `${h}${showUnit ? (hourUnit || ' 时') : ''}`,
			value: h,
		}));
		const minuteOptions = minutes.map(m => ({
			text: `${m}${showUnit ? (minuteUnit || ' 分') : ''}`,
			value: m,
		}));

		let options = [hourOptions, minuteOptions];

		if (isTimeRange) {
			options = options.concat([hourOptions, minuteOptions]);
		}

		return options;
	}, [showTwoDigit, isTimeRange]);

	return (
		<PickerViewGroup
			options={options}
			onChange={value => onChange(value.map(v => +v))}
			height={height}
			itemHeight={itemHeight}
			value={value.map(v => String(v))}
			showDivider={isTimeRange}
			{...props}
		/>
	);
}

