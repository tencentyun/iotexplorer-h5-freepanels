import { createContext } from 'react';

/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 14:31:37
 * @LastEditors:
 * @LastEditTime:
 */

export const DeviceSateContext = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0,
    temp_current: 0,
    temp_set: 0,
    mode: 'auto',
    fan_speed_enum: 'auto',
    status: 'auto',
    auto: false,
    eco: false,
    drying: false,
    ventilation: false,
    anion: false,
    heat: false,
    light: false,
    child_lock: false,
    wind_shake: 'horizontal',
    beep: false,
    humidity_set: 0,
    humidity_current: 0,
    temp_unit_convert: 'celsius', // 温标 摄氏度
    fault: 'normal',
    temp_current_f: 40,
    temp_set_f: 0,
    sleep: false,
    health: false,
    cleaning: false,
    power_consumption: 0,
    swing_3d: false,
    switch_vertical: false,
    gear_vertical: 'off',
    angle_vertical: 0,
    switch_horizontal: false,
    gear_horizontal: 'off',
    angle_horizontal: 0,
    display: false,
    uv: false,
    fresh_air_valve: false
  }
});
