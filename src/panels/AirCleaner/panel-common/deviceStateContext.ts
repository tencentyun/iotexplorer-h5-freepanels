import React, { createContext } from 'react';
import { noop } from '@libs/utillib';

export const DeviceSateContext: React.Context<{
  userInfo: {
    Email: string;
    UserID: string;
    PhoneNumber: string;
    CountryCode: string;
    NickName: string;
    HasPassword: number;
    Avatar: string;
    HasWxOpenID: number;
  };
  togglePower: () => void;
  deviceData: {
    tvoc: number;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    tvoc: 0
  },
  userInfo: {
    Avatar: '',
    CountryCode: '',
    Email: '',
    HasPassword: 0,
    HasWxOpenID: 1,
    NickName: '',
    PhoneNumber: '',
    UserID: ''
  },
  togglePower: noop
});
