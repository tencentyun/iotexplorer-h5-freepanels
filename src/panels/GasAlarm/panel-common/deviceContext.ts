import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    alarm_switch: number;
    self_checking: number;
    lifecycle: number;
    tamper_alarm: number;
    gas_sensor_state: string;
    checking_result: string;
    Device_fault: string;
    gas_sensor_value: number;
    co_value: number;
    alarm_ringtone: string;
    co_state: string;
    battery_percentage: number;
    alarm_time: number;
    alarm_vol: string;
    battery_state: string;
    muffling: number;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    alarm_switch: 0,
    self_checking: 1,
    lifecycle: 1,
    tamper_alarm: 1,
    gas_sensor_state: 'checking',
    checking_result: 'alarm',
    Device_fault: 'fault',
    gas_sensor_value: 3,
    co_value: 3,
    alarm_ringtone: 'ringtone_1',
    co_state: 'alarm',
    battery_percentage: 6,
    alarm_time: 0,
    alarm_vol: 'low',
    battery_state: 'low',
    muffling: 0
  }
});
