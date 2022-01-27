import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    power_switch: number;
    count_down: number;
    current: number;
    power: number;
    voltage: number;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0, // 电源开关
    count_down: 1, // 倒计时
    current: 0, // 电流
    power: 0, // 功率
    voltage: 0 // 电压
  }
});
