/*
 * @Author: wrq
 * @Date: 2021-10-03 08:55:55
 * @Description: 业务类方法封装
 */

/**
 * 获取当前环境的主题类型
 */
import { ThemeType } from '../global';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

import viewportConfig from './pxToViewport.config';

interface TemplateData {
  define: {
    mapping?: object;
    type: string;
    start?: string;
    min?: string;
    max?: string;
    step?: string;
    unit?: string;
  };
  desc: string;
  id: string;
  mode: string;
  name: string;
  required: boolean;
}

export function getThemeType(): ThemeType {
  // webpack 环境变量
  const { theme_type } = window._BUSINESS_ || {};
  // 非预制的主题类型，则使用默认 normal 主题
  return theme_type || 'normal';
}

/**
 * 格式化数据
 */
export function formatDeviceData(templateMap: object) {
  const data: object = {};

  Object.keys(templateMap).forEach((key: string) => {
    const templateData: TemplateData = templateMap[key];
    const { define, id } = templateData;

    if (define.type === 'stringenum') {
      const { mapping = {} } = define;

      data[id] = Object.keys(mapping).map((key: string) => ({
        name: key,
        desc: mapping[key]
      }));
    } else if (define.type === 'int') {
      data[id] = {
        min: +(define.min || 0),
        max: +(define.max || 0),
        start: +(define.start || 0),
        step: +(define.step || 0),
        unit: define.unit
      };
    }
  });

  return data;
}

export function onControlDevice(id: string, value: any) {
  console.log(id, value);
  sdk.controlDeviceData({ [id]: value });
}

export const noop = () => {};

// 将一维数组中的元素，每 groupLength 个为一组，转换为二维数组
export const groupArrayItems = (arr: any[], groupLength: number) => {
  const result: any[] = [];
  if (!arr || arr.length === 0) return result;

  let currentRow: any[] = [];
  result.push(currentRow);

  arr.forEach(item => {
    if (currentRow.length === groupLength) {
      currentRow = [];
      result.push(currentRow);
    }
    currentRow.push(item);
  });

  return result;
};

export const px2vw = (px: number): string | number => {
  const viewportWidth = viewportConfig.viewportWidth;
  const vw = px * (100 / viewportWidth);

  if (px === 0) {
    return px;
  }
  return vw.toFixed(viewportConfig.unitPrecision || 3) + 'vw';
};

/**
 * 将 px 单位转换为 vw 单位
 */
export const formatPxUnit = (unit: string | number): string | number => {
  if (typeof unit === 'number') {
    return px2vw(unit);
  }

  const reg = /\d+px/gi;
  return unit.replace(reg, function (t) {
    const val = parseInt(t);

    return px2vw(val);
  });
};

/**
 * camelcase -> underscores
 */
export function toUnderscores(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}

/**
 * underscores -> camelcase
 */
export function toCamelcase(str: string): string {
  return str.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * 根据设备状态，设置dom元素样式是否可用（高亮）
 * @param deviceStatus
 */
export const setDomClassActive = (deviceStatus: number) => {
  if (deviceStatus === 1) {
    return 'disabled';
  }
  return 'active';
};

/**
 * 枚举转数组
 * @param enumCNObj
 */
export const enumToArray = (enumCNObj: {}): {
  label: string;
  value: number;
}[] => {
  const result: any[] = [];
  for (const key in enumCNObj) {
    // 排除掉key
    if (isNaN(+key)) {
      result.push({
        label: key,
        value: enumCNObj[key]
      });
    }
  }
  // return [{ value: 1, label: '智能' }];
  return result;
};

/**
 * 把1或0的枚举转换为boolean
 * @param value
 */
export const toggleBooleanByNumber = (value: number) => {
  return value !== 0;
};

/**
 * 补零函数
 */
export function zeroize(arg: number): string {
  if (arg < 10) {
    return '0' + arg;
  }
  return arg.toString();
}

export function mapsToOptions(name: string, maps: any): string[] {
  if (!maps[name]) return [];

  const { min, max, step } = maps[name];
  const result: string[] = [];
  for (let i: number = min; i <= max; i += step) {
    result.push(i.toString());
  }
  return result;
}

export function numberToArray(number: number, desc?: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < number; i++) {
    let value = i + 1 + '';

    if (desc) {
      value += desc;
    }
    result.push(value);
  }
  return result;
}

