import React from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { FanPanel } from './FanPanel';
import { entryWrap } from '@src/entryWrap';
import { StatusTip } from '@components/StatusTip';
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
      : <FanPanel
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
