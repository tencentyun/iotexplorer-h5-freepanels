import ReactSlider from './Rangeslider';
import React from 'react';
import './Slider.less';

export interface SliderProps extends StyledProps {
	min: number;
	max: number;
	step: number;
	value: number;
	orientation: string;
	reverse: boolean;
	tooltip: boolean;
  alwaysShowTip: boolean;
	labels: { [labelValue: string]: string }; // 如： { 50: '半缸', 100: '满缸' }
	handleLabel: string; // handler里面的value
	format: (originValue: number) => string;
	onChangeStart: (any: any) => any;
	onChange: (value: number) => any;
	onChangeComplete: (any: any) => any;
}

export function Slider({
	min,
	max,
	step,
	value,
	orientation,
	reverse,
	tooltip = false,
  alwaysShowTip = false,
	labels,
	handleLabel,
	format,
	onChangeStart,
	onChange,
	onChangeComplete,
	className,
}: Partial<SliderProps>) {
	return (
		<ReactSlider
			className={className}
			{...{
				min,
				max,
				step,
				value,
				orientation,
				reverse,
				tooltip,
				labels,
				handleLabel,
				format,
				onChangeStart,
				onChange,
				onChangeComplete,
        alwaysShowTip
			}}
		/>
	)
}

