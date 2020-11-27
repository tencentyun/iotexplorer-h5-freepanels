import React from 'react';
import { entryWrap } from "@src/entryWrap";
import { Panel } from './Panel';
import { useDeviceInfo } from "@hooks/useDeviceInfo";

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
    <Panel
      deviceInfo={deviceInfo}
      productInfo={productInfo}
      templateMap={templateMap}
      deviceData={deviceData}
      offline={offline}
      powerOff={powerOff}
      doControlDeviceData={doControlDeviceData}
    />
  )
}

entryWrap(App);
