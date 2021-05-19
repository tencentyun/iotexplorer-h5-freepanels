import React from 'react';
import classNames from 'classnames';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import { AirConditionerPanelLayout } from './AirConditionerPanelLayout';
import { PanelComponentProps } from "@src/entryWrap";
import './AirConditionerPanel.less';

export function AirConditionerPanel({
	deviceInfo,
	deviceData,
	offline,
	powerOff,
	templateMap,
	doControlDeviceData,
	onGoTimingProject,
	onGoDeviceDetail,
}: PanelComponentProps) {
	const transformShowMapping = (val) => {
		if (offline || powerOff) {
			return '-';
		}
		if (deviceData[val] || deviceData[val] === 0) {
			return templateMap[val].define.mapping[deviceData[val]]
		} else {
			return '-';
		}
	};

	const showTemperature = (tempC, defaultC) => {
		if (offline || powerOff) {
			return '-';
		}

		if (tempC) {
			return `${tempC}℃`;
		} else {
			return defaultC;
		}
	};

	const reduceTemperature = () => {
		if (offline || powerOff) {
			return;
		}

		let {
			define: {
				start = 26,
				min = 16,
			} = {},
		} = templateMap['set_temp'] || {};

		let originTemp = deviceData.set_temp || start;
		let newTemp = originTemp - 1;
		if (originTemp > min) {
			doControlDeviceData('set_temp', newTemp);
		} else {
			return;
		}
	};

	const raiseTemperature = () => {
		if (offline || powerOff) {
			return;
		}
		let {
			define: {
				start = 26,
				max = 30,
			} = {},
		} = templateMap['set_temp'] || {};

		let originTemp = Number(deviceData.set_temp || start);
		let newTemp = originTemp + 1;
		if (originTemp < max) {
			doControlDeviceData('set_temp', newTemp);
		} else {
			return;
		}
	};

	const WorkMode = {
		0: 'automatic',
		1: 'refrigeration',
		2: 'heating',
		3: 'dehumidification',
		4: 'dehumidification',
		5: 'automatic',
	};

	return (
		<AirConditionerPanelLayout
			className={classNames('free-air-conditioner-page', {
				'power-off': powerOff,
			})}
			title={deviceInfo.displayName}
			doControlDeviceData={doControlDeviceData}
			offline={offline}
			powerOff={powerOff}
			deviceData={deviceData}
			onGoTimingProject={onGoTimingProject}
			templateMap={templateMap}
		>
			<PanelMoreBtn
				onClick={onGoDeviceDetail}
				theme='dark'
			/>
			<div className="air-conditioner-container">
				<div className="air-conditioner-header">
					<img className="air-conditioner-image-top" src="https://main.qcloudimg.com/raw/9320f0258d26a1669df6c42884c22cd7.svg" alt="" />
					<div className={classNames('air-conditioner-image-bottom', `mode-${WorkMode[deviceData.work_mode || 1]}`, {
						'power-off': powerOff,
					})}>
						<div>
							<div className="air-conditioner-temperature">当前温度 {showTemperature(deviceData.current_temp, '26℃')}</div>
							<div className="air-conditioner-temperature-control-container">
								<span
									className="air-conditioner-temperature-control-button"
									onClick={() => { reduceTemperature() }}>-</span>
								<span className="air-conditioner-target-temperature">{showTemperature(deviceData.set_temp, '26℃')}</span>
								<span
									className="air-conditioner-temperature-control-button"
									onClick={() => { raiseTemperature() }}>+</span>
							</div>
						</div>
						<div className='air-conditioner-body'>
							<div className='air-conditioner-property-body'>
								<div className="air-conditioner-property">
									<div className="label">工作模式</div>
									<div className="value">{transformShowMapping('work_mode')}</div>
								</div>
								<div className="air-conditioner-property">
									<div className="label">风速</div>
									<div className="value">{transformShowMapping('fan_mode')}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AirConditionerPanelLayout>
	);
}
