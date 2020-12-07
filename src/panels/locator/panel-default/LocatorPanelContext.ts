import { createContext } from 'react';
import { LatLngWithTime, DeviceFenceInfo } from './types';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';

export interface LocatorDeviceData {
  battery_state?: number;
  positioning_mode?: number;
}

interface LocatorPanelContextValue {
  deviceInfo: any;
  deviceData: LocatorDeviceData;
  templateMap: any;
  doControlDeviceData: DoControlDeviceData;
  deviceLocation: LatLngWithTime | null;
  getDeviceLocation: () => Promise<LatLngWithTime>;
  getUserLocation: () => Promise<LatLngWithTime>;
  locationHistory: LatLngWithTime[] | null;
  setLocationHistory: React.Dispatch<React.SetStateAction<LatLngWithTime[] | null>>;
  fenceInfo: DeviceFenceInfo | null;
  setFenceInfo: React.Dispatch<React.SetStateAction<DeviceFenceInfo | null>>;
}

export const LocatorPanelContext = createContext<LocatorPanelContextValue>({} as LocatorPanelContextValue);
