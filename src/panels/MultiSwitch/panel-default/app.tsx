import React, { useEffect, useMemo, useState, createContext } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { SwitchPanel } from './SwitchPanel';
import { entryWrap } from '@src/entryWrap';
import { getCountdownStrWithoutDevice } from '@components/FuncFooter';
import { PanelPageWithMultiFeatures } from '@components/PanelPageWithMultiFeatures';
import { StatusTip } from '@components/StatusTip';
import './style.less';

interface SwitchNames {
  switchNames: any,
  onChangeSwitchNames?: any
}
export const SwitchNamesContext = createContext<any>({} as SwitchNames);

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

        if (item.id.indexOf('switch_') > -1) {
          const id = item.id.split('switch_')[1];

          item.countdownId = `count_down${id}`;

          switchList.push(item);
        }
      });
    }

    return switchList;
  }, [templateMap]);

  const [switchNames, setSwitchNames] = useState<any>({});

  const onChangeSwitchNames = (names) => {
    setSwitchNames(names);
  };
  return (
    statusTip
      ? <StatusTip fillContainer {...statusTip}/>
      : <PanelPageWithMultiFeatures
      timingProjectList={switchList.map(item => ({
        id: item.id,
        label: switchNames[item.id] || item.name,
      }))}
      countdownList={switchList.map(item => ({
        id: item.id,
        label: switchNames[item.id] || item.name,
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
        onChangeSwitchNames={onChangeSwitchNames}
        />
      </PanelPageWithMultiFeatures>
  );
}

entryWrap(App);
