import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    power_switch: number; // 电源开关
    current_temp: number; // 当前温度
    current_fahrenheit: number; // 当前温度
    set_temp: number; // 温度调节
    set_fahrenheit: number; // 温度调节
    fault: string; // 故障警告
    spray_mode: string; // 工作模式
    level: string; // 加热档位
    child_lock: number; // 童锁
    anion: number; // 负离子
    light: number; // 灯光
    sound: number; // 声音
    eco: number; // ECO
    window_check: number; // 开窗检测
    sleep: number; // 睡眠功能
    frost: number; // 防霜冻功能
    valve_check: number; // 阀门检测
    temp_unit_convert: number; // 温标切换
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0,
    current_temp: 0,
    current_fahrenheit: 0,
    set_temp: 0,
    set_fahrenheit: 0,
    fault: '',
    spray_mode: '',
    level: '',
    child_lock: 0,
    anion: 0,
    light: 0,
    sound: 0,
    eco: 0,
    window_check: 0,
    sleep: 0,
    frost: 0,
    valve_check: 0,
    temp_unit_convert: 0
  }
});
