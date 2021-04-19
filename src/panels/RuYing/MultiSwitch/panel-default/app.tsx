import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { RuyingLa } from './FanPanel';
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
		<FanPanel
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
