import React from 'react';
import classNames from 'classnames';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import { WaterHeaterPanelLayout } from './WaterHeaterPanelLayout';
import { PanelComponentProps } from "@src/entryWrap";
import './WaterHeaterPanel.less';

export function WaterHeaterPanel({
	deviceInfo,
	deviceData,
	offline,
	powerOff,
	templateMap,
	doControlDeviceData,
	onGoTimingProject,
	onGoDeviceDetail,
}: PanelComponentProps) {

	const transformShow = (val) => {
		if (deviceData[val] || deviceData[val] === 0) {
			return deviceData[val] + templateMap[val].define.unit;
		} else {
			return '-';
		}
	};


	const toTens = (value) => {
		if (value < 10) {
			return '0' + value;
		} else {
			return value;
		}
	}

	const second2HourMinuteGroup = (time, timeLatter) => {
		if ((!time || time <= 0) && !timeLatter || timeLatter <= 0) return '-';
		const hours = Math.floor(time / 3600);
		const minutes = Math.ceil((time - hours * 3600) / 60);
		const hoursLateer = Math.floor(timeLatter / 3600);
		const minutesLatter = Math.ceil((timeLatter - hoursLateer * 3600) / 60);
		const timeGroup = toTens(hours) + ':' + toTens(minutes) + ' ~ ' + toTens(hoursLateer) + ':' + toTens(minutesLatter);

		return timeGroup;
	}

	const transformShowMapping = (val) => {
		if (deviceData[val] || deviceData[val] === 0) {
			return templateMap[val].define.mapping[deviceData[val]]
		} else {
			return '-';
		}
	};

	const showTemperature = (tempC, tempF, defaultC, defaultF) => {
		if (deviceData.temp_unit_convert && deviceData.temp_unit_convert === 1) {
			if (tempF) {
				return `${tempF}℉`
			} else {
				return defaultF
			}
		} else { //默认展示摄氏度
			if (tempC) {
				return `${tempC}℃`
			} else {
				return defaultC
			}
		}
	};

	const reduceTemperature = () => {
		if (offline || powerOff) {
			return;
		}

		if (deviceData.temp_unit_convert && deviceData.temp_unit_convert === 1) {
			let {
				define: {
					start = 77,
					min = 68,
				} = {},
			} = templateMap['tempF_set'] || {};

			let originTemp = deviceData.tempF_set || start;
			let newTemp = originTemp - 1;
			if (originTemp > min) {
				doControlDeviceData('tempF_set', newTemp);
			} else {
				return;
			}

		} else {
			let {
				define: {
					start = 25,
					min = 20,
				} = {},
			} = templateMap['tempC_set'] || {};

			let originTemp = deviceData.tempC_set || start;
			let newTemp = originTemp - 1;
			if (originTemp > min) {
				doControlDeviceData('tempC_set', newTemp);
			} else {
				return;
			}
		}
	};

	const raiseTemperature = () => {
		if (offline || powerOff) {
			return;
		}
		if (deviceData.temp_unit_convert && deviceData.temp_unit_convert === 1) {
			let {
				define: {
					start = 77,
					max = 140,
				} = {},
			} = templateMap['tempF_set'] || {};
			let originTemp = Number(deviceData.tempF_set || start);
			let newTemp = originTemp + 1;
			console.log('##', originTemp, deviceData.tempF_set, start, newTemp, max)
			if (originTemp < max) {
				doControlDeviceData('tempF_set', newTemp);
			} else {
				return;
			}

		} else {
			let {
				define: {
					start = 25,
					max = 60,
				} = {},
			} = templateMap['tempC_set'] || {};

			let originTemp = Number(deviceData.tempC_set || start);
			let newTemp = originTemp + 1;
			if (originTemp < max) {
				doControlDeviceData('tempC_set', newTemp);
			} else {
				return;
			}
		}
	}

	return (
		<WaterHeaterPanelLayout
			className={classNames('free-water-heater-page', {
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
			<div className="water-heater-container">
				<div className="water-heater-header">
					<img className="water-heater-logo" src="https://main.qcloudimg.com/raw/329dceeffef2edc75f945e9fb918d4e0.png" alt="" />
					<div className="water-heater-temperature">当前温度 {showTemperature(deviceData.tempC_current, deviceData.tempF_current, '-', '-')}</div>
					<div className="water-heater-temperature-control-container">
						<span
							className="water-heater-temperature-control-button"
							onClick={() => { reduceTemperature() }}>-</span>
						<span className="water-heater-target-temperature">{showTemperature(deviceData.tempC_set, deviceData.tempF_set, '25℃', '77℉')}</span>
						<span
							className="water-heater-temperature-control-button"
							onClick={() => { raiseTemperature() }}>+</span>
					</div>
				</div>
				<div className='water-heater-body'>
					<div className='water-heater-property-body'>
						<div className="water-heater-property">
							<div className="label">功率模式</div>
							<div className="value">{transformShowMapping('capacity_mode')}</div>
						</div>
						<div className="water-heater-property">
							<div className="label">剩余水量</div>
							<div className="value">{transformShow('surplus_water')}</div>
						</div>
						<div className="water-heater-property">
							<div className="label">工作状态</div>
							<div className="value">{transformShowMapping('work_state')}</div>
						</div>
					</div>
					<div className='water-heater-property-body'>
						<div className="water-heater-property">
							<div className="label">使用时长</div>
							<div className="value">{transformShow('total_runtime')}</div>
						</div>
						<div className="water-heater-property">
							<div className="label">用水时间</div>
							<div className="value">{second2HourMinuteGroup(deviceData.water_consum && deviceData.water_consum.start_time, deviceData.water_consum && deviceData.water_consum.completion_time)}</div>
						</div>
						<div className="water-heater-property">
							<div className="label">耗电量</div>
							<div className="value">{transformShow('power_consumption')}</div>
						</div>
					</div>
				</div>
			</div>
		</WaterHeaterPanelLayout>
	);
}
