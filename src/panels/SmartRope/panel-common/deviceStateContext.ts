import { createContext } from 'react';
import { noop } from '@libs/utillib';

export const DeviceSateContext = createContext({
  deviceStatus: 0,
  deviceData: {
    start: 0,
    pause: 0,
    current_count: 0,
    current_time: 0,
    current_calories: 0,
    current_speed: 0,
    total_count: 0,
    total_time: 0,
    total_calories: 0,
    total_trip_on_time: 0,
    keep_jump_max: 0,
    speed_max: 0,
    target_time: 0,
    target_count: 0,
    battery_state: 0,
    weight: 0,
    gender: 0,
    mode: '',
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
