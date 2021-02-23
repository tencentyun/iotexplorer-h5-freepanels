import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { WaterHeaterPanel } from './WaterHeaterPanel';
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
						path="/water-heater-subpage"
					>
						<Subpage
							deviceData={deviceData}
							doControlDeviceData={doControlDeviceData}
							templateMap={templateMap}
						/>
					</Route>
					<Route path="/">
						<WaterHeaterPanel
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
