import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    power_switch: number; // 电源开关
    current_temp: number; // 当前温度
    current_humidity: number; // 当前湿度
    temp_sampling: number; // 温度采样频率
    humidity_sampling: number; // 湿度采样频率
    temp_unit: number; // 温标
    battery_state: string; // 电池电量状态
    tamper_event: number; // 防拆告警
    battery_percentage: number; // 电池电量
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0,
    current_temp: 0,
    current_humidity: 0,
    temp_sampling: 0,
    humidity_sampling: 0,
    temp_unit: 0,
    battery_state: '',
    tamper_event: 0,
    battery_percentage: 0,
  },
});
