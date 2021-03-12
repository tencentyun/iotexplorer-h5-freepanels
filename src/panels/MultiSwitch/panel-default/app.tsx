import React, { useMemo } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { SwitchPanel } from './SwitchPanel';
import { entryWrap } from "@src/entryWrap";
import { getCountdownStrWithoutDevice } from "@components/FuncFooter";
import { PanelPageWithMultiFeatures } from "@components/PanelPageWithMultiFeatures";
import './style.less';

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

        if (item.id.indexOf('switch_') > -1) {
          const id = item.id.split('switch_')[1];

          item.countdownId = `count_down${id}`;

          switchList.push(item);
        }
      });
    }

    return switchList;
  }, [templateMap]);

  return (
    <PanelPageWithMultiFeatures
      timingProjectList={switchList.map(item => ({
        id: item.id,
        label: item.name,
      }))}
      countdownList={switchList.map(item => ({
        id: item.id,
        label: item.name,
        text: deviceData[item.countdownId] > 0
          ? getCountdownStrWithoutDevice(deviceData[item.countdownId], !deviceData[item.id])
          : '',
        countdownId: item.countdownId,
      }))}
      deviceData={deviceData}
      doControlDeviceData={doControlDeviceData}
      deviceInfo={deviceInfo}
    >
      <SwitchPanel
        deviceInfo={deviceInfo}
        productInfo={productInfo}
        templateMap={templateMap}
        deviceData={deviceData}
        offline={offline}
        powerOff={powerOff}
        doControlDeviceData={doControlDeviceData}
        switchList={switchList}
      />
    </PanelPageWithMultiFeatures>
  );
}

entryWrap(App);
