import { createContext } from 'react';
import { noop } from '@libs/utillib';

export const DeviceSateContext = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0,
    bright_value: 0, // 亮度值
    brightness_min: 0, // 最小亮度
    light_type: 'LED', // 光源类型
    work_mode: 'white'
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
