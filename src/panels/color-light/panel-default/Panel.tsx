import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Tabs } from '@components/Tabs';
import { UseDeviceInfoHandler } from '@hooks/useDeviceInfo';
// import { WhiteLightTab, ColorLightTab, SceneTab } from './Tabs';
import { FreePanelLayout } from '@components/FreePanelLayout';
import { UseFreePanelDeviceInfo } from '@hooks/useFreePanelDeviceInfo';
// import { CountDownId, getCountdownStr, WorkModeId } from '../constants';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import lightLogo from './images/light.svg';
import './Panel.less';
import { CountDownId, WorkModeId } from "@src/panels/color-light/panel-default/constants";
import { getCountdownStr } from "@components/FuncFooter";

export interface TabProps extends UseFreePanelDeviceInfo, UseDeviceInfoHandler {
	margin?: number;
}

enum WorkMode {
	WhiteLight,
	ColorLight,
	Scene,
}

export interface LightPanelProps extends UseFreePanelDeviceInfo, UseDeviceInfoHandler {
	onGoTimingProject: () => any;
	onGoDeviceDetail: () => any;
}

export function Panel({
	deviceInfo,
	productInfo,
	templateMap,
	productConfig,
	deviceData,
	offline,
	powerOff,
	doControlDeviceData,
	onGoTimingProject,
	onGoDeviceDetail,
	isShareDevice,
}: LightPanelProps) {
	const [currentTab, setCurrentTab] = useState<WorkMode>(WorkMode.WhiteLight);
	// const { pageHeaderHeight, windowHeight, ipx } = useSystemInfo();

	// const footerHeight = useMemo(() => rpx2px(ipx ? 256 : 188), []);
	//
	// // 上下间隙等分, TODO: 位置不太对
	// const margin = useMemo(() => {
	// 	const containerHeight = windowHeight - pageHeaderHeight - rpx2px(90) - footerHeight;
	//
	// 	return (containerHeight - rpx2px(492 + 100 + 20 + 76 * 2)) / 2;
	// }, [footerHeight]);
	//
	const tabProps: TabProps = {
		deviceInfo,
		productInfo,
		templateMap,
		productConfig,
		deviceData,
		offline,
		powerOff,
		doControlDeviceData,
		margin,
	};
	//
	// useEffect(() => {
	// 	if (typeof deviceData[WorkModeId] !== 'undefined') {
	// 		setCurrentTab(deviceData[WorkModeId]);
	// 	}
	// }, [deviceData[WorkModeId]]);

	const tabList = [
		{
			tabKey: WorkMode.WhiteLight,
			// component: <WhiteLightTab {...tabProps} />,
			component: <div>white light</div>
		},
		{
			tabKey: WorkMode.ColorLight,
			// component: <ColorLightTab {...tabProps} />,
			component: <div>color light</div>
		},
		{
			tabKey: WorkMode.Scene,
			// component: <SceneTab {...tabProps} />,
			component: <div>scene</div>
		},
	];

	return (
		<FreePanelLayout
			darkMode
			className={classNames('free-light-page', {
				'power-off': powerOff,
			})}
			isShareDevice={isShareDevice}
			title={deviceInfo.displayName}
			doControlDeviceData={doControlDeviceData}
			offline={offline}
			powerOff={powerOff}
			deviceData={deviceData}
			onGoTimingProject={onGoTimingProject}
		>
			{powerOff ? (
				<PowerOffPlaceHolder
					onGoDeviceDetail={onGoDeviceDetail}
					placeholder={
						(!offline && deviceData[CountDownId] && deviceData[CountDownId] > 0)
							? getCountdownStr(deviceData[CountDownId], powerOff)
							: null
					}
				/>
			) : (
				<Tabs
					activeColor='#fff'
					style={{ background: 'none' }}
					tabList={[
						{ key: WorkMode.WhiteLight, label: '白光' },
						{ key: WorkMode.ColorLight, label: '彩光' },
						{ key: WorkMode.Scene, label: '场景' },
					]}
					currentTab={currentTab}
					onTabChange={tabKey => doControlDeviceData(WorkModeId, tabKey)}
				>
					<PanelMoreBtn
						style={{ top: '90rpx' }}
						onClick={onGoDeviceDetail}
						theme='dark'
					/>

					{tabList.map(item => (
						<Tabs.Panel
							key={item.tabKey}
							tabKey={item.tabKey}
							currentTab={currentTab}
							keepAlive={false}
						>
							{item.component}
						</Tabs.Panel>
					))}

					{deviceData[CountDownId] > 0 && (
						<div
							className='countdown-fixed-footer'
							style={{
								bottom: footerHeight + rpx2px(32),
							}}
						>
							{getCountdownStr(deviceData[CountDownId], powerOff)}
						</div>
					)}
				</Tabs>
			)}
		</FreePanelLayout>
	);
}

const PowerOffPlaceHolder = ({
	placeholder,
	onGoDeviceDetail,
}: {
	placeholder?: string | React.ReactNode;
	onGoDeviceDetail: () => any;
}) => (
	<div className='power-off-placeholder'>
		<PanelMoreBtn
			onClick={onGoDeviceDetail}
			theme='dark'
		/>
		<img
			className='power-off-logo'
			src={lightLogo}
		/>
		<div className='power-off-placeholder-content'>
			{placeholder}
		</div>
	</div>
);
