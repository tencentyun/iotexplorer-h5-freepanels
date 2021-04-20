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
        // todo改成一个正则把
        // let a = (/switch{d}(_on*)/).test('switch1_on')
        let reg = /switch(\d+)_on/
        if (
        item.id.indexOf('switch') > -1 &&
        item.id.indexOf('_on') > -1) {
          switchList.push(item);
          const id = item.id.split('switch')[1].split('_on')[0]
          console.log(id)

        }
        console.log(switchList)

      });
    }

    return switchList;
  }, [templateMap]);

	return (
		<MultiSwitchPanel
      switchList={switchList}
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
