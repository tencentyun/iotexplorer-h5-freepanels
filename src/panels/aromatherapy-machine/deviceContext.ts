import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    power_switch: number; // 电源开关
    spray_switch: number; // 喷雾开关
    sound_switch: number; // 声音开关
    light_switch: number; // 灯光开关
    work_mode: string; // 工作模式
    light_mode: string; // 灯光模式
    fault: string; // 故障警告
    count_down: number; // 倒计时
    count_left: number; // 倒计时剩余时间
    bright_value: number; // 亮度值
    color_value: number; // 彩光值
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0,
    spray_switch: 0,
    sound_switch: 0,
    light_switch: 0,
    work_mode: 'middle',
    light_mode: '',
    fault: '',
    count_down: 0,
    count_left: 0,
    bright_value: 0,
    color_value: 0
  }
});
