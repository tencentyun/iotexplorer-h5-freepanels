import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { AirConditionerPanel } from './AirConditionerPanel';
import { entryWrap } from "@src/entryWrap";
import { Subpage } from './Subpage'
import {
	HashRouter,
	Switch,
	Route,
} from "react-router-dom";

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
		<HashRouter>
			<div>
				<Switch>
					<Route
						path="/air-conditioner-subpage"
					>
						<Subpage
							deviceData={deviceData}
							doControlDeviceData={doControlDeviceData}
							templateMap={templateMap}
						/>
					</Route>
					<Route path="/">
						<AirConditionerPanel
							deviceInfo={deviceInfo}
							productInfo={productInfo}
							templateMap={templateMap}
							deviceData={deviceData}
							offline={offline}
							powerOff={powerOff}
							doControlDeviceData={doControlDeviceData}
						/>
					</Route>
				</Switch>
			</div>
		</HashRouter>

	);
}

entryWrap(App);
