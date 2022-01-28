import React, { createContext } from 'react';
import { noop } from '@libs/utillib';

export const DeviceSateContext: React.Context<{
  userInfo: {
    Email: string;
    UserID: string;
    PhoneNumber: string;
    CountryCode: string;
    NickName: string;
    HasPassword: number;
    Avatar: string;
    HasWxOpenID: number;
  };
  togglePower: () => void;
  deviceData: {
    alert_state: number;
    work_mode: string;
    switch_alarm_light: number;
    alarm_vol: string;
    alarm_ringtone: string;
    telnet_state: string;
    battery_state: string;
    alarm_time: number;
    delay_set: number;
    alarm_bright: number;
    call_looptimes: number;
    password: string;
    alarm_call_number: string;
    alarm_sms_number: string;
    tamper_alarm: number;
    switch_alarm_sound: number;
    switch_mode_sound: number;
    switch_kb_sound: number;
    switch_mode_light: number;
    switch_kb_light: number;
    charge_state: number;
    switch_low_battery: number;
    enable_alarm_call: number;
    enable_alarm_sms: number;
    muffling: number;
    tamper_event: string;
    sensor_probe: string;
    battery_percentage: number;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    alert_state: 0, // 布防 撤防 布防 - -O 1
    work_mode: 'disarmed', // 工作模式枚举值： disarmed -撤防 arm -布防 home -在家 sos -紧急 work -工作 play -休闲
    switch_alarm_light: 0, // 报警灯开关
    alarm_vol: 'low', // 报警音量  枚举值： low -低 middle -中 high -高 mute -静音
    set_humidity: 0, // 湿度数值范围：0-100 初始值：0 步长：1
    current_humidity: 0, // 当前湿度
    current_temp: 0, // 当前温度
    eco2: 0,
    tvoc: 0,
    pm25: 0,
    position: '深圳',
    weather: '晴',
    anion: 0, // 负离子 01
    fragrance: 0, // 香薰
    sterilization: 0, // 除菌
    heat: 0, // 加热
    spray_volume: 'large', // 喷雾量  枚举值： large -多 middle -中 small -少
    spray_mode: 'auto', // 喷雾模式 枚举值： humidity -潮湿 manual -壬动 auto -自动 work-工作 health -健康 baby -亲亲 sleep -睡眠
    sleep: 0, // 睡眠 开关 - -O 1
    childjock: 0, // 童锁开关 开关 - -O 1
    filterlife: 100, // 滤网寿命 数值范围：0-100 初始值：0 步长：1
    plasma: 0, // 等离子 开关 - -O 1
    temp_unit_convert: 0, // 枚举值： 0-摄氏度 1 -华氏度
    spray_gears: 'level_1', // 档位
  },
  userInfo: {
    Avatar: '',
    CountryCode: '',
    Email: '',
    HasPassword: 0,
    HasWxOpenID: 1,
    NickName: '',
    PhoneNumber: '',
    UserID: '',
  },
  togglePower: noop,
});
