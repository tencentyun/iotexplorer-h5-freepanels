import React, { useMemo } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { MultiSwitchPanel } from './panel';
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

  const switchList = useMemo(() => {
    const switchList = [] as any[];
    if (templateMap) {
      Object.keys(templateMap).forEach((key) => {
        const item = { ...templateMap[key] };
        const reg = /switch(\d+)_on/;
        if (reg.test(item.id)) {
          const id = reg.exec(item.id)[1];
          item.switchName = `switch${id}_name`;
          switchList.push(item);
        }
      });
    }
    console.log(templateMap, switchList);
    return switchList;
  }, [templateMap]);

  return (
    statusTip
      ? <StatusTip fillContainer {...statusTip}/>
      : <MultiSwitchPanel
        switchList={switchList}
        deviceData={deviceData}
        offline={false}
        powerOff={false}
        doControlDeviceData={doControlDeviceData}
      />
  );
}

entryWrap(App);
