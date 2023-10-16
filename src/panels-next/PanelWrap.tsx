import React from 'react';
import { SWRConfig } from 'swr';
import ReactDOM from 'react-dom';
import { useMount } from 'ahooks';
import { create } from 'zustand';
import './PanelWrap.less';
import { SafeArea } from 'antd-mobile';

interface IDeviceStore {
  deviceData: Record<string, any>;
  updateDeviceData: (deviceData: Record<string, any>) => void;
}

export const useDeviceStore = create<IDeviceStore>(set => ({
  deviceData: {},
  updateDeviceData: (deviceData) => {
    const nextDeviceData = {};
    Object.entries(deviceData).forEach(([dataKey, dataValue]) => {
      nextDeviceData[dataKey] = (dataValue as any).Value;
    });
    set(state => ({ deviceData: { ...state.deviceData, ...nextDeviceData } }));
  },
}));

function PanelWrap({ children }) {
  const { updateDeviceData } = useDeviceStore();

  useMount(() => {
    window.h5PanelSdk.on('wsReport', (payload: any) => {
      if (typeof payload.deviceData === 'object') {
        updateDeviceData(payload.deviceData);
      }
    });
  });

  return (
    <SWRConfig value={{
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }}>
      {children}
    </SWRConfig>
  );
}

export function panelEntry(App) {
  ReactDOM.render(
    <PanelWrap>
      <App />
      <div style={{ background: '#ECF1F9' }}>
        <SafeArea position='bottom' />
      </div>
    </PanelWrap>,
    document.getElementById('app'),
  );
}
