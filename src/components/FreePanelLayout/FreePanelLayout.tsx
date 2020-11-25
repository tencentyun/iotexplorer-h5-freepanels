import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';
import { FuncFooter } from '../FuncFooter';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './FreePanelLayout.less';

export interface FreePanelLayoutProps extends StyledProps {
	children: React.ReactNode;
	doControlDeviceData: DoControlDeviceData;
	offline: boolean;
	powerOff: boolean;
	title: string;
	deviceData: any;
	darkMode?: boolean;
	onGoTimingProject: () => any;
	onGoCountDown?: () => any;
	onSwitchChange?: () => any;
	onFreePanelFooterHeight?: (height) => any;
	isShareDevice?: boolean;
}

export function FreePanelLayout({
	children,
	className,
	style,
	doControlDeviceData,
	offline,
	powerOff,
	title,
	deviceData,
	darkMode,
	onGoTimingProject,
	onGoCountDown,
	onSwitchChange,
	onFreePanelFooterHeight,
	isShareDevice,
}: FreePanelLayoutProps) {
	useEffect(() => {
		if (offline) {
			sdk.offlineTip.show();
		} else {
			sdk.offlineTip.hide();
		}
	}, [offline]);

	return (
		<div
			className={classNames('free-panel-layout clearfix', className)}
			style={style}
		>
			<div
				className='free-panel-body clearfix'
				// style={{
				//   marginTop: pageHeaderHeight,
				// }}
			>
				{children}
			</div>

			<FuncFooter
				darkMode={darkMode}
				onGoTimingProject={onGoTimingProject}
				onGoCountDown={onGoCountDown}
				onSwitchChange={onSwitchChange}
				offline={offline}
				powerOff={powerOff}
				controlDeviceData={doControlDeviceData}
				countdown={deviceData.count_down as number}
				onFreePanelFooterHeight={onFreePanelFooterHeight}
				isShareDevice={isShareDevice}
			/>
		</div>
	);
}


