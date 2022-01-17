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
    power_switch: number;
    card_status_report: number;
    timer_cut: number;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0, //电源开关 关开 - -O 1
    timer_cut: 100, //断电延时 数值范围：0-100 初始值：0 步长：1
    card_status_report: 0 //枚举值： 0-取卡 1 -插卡
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
