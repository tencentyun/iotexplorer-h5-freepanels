import { createContext } from 'react';
import { noop } from '@libs/utillib';

export const DeviceSateContext = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0,
    count_down: 0,
  },
  userInfo: {
    Avatar: '',
    CountryCode: '',
    Email: '',
    HasPassword: 0,
    HasWxOpenID: 1,
    NickName: '',
    PhoneNumber: '',
    UserID: '',
  },
  togglePower: noop,
});
