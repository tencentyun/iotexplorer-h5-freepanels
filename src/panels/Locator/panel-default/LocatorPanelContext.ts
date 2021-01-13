import { createContext } from 'react';
import { LatLngWithTime, DeviceFenceInfo } from './types';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';

export interface LocatorDeviceData {
  battery_state?: number;
  positioning_mode?: number;
}

interface LocatorPanelContextValue {
  isDeviceOffline: boolean;
  deviceInfo: any;
  deviceData: LocatorDeviceData;
  templateMap: any;
  doControlDeviceData: DoControlDeviceData;
  deviceLocation: LatLngWithTime | null;
  getDeviceLocation: () => Promise<LatLngWithTime>;
  getUserLocation: () => Promise<LatLngWithTime>;
  fenceList: DeviceFenceInfo[] | null;
  getFenceList: () => Promise<DeviceFenceInfo[]>;
  resetFenceList: () => void;
  modifyFenceStatus: ({
    fenceId,
    fenceEnable,
  }: {
    fenceId: number;
    fenceEnable: boolean;
  }) => void;
}

export const LocatorPanelContext = createContext<LocatorPanelContextValue>({} as LocatorPanelContextValue);
