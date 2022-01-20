import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    power_switch: number; // 电源开关
    child_lock: number; // 童锁
    swing: number; // 摇头
    anion: number; // 负离子
    light: number; // 灯光
    heat_level: string; // 加热档位
    work_state: number; // 加热状态
    work_mode: string; // 工作模式
    unit_convert: number; // 温标切换
    current_c_temp: number; // 当前温度
    current_f_temp: number; // 当前温度
    target_c_temp: number; // 温度调节
    target_f_temp: number; // 温度调节
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0,
    child_lock: 0,
    swing: 0,
    anion: 0,
    light: 0,
    heat_level: '',
    work_state: 0,
    work_mode: '',
    unit_convert: 0,
    current_c_temp: 0,
    current_f_temp: 0,
    target_c_temp: 0,
    target_f_temp: 0
  }
});
