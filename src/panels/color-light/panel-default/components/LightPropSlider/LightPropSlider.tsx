import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import './LightPropSlider.less';
import { Slider } from "@components/Slider/Slider";

export function LightPropSlider({
	icon,
	value,
	onChange,
	onChanging,
	templateConfig,
}: {
	icon: string;
	value?: number;
	onChange: (value: number) => any;
	onChanging?: (value: number) => any;
	templateConfig?: any;
}) {
	const [localValue, setLocalValue] = useState(0);

	const {
		max,
		min,
		step,
		unit,
	} = useMemo(() => {
		const { define = {} } = templateConfig || {};
		const {
			start = 0, max, min, step, unit,
		} = define;

		setLocalValue(typeof value === 'undefined' ? start : value);

		return {
			max: +max,
			min: +min,
			step: +step,
			unit,
		};
	}, [value, templateConfig]);

	return (
		<div
			className={classNames('light-slider-container')}
		>
			<img
				src={icon}
				className='light-slider-icon'
			/>
			<Slider
				className='light-slider'
				step={step}
				max={max}
				min={min}
				value={localValue}
				onChangeComplete={() => {
					onChange(localValue);
				}}
				onChange={(value) => {
					setLocalValue(value);
					if (typeof onChanging === 'function') {
						onChanging(value);
					}
				}}
			/>

			<div className='light-slider-value'>
				{localValue}{unit}
			</div>
		</div>
	);
}
