import React, { useEffect, useMemo, useState } from 'react';
import { useDeviceInfo } from '@hooks/useDeviceInfo';
import { Panel } from './Panel';
import { entryWrap } from '@src/entryWrap';
import { getCountdownStrWithoutDevice } from '@components/FuncFooter';
import { PanelPageWithMultiFeatures } from '@components/PanelPageWithMultiFeatures';
import { StatusTip } from '@components/StatusTip';
import { useSwitchEditName } from '@src/hooks/useSwitchEditName';

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

  const { socketList, usbList } = useMemo(() => {
    const result = {
      socketList: [] as any[],
      usbList: [] as any[],
    };

    if (templateMap) {
      Object.keys(templateMap).forEach((key) => {
        const item = { ...templateMap[key] };

        if (item.id.indexOf('switch_') > -1) {
          const id = item.id.split('switch_')[1];

          item.countdownId = `count_down${id}`;

          result.socketList.push(item);
        } else if (item.id.indexOf('USB_switch') > -1) {
          const id = item.id.split('USB_switch')[1];

          item.countdownId = `USB_count_down${id}`;

          result.usbList.push(item);
        }
      });
    }

    return result;
  }, [templateMap]);

  const totalSocketList = useMemo(
    () => [...socketList, ...usbList],
    [socketList, usbList],
  );
  const { switchNames, updateSwitchNames, statusTip: reqStatus } = useSwitchEditName({
    switchList: totalSocketList,
  });
  return (
    statusTip
      ? <StatusTip fillContainer {...statusTip}/>
      : <PanelPageWithMultiFeatures
      timingProjectList={totalSocketList.map(item => ({
        id: item.id,
        label: switchNames[item.id] || item.name,
      }))}
      countdownList={totalSocketList.map(item => ({
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
      <Panel
        deviceInfo={deviceInfo}
        productInfo={productInfo}
        templateMap={templateMap}
        deviceData={deviceData}
        offline={offline}
        powerOff={powerOff}
        doControlDeviceData={doControlDeviceData}
        socketList={socketList}
        usbList={usbList}
        {...{
          switchNames, updateSwitchNames, statusTip: reqStatus,
        }}
      />
    </PanelPageWithMultiFeatures>
  );
}

entryWrap(App);
