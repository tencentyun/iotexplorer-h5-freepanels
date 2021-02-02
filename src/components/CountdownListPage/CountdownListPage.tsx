import React, { useState } from 'react';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';
import { SectionListPageItemProps, SectionListPage } from '@components/SectionList';
import { CountdownSetting } from "@components/CountdownSetting";

export interface CountdownListPageItemProps extends SectionListPageItemProps {
  countdownId?: string;
}

export function CountdownListPage({
  list,
  deviceData = {},
  doControlDeviceData,
}: {
  list: CountdownListPageItemProps[];
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
      <SectionListPage
        list={list}
        onClick={(item: CountdownListPageItemProps) => {
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
