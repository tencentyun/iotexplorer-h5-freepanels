import React from 'react';
import ReactSwitch from "react-switch";
import './Switch.less';

export interface SwitchProps extends StyledProps {
	checked: boolean;
	onChange: (checked: boolean) => any;
  disabled: boolean;
}

export function Switch({
	checked,
	onChange,
	className,
  disabled
}: SwitchProps) {
	return (
		<div className={className}>
			<ReactSwitch
        disabled={disabled}
				checked={checked}
				onChange={onChange}
				onColor="#0066ff"
				offColor='#fff'
				boxShadow="0px 0px 2px rgba(0, 0, 0, 0.6)"
				onHandleColor="#fff"
				offHandleColor='#fff'
				handleDiameter={30}
				uncheckedIcon={false}
				checkedIcon={false}
				activeBoxShadow='none'
				height={32}
				width={54}
				className="freepanel-switch"
			/>
		</div>
	);
}
