import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { SocketPanel } from './SocketPanel';
import { entryWrap } from "@src/entryWrap";
import { StatusTip } from "@components/StatusTip";

function App() {
  const [{
    deviceInfo,
    deviceData,
    productInfo,
    templateMap,
    statusTip,
  }, { doControlDeviceData }] = useDeviceInfo();

  return (
    statusTip ? <StatusTip fillContainer {...statusTip}/> :
      <SocketPanel
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
