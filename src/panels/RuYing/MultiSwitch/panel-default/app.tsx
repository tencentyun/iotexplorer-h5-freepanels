import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { MultiSwitchPanel } from './MultiSwitchPanel';
import { entryWrap } from "@src/entryWrap";

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
		<MultiSwitchPanel
			deviceInfo={deviceInfo}
			productInfo={productInfo}
			templateMap={templateMap}
			deviceData={deviceData}
			offline={false}
			powerOff={false}
			doControlDeviceData={doControlDeviceData}
		/>
	);
}

entryWrap(App);
