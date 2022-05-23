import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { FreePanelLayout } from '@components/FreePanelLayout';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import { PanelComponentProps } from '@src/entryWrap';
import { useHistory } from 'react-router-dom';
import { SwitchItem } from '@src/panels/MultiSwitch/panel-default/SwitchItem';
import { ConfirmModal } from '@src/components/Modal';
import { StatusTip } from '@src/components/StatusTip';

export interface SwitchPanelProps extends PanelComponentProps {
  switchList: any[];
  switchNames: Record<string, string>;
  updateSwitchNames: any;
}

// 多路开关
export function SwitchPanel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  onGoDeviceDetail,
  switchNames,
  updateSwitchNames,
  statusTip,
  switchList,
}: SwitchPanelProps) {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const currentEditItem = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const onEditName = async () => {
    if (currentEditItem.current) {
      if (inputRef.current?.value) {
        updateSwitchNames({ [currentEditItem.current?.id]: inputRef.current?.value });
      }
    }
    setVisible(false);
  };
  const [currentName, setCurrentName] = useState('');


  return (
    statusTip
      ? <StatusTip fillContainer {...statusTip}/>
      : <FreePanelLayout
        className={classNames('switch-panel-page', {
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
        <div className='switch-container-modal'>
          {
            visible
              && <ConfirmModal
                btnFootClass='no-outline' // 底部按钮class
                visible={visible}
                title='修改名称'
                content={<input
                          ref={inputRef}
                          value={currentName}
                          autoFocus
                          className='edit-name-modal'
                          placeholder='最多15个字'
                          onChange={(event) => {
                            setCurrentName(event.currentTarget.value);
                          }}
                          />}
                onCancel={() => {
                  setVisible(false);
                  currentEditItem.current = null;
                }}
                onConfirm={() => onEditName()}
              />
          }
        </div>
        <div
          className={classNames('switch-list', `layout-${switchList.length}`)}
        >
          {switchList.map(item => (
            <SwitchItem
              key={item.id}
              name={switchNames[item.id]}
              switchOn={deviceData[item.id]}
              countdown={deviceData[item.countdownId]}
              onClick={() => onToggleSocket(item)}
              onEditName={() => {
                setVisible(true);
                currentEditItem.current = item;
                inputRef.current?.focus();
                setCurrentName(switchNames[currentEditItem.current.id]);
              }}
            />))}
        </div>
      </FreePanelLayout>
  );
}
