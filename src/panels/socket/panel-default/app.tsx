import React, { useEffect } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { SocketPanel } from './SocketPanel';
import { entryWrap } from "@src/entryWrap";
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import * as wxlib from '@wxlib';

function App() {
	const [{
		deviceInfo,
		deviceData,
		productInfo,
		templateMap,
		offline,
		powerOff,
	}, { doControlDeviceData }] = useDeviceInfo();

	return (
		<SocketPanel
			deviceInfo={deviceInfo}
			productInfo={productInfo}
			templateMap={templateMap}
			deviceData={deviceData}
			offline={offline}
			powerOff={powerOff}
			doControlDeviceData={doControlDeviceData}
			onGoDeviceDetail={() => {
				sdk.goDeviceDetailPage();
			}}
			onGoTimingProject={() => {
				wxlib.router.go('/pages/Device/TimingProject/TimingProjectList/TimingProjectList', {
					deviceId: sdk.deviceId,
				});
			}}
		/>
	);
}

entryWrap(App);
