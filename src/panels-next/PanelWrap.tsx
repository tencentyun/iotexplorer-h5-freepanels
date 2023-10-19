import React from 'react';
import { SWRConfig } from 'swr';
import ReactDOM from 'react-dom';
import { useMount } from 'ahooks';
import { create } from 'zustand';
import './PanelWrap.less';
import { SafeArea } from 'antd-mobile';
import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';

interface IDeviceStore {
  deviceData: Record<string, any>;
  deviceStatus: 0 | 1;

  setDeviceData: (deviceData: Record<string, any>) => void;
  setDeviceStatus: (status: number) => void;
}

export const useDeviceStore = create<IDeviceStore>(set => ({
  deviceData: h5PanelSdk.deviceData || {}, // 设备物模型
  deviceStatus: h5PanelSdk.deviceStatus || 0, // 设备在线状态

  setDeviceData: (deviceData) => {
    const nextDeviceData = {};
    Object.entries(deviceData)
      .forEach(([dataKey, dataValue]) => {
        nextDeviceData[dataKey] = (dataValue as any).Value;
      });
    set(state => ({
      deviceData: { ...state.deviceData, ...nextDeviceData },
    }));
  },

  setDeviceStatus: (deviceStatus: 0 | 1) => {
    set({ deviceStatus });
  },
}));

function PanelWrap({ children }) {
  const {
    setDeviceData,
    setDeviceStatus,
  } = useDeviceStore();

  useMount(() => {
    window.h5PanelSdk.on('wsReport', (payload: any) => {
      if (typeof payload.deviceData === 'object') {
        setDeviceData(payload.deviceData);
      }
    });

    window.h5PanelSdk.on('wsStatusChange', (payload: any) => {
      console.log('设备在线状态改变', payload);
      setDeviceStatus(payload.deviceStatus);
      if (payload.deviceStatus) {
        h5PanelSdk.offlineTip.hide();
      } else {
        h5PanelSdk.offlineTip.show();
      }
    });

    if (!h5PanelSdk.deviceStatus) {
      h5PanelSdk.offlineTip.show();
    }
  });

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}

export function panelEntry(App: React.ElementType) {
  ReactDOM.render(
    <PanelWrap>
      <App />
      <div>
        <SafeArea position='bottom' />
      </div>
    </PanelWrap>,
    document.getElementById('app'),
  );
}
