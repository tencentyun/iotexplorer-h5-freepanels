import React, { useState } from 'react';
// import { ControledSwitch } from '@components/ControledSwitch';
import { Modal } from '@components/Modal';
// import { TimePickerView, usePickerControl } from '@components/Picker';
import './TimePeriodSetting.less';
import { Switch } from "@components/Switch";
import { TimePickerView } from "@components/Picker";
import { usePickerControl } from "@hooks/usePickerControl";

export const second2HourMinute = (countdown = 0): [number, number] => {
	if (!countdown || countdown <= 0) return [0, 0];

	const hours = Math.floor(countdown / 3600);
	const minutes = Math.ceil((countdown - hours * 3600) / 60);

	return [hours, minutes];
};

export const hourMinute2Second = ([hours, minutes]: number[]): number => hours * 3600 + minutes * 60;

export const hourMinute2SecondGroup = ([hours, minutes, hoursLatter, minutesLatter]: number[]): number[] => [hours * 3600 + minutes * 60, hoursLatter * 3600 + minutesLatter * 60];

export interface TimePeriodSettingProps extends StyledProps {
	visible: boolean;
	value: number[];
	onCancel: any;
	onConfirm: ({ enable, value }: { enable: boolean; value: number[] }) => any;
}

export function TimePeriodSetting({
	visible,
	value,
	onCancel,
	onConfirm,
}: TimePeriodSettingProps) {
	const [countdownEnable, setCountdownEnable] = useState(true);

	const [{ value: localValue }, {
		onChange,
		onScrollChange,
		doSubmit,
	}] = usePickerControl<number>({
		onSubmit(value) {
			console.log('/////', value, hourMinute2SecondGroup(value))
			onConfirm({
				enable: countdownEnable,
				value: hourMinute2SecondGroup(value),
			});
		},
		initValue: value,
	});

	return (
		<Modal
			containerClassName='countdown-setting-modal'
			visible={visible}
			fixedBottom={true}
			title={(
				<div className='countdown-header'>
					预约用水
					<Switch
						checked={countdownEnable}
						onChange={setCountdownEnable}
						className='countdown-header-switch'
					/>
				</div>
			)}
			onClose={onCancel}
		>
			<Modal.Body>
				<div className='countdown-setting-body'>
					<TimePickerView
						value={localValue}
						onScrollChange={onScrollChange}
						onChange={onChange}
						itemHeight={96}
						height={544}
						showUnit={true}
						isTimeRange={true}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Modal.FooterConfirmBtnGroup
					{...{
						onCancel,
						onConfirm: doSubmit,
						confirmText: '保存',
						isInFixedBottomModal: true,
						cancelText: '取消',
					}}
				/>
			</Modal.Footer>
		</Modal>
	);
}
