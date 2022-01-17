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
    tvoc: number;
    heat: number;
    spray_gears: string;
    current_humidity: number;
    set_fahrenheit: number;
    spray_volume: string;
    spray_mode: string;
    filterlife: number;
    work_mode: string;
    set_temp: number;
    set_humidity: number;
    eco2: number;
    sleep: number;
    anion: number;
    fragrance: number;
    pm25: number;
    childjock: number;
    temp_unit_convert: number;
    current_temp: number;
    sterilization: number;
    power_switch: number;
    up_switch: number;
    down_switch: number;
    weather: string;
    position: string;
    plasma: number;
  };
  deviceStatus: number;
}> = createContext({
  deviceStatus: 0,
  deviceData: {
    power_switch: 0, //电源开关 关开 - -O 1
    up_switch: 0, //上升开关 关开 - -O 1
    down_switch: 0, //下降开关 关开 - -O 1
    work_mode: 'natural_evaporation', // 工作模式枚举值： natural_evaporation -自发 heating_evaporation -加热蒸叁 ultrasonic -超声波蒸发
    set_temp: 0, //当前温度0-50C
    set_fahrenheit: 0, //数值范围：0-100 初始值：0 步长：1 单位：F
    set_humidity: 0, //湿度数值范围：0-100 初始值：0 步长：1
    current_humidity: 0, //当前湿度
    current_temp: 0, //当前温度
    eco2: 0,
    tvoc: 0,
    pm25: 0,
    position: '深圳',
    weather: '晴',
    anion: 0, // 负离子 01
    fragrance: 0, //香薰
    sterilization: 0, //除菌
    heat: 0, //加热
    spray_volume: 'large', //喷雾量  枚举值： large -多 middle -中 small -少
    spray_mode: 'auto', //喷雾模式 枚举值： humidity -潮湿 manual -壬动 auto -自动 work-工作 health -健康 baby -亲亲 sleep -睡眠
    sleep: 0, //睡眠 开关 - -O 1
    childjock: 0, // 童锁开关 开关 - -O 1
    filterlife: 100, //滤网寿命 数值范围：0-100 初始值：0 步长：1
    plasma: 0, //等离子 开关 - -O 1
    temp_unit_convert: 0, //枚举值： 0-摄氏度 1 -华氏度
    spray_gears: 'level_1' // 档位
  },
  userInfo: {
    Avatar: '',
    CountryCode: '',
    Email: '',
    HasPassword: 0,
    HasWxOpenID: 1,
    NickName: '',
    PhoneNumber: '',
    UserID: ''
  },
  togglePower: noop
});
