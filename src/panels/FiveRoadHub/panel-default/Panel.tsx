import React, { useRef, useState } from 'react';
import {
  iconSocketOpen, iconSocketClose, iconUsbOpen, iconUsbClose, iconEditName
} from './imgs';
import classNames from 'classnames';
import { FreePanelLayout } from '@components/FreePanelLayout';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import { PanelComponentProps } from "@src/entryWrap";
import { getCountdownStrWithoutDevice } from "@components/FuncFooter";
import './Panel.less';
import { useHistory } from "react-router-dom";
import { ConfirmModal } from '@components/Modal';
import {
  ModifyModalName,
} from './models';

export interface PanelProps extends PanelComponentProps {
  socketList: any[];
  usbList: any[];
  switchNames: any;
  onChangeSwitchNames: any;
}
// 多路排插
export function Panel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  onGoDeviceDetail,
  socketList,
  usbList,
  onChangeSwitchNames,
  switchNames,
}: PanelProps) {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const currentEditItem = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const onEditName = async () => {
    if(currentEditItem.current) {
      if (inputRef.current?.value) {
        try {
          await ModifyModalName({
            DeviceKey: currentEditItem.current?.id,
            DeviceValue: inputRef.current?.value,
          })
        } catch {}
        onChangeSwitchNames(currentEditItem.current?.id, inputRef.current?.value);
      }
    }
    setVisible(false);
  }

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
        <div className='socket-container-modal'>
          {
            visible && 
              <ConfirmModal 
                visible={visible} 
                title='修改名称'
                content={<input ref={inputRef} autoFocus className='edit-name-modal' placeholder='最多15个字'/>}
                onCancel={() => {
                  setVisible(false);
                  currentEditItem.current = null;
                }}
                onConfirm={() => onEditName()}
              />
          }
        </div>
        <div className="socket-container-inner">
          <div className="socket-shell"/>

          <div
            className='socket-list'
          >
            {socketList.map(item => (
              <SocketItem
                key={item.id}
                name={switchNames[item.id] || item.name}
                powerOn={deviceData[item.id]}
                countdown={deviceData[item.countdownId]}
                type='socket'
                onClick={() => onToggleSocket(item)}
                onEditName={() => {
                  setVisible(true);
                  currentEditItem.current = item;
                  inputRef.current?.focus()
                }}
              />
            ))}
            {usbList.map(item => (
              <SocketItem
                key={item.id}
                name={switchNames[item.id] || item.name}
                powerOn={deviceData[item.id]}
                countdown={deviceData[item.countdownId]}
                type='usb'
                onClick={() => onToggleSocket(item)}
                onEditName={() => {
                  setVisible(true);
                  currentEditItem.current = item;
                  inputRef.current?.focus()
                }}
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
  onEditName,
  type,
}: {
  powerOn: boolean;
  countdown: number;
  name: string;
  onClick: any;
  onEditName: any;
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
        <div className='item-name text-overflow'>
          {name}
          <img
            src={iconEditName}
            className='edit-img'
            onClick={onEditName}
          />
        </div>

        <div
          className='countdown-marker'>{(
          countdown > 0)
          ? getCountdownStrWithoutDevice(countdown, !powerOn)
          : ''}</div>
      </div>
    </div>
  )
}


