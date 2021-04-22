import React, { useMemo } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { entryWrap } from "@src/entryWrap";
import { WisdomControlPanel } from './panel';

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
		<WisdomControlPanel
			deviceData={deviceData}
			offline={false}
			powerOff={false}
			doControlDeviceData={doControlDeviceData}
		/>
	);
}

entryWrap(App);
