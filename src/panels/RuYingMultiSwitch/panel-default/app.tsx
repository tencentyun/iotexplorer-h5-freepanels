import React, { useMemo } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { MultiSwitchPanel } from './panel';
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

  const switchList = useMemo(() => {
    const switchList = [] as any[];
    if (templateMap) {
      Object.keys(templateMap).forEach((key) => {
        const item = { ...templateMap[key] };
        let reg = /switch(\d+)_on/
        if (reg.test(item.id)) {
          const id = reg.exec(item.id)[1]
          item.switchName = `switch${id}_name`
          switchList.push(item);
        }
      });
    }
    console.log(templateMap,switchList)
    return switchList;
  }, [templateMap]);

	return (
		<MultiSwitchPanel
      switchList={switchList}
			deviceData={deviceData}
			offline={false}
			powerOff={false}
			doControlDeviceData={doControlDeviceData}
		/>
	);
}

entryWrap(App);
