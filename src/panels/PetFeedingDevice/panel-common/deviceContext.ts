import React, { createContext } from 'react';

export const DeviceContext: React.Context<{
  deviceData: {
    power_switch: number; // 电源开关
    battery_percentage: number; // 电池电量
    quick_feed: number; // 快速喂食
    slow_feed: number; // 慢速喂食
    export_calibrate: number; // 出粮校准
    weight_calibrate: number; // 余粮校准
    reset_factory: number; // 恢复出厂
    export_state: string; // 出粮校准状态
    unit_switch: string; // 单位转换
    feed_state: string; // 喂食状态
    drying_left: number; // 烘干剩余时间
    manual_feed: number; // 手动喂食
    meet_plan: any;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0,
    battery_percentage: 0,
    quick_feed: 0,
    slow_feed: 1,
    export_calibrate: 1,
    weight_calibrate: 1,
    reset_factory: 1,
    export_state: '',
    unit_switch: '',
    feed_state: '',
    drying_left: 0,
    manual_feed: 0,
    meet_plan: {
      portion: 0
    }
  }
});
