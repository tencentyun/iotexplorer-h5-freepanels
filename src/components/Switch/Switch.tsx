import React from 'react';
import ReactSwitch from "react-switch";
import './Switch.less';

export interface SwitchProps extends StyledProps {
	checked: boolean;
	onChange: (checked: boolean) => any;
	height?: number,
	width?: number,
	handleDiameter?: number,
}

export function Switch({
	checked,
	onChange,
	className,
	height = 32,
	width = 54,
	handleDiameter = 30,
}: SwitchProps) {
	return (
		<div className={className}>
			<ReactSwitch
				checked={checked}
				onChange={onChange}
				onColor="#0066ff"
				offColor='#fff'
				boxShadow="0px 0px 2px rgba(0, 0, 0, 0.6)"
				onHandleColor="#fff"
				offHandleColor='#fff'
				handleDiameter={handleDiameter}
				uncheckedIcon={false}
				checkedIcon={false}
				activeBoxShadow='none'
				height={height}
				width={width}
				className="freepanel-switch"
			/>
		</div>
	);
}
