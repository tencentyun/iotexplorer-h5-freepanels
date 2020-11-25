import React from 'react';
import {
  iconSocket,
} from '@icons/device/freePanel';
import classNames from 'classnames';
import { UseDeviceInfoHandler, UserDeviceInfoData } from '@hooks/useDeviceInfo';
import { RawBtn } from '@components/Btn';
import { FreePanelLayout } from '@components/FreePanelLayout';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import './SocketPanel.less';
import { getCountdownStr, getStatusStr } from "@components/FuncFooter";

export interface SocketPanelProps extends UserDeviceInfoData, UseDeviceInfoHandler {
  onGoTimingProject: () => any;
  onGoDeviceDetail: () => any;
}

export function SocketPanel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  onGoTimingProject,
  onGoDeviceDetail,
}: SocketPanelProps) {
  const renderPanelStatus = () => {
    if (offline) {
      return (
        <div className='socket-msg'>
          设备已离线
        </div>
      );
    } if (deviceData.count_down && deviceData.count_down > 0) {
      return (
        <div className='socket-msg'>
          {getCountdownStr(deviceData.count_down, powerOff)}
        </div>
      );
    }
    return (
        <div className='socket-msg'>插座已{getStatusStr(powerOff)}</div>
    );
  };


  return (
    <FreePanelLayout
      className={classNames('free-socket-page', {
        'power-off': powerOff,
      })}
      title={deviceInfo.displayName}
      doControlDeviceData={doControlDeviceData}
      offline={offline}
      powerOff={powerOff}
      deviceData={deviceData}
      onGoTimingProject={onGoTimingProject}
    >
      <PanelMoreBtn
        onClick={onGoDeviceDetail}
        theme='dark'
      />
      <RawBtn
        className='socket-logo-btn'
        onClick={() => doControlDeviceData('power_switch', powerOff ? 1 : 0)}
      >
        <img
          className={classNames('socket-logo')}
          src={iconSocket}
        />
      </RawBtn>
      {renderPanelStatus()}
    </FreePanelLayout>
  );
}


