/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-21 15:20:16
 * @LastEditors:
 * @LastEditTime:
 */
import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import ClassToolsBar from './ClassToolsBar';
import ToolsButton from './components/tools-button';
import { Modal } from '@components/base';
import Gear, { enumGear } from './gear/gear';
import WorkMode, { enumWorkMode } from './work-mode/work-mode';
import { DeviceSateContext } from '../../../../deviceStateContext';
import './tools-bar.less';

const WORK_MODE = 'work_mode';

export function ToolsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const cRefGear = useRef();
  const cRefWorkMode = useRef();

  const handleCommit = () => {
    if (modalType === WORK_MODE) {
      (cRefWorkMode.current as any).commit();
    } else {
      (cRefGear.current as any).commit();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };
  const toggleChildren = () => {
    if (modalType === WORK_MODE) {
      return <WorkMode cRef={cRefWorkMode} />;
    }
    return <Gear cRef={cRefGear} />;
  };

  const toggleTitleModal = () => {
    if (modalType === WORK_MODE) {
      return '工作模式';
    }
    return '喷雾档位';
  };

  const handleClick = (name: string, bool: boolean) => {
    setIsVisible(bool);
    setModalType(name);
  };

  const toggleLabel = (item: any) => {
    if (item.name === 'work_mode') {
      return enumWorkMode[
        sdk.deviceData.work_mode || 'natural_evaporation'
      ]?.replace('蒸发', '');
    }
    if (item.name === 'gear' && sdk.deviceData.spray_gears) {
      // @ts-ignore
      return enumGear[sdk.deviceData.spray_gears];
    }
    return item.label;
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <>
          <ul className={classNames('tools-bar')}>
            {ClassToolsBar.TOOLS_BAR_CONFIG.map(item => (
              <ToolsButton
                key={item.name}
                name={item.name}
                icon={item.icon}
                size={item.size}
                isActive={item.isActive}
                isFillNone={deviceData.power_switch === 0}
                label={toggleLabel(item)}
                path={item.path}
                callback={item.callback}
                click={(name: string, bool: boolean) => {
                  handleClick(name, bool);
                }}
              />
            ))}
          </ul>
          <Modal
            title={toggleTitleModal()}
            visible={isVisible}
            onConfirm={handleCommit}
            confirmText={'完成'}
            onClose={() => {
              handleClose();
            }}
          >
            {toggleChildren()}
          </Modal>
        </>
      )}
    </DeviceSateContext.Consumer>
  );
}
