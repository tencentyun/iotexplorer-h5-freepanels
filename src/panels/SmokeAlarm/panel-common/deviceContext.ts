import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    alarm_switch: number;
    smoke_sensor_state: string;
    smoke_sensor_value: number;
    tamper_alarm: number;
    alarm_time: number;
    alarm_vol: string;
    alarm_ringtone: string;
    battery_percentage: number;
    battery_state: string;
    co_value: number;
    co_state: string;
    muffling: number;
    self_checking: number;
    checking_result: string;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    alarm_switch: 0,
    smoke_sensor_state: 'alarm',
    smoke_sensor_value: 1,
    tamper_alarm: 0,
    alarm_time: 0,
    alarm_vol: 'low',
    alarm_ringtone: 'ringtone_1',
    battery_percentage: 6,
    battery_state: 'low',
    co_value: 3,
    co_state: 'alarm',
    muffling: 0,
    self_checking: 0,
    checking_result: 'alarm',
  },
});
