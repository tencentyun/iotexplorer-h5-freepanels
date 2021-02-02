import React from 'react';
import classnames from 'classnames';
import { FreePanelLayout } from '@components/FreePanelLayout';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import { PanelComponentProps } from "@src/entryWrap";
import { useHistory } from "react-router-dom";
import { SwitchItem } from "@src/panels/MultiSwitch/panel-default/SwitchItem";

export interface SwitchPanelProps extends PanelComponentProps {
  switchList: any[];
}

export function SwitchPanel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  onGoDeviceDetail,
  switchList,
}: SwitchPanelProps) {
  const history = useHistory();

  const onToggleSocket = (item) => {
    if (offline) {
      return;
    }

    const openedList: any[] = switchList.filter(item => !!deviceData[item.id]);

    if (!openedList.length) {  // 没有子开关是开启状态的，然后有一个状态改变了，开启总开关
      doControlDeviceData('power_switch', 1);
    } else if (openedList.length === 1 && deviceData[item.id]) { // 只有一个子开关是开启状态，并且状态是开启到关闭，关闭总开关
      doControlDeviceData('power_switch', 0);
    }
    doControlDeviceData(item.id, !deviceData[item.id] ? 1 : 0);
  };

  return (
    <FreePanelLayout
      className={classnames('switch-panel-page', {
        'power-off': powerOff,
      })}
      title={deviceInfo.displayName}
      doControlDeviceData={doControlDeviceData}
      offline={offline}
      powerOff={powerOff}
      deviceData={deviceData}
      onGoTimingProject={() => {
        history.push('/timing-project-list');
      }}
      onGoCountDown={() => {
        history.push('/countdown-list');
      }}
      onSwitchChange={() => {
        const nextValue = powerOff ? 1 : 0;

        const deviceData = {
          power_switch: nextValue,
        };

        switchList.forEach((item) => {
          deviceData[item.id] = nextValue;
        });

        doControlDeviceData(deviceData);
      }}
    >
      <PanelMoreBtn
        onClick={onGoDeviceDetail}
        theme='dark'
      />

      <div
        className={classnames('switch-list', `layout-${switchList.length}`)}
      >
        {switchList.map(item => (
          <SwitchItem
            key={item.id}
            switchOn={deviceData[item.id]}
            countdown={deviceData[item.countdownId]}
            onClick={() => onToggleSocket(item)}
          />
        ))}
      </div>
    </FreePanelLayout>
  );
}
