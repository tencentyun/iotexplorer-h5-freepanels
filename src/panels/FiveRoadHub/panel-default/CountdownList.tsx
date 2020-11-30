import React, { useState } from 'react';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';
import { SocketList, SocketListItem } from './SocketList';
import { CountdownSetting } from "@components/CountdownSetting";

export function CountdownList({
  socketList,
  deviceData = {},
  doControlDeviceData,
}: {
  socketList: SocketListItem[];
  deviceData: any;
  doControlDeviceData: DoControlDeviceData,
}) {
  const [state, setState] = useState({
    visible: false,
    id: '',
    countdownId: '',
  });

  const resetState = () => setState({
    visible: false,
    id: '',
    countdownId: '',
  });

  const handleCountdownConfirm = async ({ enable, value }) => {
    if (!enable) {
      await doControlDeviceData(state.countdownId, 0);
    } else {
      await doControlDeviceData(state.countdownId, value);
    }

    resetState();
  };

  return (
    <>
      <SocketList
        socketList={socketList}
        onClick={(item) => {
          setState({
            visible: true,
            id: item.id,
            countdownId: item.countdownId as string,
          });
        }}
      />
      {state.visible && (
        <CountdownSetting
          visible={true}
          value={deviceData[state.countdownId]}
          onCancel={resetState}
          onConfirm={handleCountdownConfirm}
        />
      )}
    </>
  );
}
