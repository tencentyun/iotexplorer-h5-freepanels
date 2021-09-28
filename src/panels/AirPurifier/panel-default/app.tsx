import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { AirPurifierPanel } from './AirPurifierPanel';
import { entryWrap } from "@src/entryWrap";
import { FilterReset } from './FilterReset';
import {
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";
import { StatusTip } from "@components/StatusTip";

function App() {
  const [{
    deviceInfo,
    deviceData,
    productInfo,
    templateMap,
    offline,
    powerOff,
    statusTip,
  }, { doControlDeviceData }] = useDeviceInfo();

  return (
    statusTip ? <StatusTip {...statusTip} fillContainer/> : (
      <HashRouter>
        <div>
          <Switch>
            <Route
              path="/filter-reset"
            >
              <FilterReset
                doControlDeviceData={doControlDeviceData}
              />
            </Route>
            <Route path="/">
              <AirPurifierPanel
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
    )
  );
}

entryWrap(App);
