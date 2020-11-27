import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { SocketPanel } from './SocketPanel';
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
		<SocketPanel
			deviceInfo={deviceInfo}
			productInfo={productInfo}
			templateMap={templateMap}
			deviceData={deviceData}
			offline={offline}
			powerOff={powerOff}
			doControlDeviceData={doControlDeviceData}
		/>
	);
}

entryWrap(App);
