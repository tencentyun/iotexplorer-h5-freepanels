import React from 'react';
import { entryWrap } from "@src/entryWrap";
import { Panel } from './Panel';
import { useDeviceInfo } from "@hooks/useDeviceInfo";
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
    statusTip
      ? <StatusTip fillContainer {...statusTip}/>
      : <Panel
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
