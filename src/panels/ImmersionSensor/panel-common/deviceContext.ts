import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    watersensor_state: string;
    tamper_alarm: number;
    sensor_probe: string;
    checking_result: string;
    alarm_ringtone: string;
    alarm_vol: string;
    battery_percentage: number;
    battery_state: string;
    muffling: number;
    alarm_switch: number;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    watersensor_state: 'Alarm',
    tamper_alarm: 1,
    sensor_probe: 'normal',
    checking_result: 'alarm',
    alarm_ringtone: 'ringtone_1',
    alarm_vol: 'low',
    battery_percentage: 6,
    battery_state: 'low',
    muffling: 0,
    alarm_switch:1
  },
});
