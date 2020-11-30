import React from 'react';
import {
  iconSocketOpen, iconSocketClose, iconUsbOpen, iconUsbClose,
} from './imgs';
import classNames from 'classnames';
import { FreePanelLayout } from '@components/FreePanelLayout';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import { PanelComponentProps } from "@src/entryWrap";
import { getCountdownStrWithoutDevice } from "@components/FuncFooter";
import './Panel.less';
import { useHistory } from "react-router-dom";

export interface PanelProps extends PanelComponentProps {
  socketList: any[];
  usbList: any[];
}

export function Panel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  onGoDeviceDetail,
  socketList,
  usbList,
}: PanelProps) {
  const history = useHistory();

  const onToggleSocket = (item) => {
    if (offline) {
      return;
    }

    const openedList: any[] = [...socketList, ...usbList]
      .filter(item => !!deviceData[item.id]);

    if (!openedList.length) {  // 没有子开关是开启状态的，然后有一个状态改变了，开启总开关
      doControlDeviceData('power_switch', 1);
    } else if (openedList.length === 1 && deviceData[item.id]) { // 只有一个子开关是开启状态，并且状态是开启到关闭，关闭总开关
      doControlDeviceData('power_switch', 0);
    }
    doControlDeviceData(item.id, !deviceData[item.id] ? 1 : 0);
  };

  return (
    <FreePanelLayout
      className={classNames('free-extension-socket-page', {
        'power-off': true,
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

        [...socketList, ...usbList].forEach((item) => {
          deviceData[item.id] = nextValue;
        });

        doControlDeviceData(deviceData);
      }}
    >
      <PanelMoreBtn
        onClick={onGoDeviceDetail}
        theme='dark'
      />

      <div className="socket-container">
        <div className="socket-container-inner">
          <div className="socket-shell"/>

          <div
            className='socket-list'
          >
            {socketList.map(item => (
              <SocketItem
                key={item.id}
                name={item.name}
                powerOn={deviceData[item.id]}
                countdown={deviceData[item.countdownId]}
                type='socket'
                onClick={() => onToggleSocket(item)}
              />
            ))}
            {usbList.map(item => (
              <SocketItem
                key={item.id}
                name={item.name}
                powerOn={deviceData[item.id]}
                countdown={deviceData[item.countdownId]}
                type='usb'
                onClick={() => onToggleSocket(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </FreePanelLayout>
  );
}

function SocketItem({
  powerOn,
  countdown,
  name,
  onClick,
  type,
}: {
  powerOn: boolean;
  countdown: number;
  name: string;
  onClick: any;
  type: 'usb' | 'socket',
}) {
  return (
    <div className='socket-item'>
      <div className="item-img-container">
        <img
          src={
            type === 'usb' ?
              (powerOn ? iconUsbOpen : iconUsbClose)
              : (powerOn ? iconSocketOpen : iconSocketClose)
          }
          className='item-img'
          onClick={onClick}
        />
      </div>
      <div className='item-feature'>
        <div
          className='item-name text-overflow'
        >{name}</div>
        <div
          className='countdown-marker'>{(
          countdown > 0)
          ? getCountdownStrWithoutDevice(countdown, !powerOn)
          : ''}</div>
      </div>
    </div>
  )
}


