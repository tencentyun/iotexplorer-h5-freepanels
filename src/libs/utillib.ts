import _ from '@underscore';
import { RefAttributes, ForwardRefExoticComponent } from 'react';
import urlParse from 'url-parse';
import querystring from 'query-string';
import { rgb } from 'd3';
import viewportConfig from '../../webpack/pxToViewport.config';
import { EventEmitter } from 'events';

export const delay = timeout => new Promise(resolve => setTimeout(() => resolve(timeout), timeout));

export const genReqId = () => `${Date.now().toString()}-${Math.floor(Math.random() * 10000)}`;

export const getStrLen = (string) => {
  const str = string || '';

  let len = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i); // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len += 1;
    } else {
      len += 2;
    }
  }
  return len;
};

export const isSafeInteger = number => +number <= Math.pow(2, 53) - 1;

export const isNumber = value => /^[0-9]*$/.test(value);

export const normalizeBool = value => !(value === 0 || value === false);

export const hashString = (str) => {
  let hash = 0;
  let i;
  let chr;
  let len;

  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

export const getValueFromRange = (range) => {
  const value: number[] = [];
  range.forEach((item, index) => {
    if (item.active) {
      value.push(index);
    }
  });
  return value;
};

/**
 * 验证身份证号码是否正确
 * @param {*} cardNumber
 * @returns
 */
export const isValidMainlandIDCardNumber = (cardNumber) => {
  // 基本格式校验，18 位，最后一位可以为 X
  if (!/^\d{17}[\dxX]$/.test(cardNumber)) {
    return false;
  }

  // 校验码校验
  const wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const ai = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sigma = 0;
  for (let i = 0; i < wi.length; i++) {
    sigma += wi[i] * (+cardNumber[i]);
  }
  const n = sigma % 11;
  return cardNumber.substr(-1) === ai[n];
};

/**
 * 检测是否是邮箱
 * @param mail
 * @return {Boolean} 是否是正确邮箱格式
 * @author lockewu
 */
export const isMail = mail => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(String(mail).trim());

export const operatingReject = (error) => {
  if (error && error.errMsg && /cancel/.test(error.errMsg)) {
    return Promise.reject();
  }
  return Promise.reject(error);
};

/**
 * 获取标准化的Date实例
 *
 * 时间字符串有两个标准:
 * ISO 8601标准: YYYY-MM-DDThh:mm:ss
 * RFC2822标准: YYYY/MM/DD HH:MM:SS ± timezon(时区用4位数字表示)
 *
 * IOS new Date支持标准的ISO 8601与RFC2822时间字符串，但是如: 2017-08-25 19:13:00这种字符串直接new Date会返回null
 *
 * @param dateStr
 */
export function getStandardDate(dateStr) {
  let date = new Date(dateStr);

  // 先尝试直接new，如果不合法再继续走
  if (typeof date !== 'object') { //  && !isNaN(date)
    return ;
  }

  try {
    let arr = dateStr.split(/[-+ :T.]/);
    arr = arr.map(row => row.replace(/\D/g, ''));

    date = new Date();

    date.setFullYear(arr[0]);
    date.setMonth(arr[1] - 1);
    date.setDate(arr[2]);
    date.setHours(arr[3] || 0);
    date.setMinutes(arr[4] || 0);
    date.setSeconds(arr[5] || 0);
    date.setMilliseconds(arr[6] || 0);

    return date;
  } catch (err) {
    console.error(err);
    return new Date(dateStr);
  }
}

// 返回一个可以遍历的指定长度的数组:  array(5).map((v, index) => console.log(index));
export function array(length) {
  return Array(...new Array(length));
}

export function getSuffix(filePath) {
  const tmpArr = filePath.split('.');

  if (tmpArr.length > 1) {
    return tmpArr[tmpArr.length - 1];
  }

  return '';
}

const oneKb = 1024;
const oneMb = 1024 * oneKb;
const oneGb = 1024 * oneMb;
const oneTb = 1024 * oneGb;

/**
 * 将byte换为可读单位
 * @param bytes
 * @param {String} [base] 基础单位，如bps, 传入ps, 如果不传，默认返回Byte, Mb, Kb, Gb等
 * @param {String} preferFormat 强制按照该单位格式化
 * @param {Boolean} isTraffic 是否按流量计算
 */
export function transBytes(bytes, base, preferFormat, isTraffic = false) {
  let value;
  let format;

  const theOneKb = isTraffic ? 1000 : oneKb;
  const theOneMb = isTraffic ? (theOneKb * 1000) : oneMb;
  const theOneGb = isTraffic ? (theOneMb * 1000) : oneGb;
  const theOneTb = isTraffic ? (theOneGb * 1000) : oneTb;

  if (bytes >= theOneTb || preferFormat === 'TB') {
    value = (bytes / theOneTb).toFixed(2);
    base = base ? `Tb${base}` : 'TB';
    format = 'TB';
  } else if (bytes >= theOneGb || preferFormat === 'GB') {
    value = (bytes / theOneGb).toFixed(2);
    base = base ? `Gb${base}` : 'GB';
    format = 'GB';
  } else if (bytes >= theOneMb || preferFormat === 'MB') {
    value = (bytes / theOneMb).toFixed(2);
    base = base ? `Mb${base}` : 'MB';
    format = 'MB';
  } else if (bytes >= theOneKb || preferFormat === 'KB') {
    value = (bytes / theOneKb).toFixed(2);
    base = base ? `Kb${base}` : 'KB';
    format = 'KB';
  } else {
    value = String(bytes || 0);
    base = base ? `b${base}` : 'B';
    format = 'B';
  }

  return {
    value,
    base,
    string: `${value}${base}`,
    format,
  };
}

export function getFileName(filePath) {
  const lastIndex = filePath.lastIndexOf('/');

  return filePath.slice(lastIndex + 1);
}


/*
腾讯云云api专用的一个参数转换方法
用于将 {a: [1, 2, 3]} 转成 { 'a.0': 1, 'a.1': 2, 'a.2': 3 }
 */
export function flattenArray(input, prefix = '') {
  const output = {};

  for (const key in input) {
    const value = input[key];
    if (typeof value === 'object') {
      Object.assign(output, flattenArray(value, `${prefix}${key}.`));
    } else {
      output[`${prefix}${key}`] = value;
    }
  }

  return output;
}

export const noop = (a?: any): void => {
  console.log('noop');
};

export function defineMap2SelectorList(defineMap: { [propName: string]: string }): SelectorOption[] {
  const result: { value: string; text: string }[] = [];

  for (const key in defineMap) {
    result.push({ value: key, text: defineMap[key] });
  }

  return result;
}

export function getSecondsFromHourMinute(time) {
  const [hour = '', minute = '', second = ''] = time.split(':');

  return Number(hour) * 3600 + Number(minute) * 60 + Number(second);
}

export function getHourMinuteFromTime(seconds) {
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = seconds % 3600 % 60;

  return { hour, minute, second };
}

export function getHourMinuteStr(seconds) {
  const { hour, minute } = getHourMinuteFromTime(seconds);
  const hourStr = hour > 0 ? `${hour}小时` : '';
  const minuteStr = minute > 0 || hour === 0 ? `${minute}分钟` : '';
  return `${hourStr}${minuteStr}`;
}

/**
 * 获取精度
 */
export function getPrecision(value) {
  if (typeof value !== 'number') {
    return 0;
  }
  const str = value.toString();
  if (/e-(.+)$/.test(str)) {
    return parseInt(RegExp.$1, 10);
  }
  if (str.indexOf('.') >= 0) {
    return str.length - str.indexOf('.') - 1;
  }
  return 0;
}

export async function fetchAllList<T>(fetchFn: (
    props: { offset: number; limit: number }
  ) => Promise<ListResponse<T>>): Promise<T[]> {
  const limit = 100;
  let offset = 0;
  let total = 100;
  let list: T[] = [];

  while (offset === 0 || list.length < total) {
    const resp = await fetchFn({ offset, limit });

    if (!resp.list.length) return list;

    total = resp.total;
    offset = offset + limit;
    list = list.concat(resp.list);
  }

  return list;
}

export const getFileExtension = (fileName) => {
  const lastIndex = fileName.lastIndexOf('.');

  return fileName.slice(lastIndex + 1);
};

/**
 * 掩盖手机,使部分可见：手机头尾至少显示两位，中间最多隐藏4位
 * 如：15012346685 => 150****6685
 * @param  {String} phoneNumber
 * @return {String} phoneNumber 若未处理，则原样返回
 * @author  ericji
 */
export function maskPhoneNumber(phoneNumber) {
  phoneNumber = `${phoneNumber}`;

  if (/^\d{5,}$/.test(phoneNumber)) {
    const left = phoneNumber.slice(0, 2);
    let middle = phoneNumber.slice(2, -2);
    const right = phoneNumber.slice(-2);

    if (middle.length <= 4) {
      middle = '****'.slice(0, middle.length);
    } else {
      middle = `${middle.slice(0, Math.floor(middle.length / 2) - 2)}****${middle.slice(Math.floor(middle.length / 2) + 2)}`;
    }

    phoneNumber = left + middle + right;
  }

  return phoneNumber;
}

/**
 * 掩盖邮箱,使部分可见：隐藏`@`前4位,`@`前少于5位则用`*`号补全5位
 * 如：12345678@qq.com => 1234****@qq.com; 1234@qq.com => 1****@qq.com
 * @param  {String} mail
 * @return {String} mail 若未处理，则原样返回
 * @author  ericji
 */
export function maskMail(mail) {
  // 已经处理过了不再处理
  if (mail.indexOf('*') !== -1) {
    return mail;
  }

  const mailPair = mail.split('@');

  if (mailPair.length !== 2) {
    return mail;
  }

  let mailId = mailPair[0];
  const mailDomain = mailPair[1];

  if (mailId.length > 4) {
    mailId = `${mailId.slice(0, -4)}****`;
  } else {
    mailId = `${mailId.slice(0, 1)}****`;
  }

  return (`${mailId}@${mailDomain}`);
}

export function arrayBufferToHexStringArray(buffer) {
  try {
    if (Object.prototype.toString.call(buffer) !== '[object ArrayBuffer]') {
      throw 'invalid array buffer';
    }
    const dataView = new DataView(buffer);

    const hexStrArr: string[] = [];

    for (let i = 0, l = dataView.byteLength; i < l; i++) {
      const str = dataView.getUint8(i);
      let hex = (str & 0xff).toString(16);
      hex = (hex.length === 1) ? `0${hex}` : hex;
      hexStrArr.push(hex.toUpperCase());
    }

    return hexStrArr;
  } catch (err) {
    console.error('arrayBufferToHexStringArray error', err);
    return [];
  }
}

export function byteArrayToStr(bytes) {
  const CHUNK_SIZE = 8192;

  // Special-case the simple case for speed's sake.
  if (bytes.length <= CHUNK_SIZE) {
    return String.fromCharCode.apply(null, bytes.map(byte => byte & 0xff));
  }

  // The remaining logic splits conversion by chunks since
  // Function#apply() has a maximum parameter count.
  // See discussion: http://goo.gl/LrWmZ9

  let str = '';
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = bytes.slice(i, i + CHUNK_SIZE);
    str += String.fromCharCode.apply(null, chunk);
  }
  return str;
}

// 过滤&排序管理端配置的数据
export function configListFilter(list) {
  if (!list || !list.length) {
    return list;
  }
  return list.filter(item => item.Status === 1)
    .sort((a, b) => a.Order - b.Order);
}

export type Handle<T> = T extends ForwardRefExoticComponent<RefAttributes<infer T2>> ? T2 : never;

export interface PromiseObj<T> {
  promise: Promise<T>;
  resolve: (T) => any;
  reject: (any?: any) => any;
}

export function genPromise<T>(): PromiseObj<T> {
  let resolve;
  let reject;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return { promise, resolve, reject };
}

export function mergeConnectDeviceConfig(defaultConfig, config) {
  const mergedConfig = {};
  Object.keys(defaultConfig).forEach((section) => {
    mergedConfig[section] = { ...defaultConfig[section] };
    if (!config[section]) {
      return;
    }
    Object.keys(defaultConfig[section]).forEach((key) => {
      if (config[section][key] !== '' && config[section][key] !== undefined) {
        mergedConfig[section][key] = config[section][key];
      }
    });
  });
  return mergedConfig;
}

const refEquality = (a: any, b: any) => a === b;

/**
 * 订阅 redux store
 *
 * @param {Store} store
 * @param {Function} selector 从 state 中取出的需要监听的值
 * @param {Function} equalComparator 用于比较 state 变化前后被监听的值是否相等
 * @param {Function} [onInit] 从 state 中取出的需要监听的值
 * @param {Function} [onChange] state 中监听的值发生变化时的回调
 * @param {Function} [OnInitOrChange] 同时指定 onInit 和 onChange
 * @return {Function} 调用返回的函数可以取消 subscribe
 */
export function subscribeStore({
  store,
  selector,
  equalComparator = refEquality,
  onInit,
  onChange,
  onInitOrChange,
}: {
  store: {
    getState: () => void;
    subscribe: (callback) => void;
  };
  selector: (str) => number;
  equalComparator?: (pre, next) => boolean;
  onInit?: (...obj) => void;
  onChange?: (cur, pre) => void;
  onInitOrChange?: (cur, pre) => void;
}) {
  onInit = onInit || onInitOrChange;
  onChange = onChange || onInitOrChange;

  let prevState = selector(store.getState());

  if (onInit) {
    onInit(prevState);
  }

  return store.subscribe(() => {
    const curState = selector(store.getState());

    if (!equalComparator(curState, prevState) && onChange) {
      onChange(curState, prevState);
    }

    prevState = curState;
  });
}

export function isH5PanelAvailable(productConfig) {
  return productConfig
    && productConfig.Panel
    && productConfig.Panel.h5 && (
    productConfig.Panel.h5.url || (
      productConfig.Panel.h5.release
        && productConfig.Panel.h5.release.scripts
        && productConfig.Panel.h5.release.scripts.length
    )
  );
}

export function isFullScreen() {
  const { clientHeight, clientWidth } = document.documentElement;

  return (clientHeight / clientWidth) > 1.86;
}

export const appendParams = (url: string, data: any) => {
  const paramArr: string[] = [];
  _.forEach(data, (value, key) => {
    if (typeof value !== 'undefined') {
      if (_.isObject(value)) {
        value = JSON.stringify(value);
      }
      paramArr.push(`${key}=${encodeURIComponent(value)}`);
    }
  });

  if (!paramArr.length) return url;

  return (url.indexOf('?') > -1 ? `${url}&` : `${url}?`) + paramArr.join('&');
};

export const px2rpx = (px: number): number => {
  const { clientWidth } = document.documentElement;
  return (px * 2) * (375 / Math.min(640, clientWidth));
};

export const rpx2px = (rpx: number): number => {
  const { clientWidth } = document.documentElement;

  return (rpx / 2) * (Math.min(640, clientWidth) / 375);
};

export const px2rem = (px, withUnit?: any) => rpx2rem(px2rpx(px), withUnit);

export function rpx2rem(rpx, withUnit?: true): string;
export function rpx2rem(rpx, withUnit?: false): number;
export function rpx2rem(rpx, withUnit = true) {
  const rem = rpx / 46.875;

  if (withUnit) {
    return `${rem}rem`;
  }

  return rem;
}

const codeReg = /\((\d+)\).+/;

export const getErrorMsg = (err, {
  defaultMsg = '',
  errMsgKey = 'msg',
} = {}) => {
  const errorMsg = (() => {
    if (!err) return;
    let message = '';
    if (typeof err === 'string') return err;
    console.log(err, err.stack);

    if (_.isPlainObject(err)) {
      message = err[errMsgKey] || err.Message || err.msg || err.message || err.errMsg || '连接服务器失败，请稍后再试';

      if (err.reqId) {
        message += `(${err.reqId})`;
      } else if (err.code && !codeReg.test(message)) {
        message += `(${err.code})`;
      }
    }

    if (!message) {
      message = defaultMsg || '连接服务器失败，请稍后再试';
    }

    return message;
  })();

  return errorMsg;
};

export function parseUrl(url) {
  const uri = urlParse(url);
  if (uri && uri.query) {
    uri.query = querystring.parse(uri.query);
  }
  return uri;
}
export function numberToArray(number: number, desc?: string): string[] {
  const result: string[] = [];
  for (let i = 0; i < number; i++) {
    let value = `${i + 1}`;

    if (desc) {
      value += desc;
    }
    result.push(value);
  }
  return result;
}
export const px2vw = (px: number): string | number => {
  const { viewportWidth } = viewportConfig;
  const vw = px * (100 / viewportWidth);

  if (px === 0) {
    return px;
  }
  return `${vw.toFixed(viewportConfig.unitPrecision || 3)}vw`;
};

export function toUnderscores(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
}
/**
 * 将 px 单位转换为 vw 单位
 */
export const formatPxUnit = (unit: string | number): string | number => {
  if (typeof unit === 'number') {
    return px2vw(unit);
  }

  const reg = /(\d+)px/gi;
  const res = reg.exec(unit);
  return res?.length ? parseInt(res[1], 10) : 0;
};
export function mapsToOptions(name: string, maps: any): string[] {
  if (!maps[name]) return ['1', '2', '3'];

  const { min, max, step } = maps[name];
  const result: string[] = [];
  for (let i: number = min; i <= max; i += step) {
    result.push(i.toString());
  }
  return result;
}
/**
 * 把1或0的枚举转换为boolean
 * @param value
 */
export const toggleBooleanByNumber = (value: number) => value !== 0;
/**
 * 补零函数
 */
 export function zeroize(arg: number): string {
  if (arg < 10) {
    return `0${arg}`;
  }
  return arg.toString();
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
export const enumToArray = (enumCNObj: any): {
  label: string;
  value: number;
}[] => {
  const result: any[] = [];
  for (const key in enumCNObj) {
    // 排除掉key
    if (isNaN(+key)) {
      result.push({
        label: key,
        value: enumCNObj[key],
      });
    }
  }
  // return [{ value: 1, label: '智能' }];
  return result;
};
export default new EventEmitter();

export function hsv2rgb(arr) {
  const h = arr[0];
  let s = arr[1];
  let  v = arr[2];
  s = s / 100;
  v = v / 100;
  let r = 0;
  let g = 0;
  let b = 0;
  const i = ((h / 60) % 6);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }
  r = (r * 255.0);
  g = (g * 255.0);
  b = (b * 255.0);
  return rgb(r, g, b);
}

export function rgb2hsv(arr) {
  let h = 0;
  let s = 0;
  let v = 0;
  const r = arr[0];
  const g = arr[1];
  const b = arr[2];
  arr.sort((a, b) => a - b);
  const max = arr[2];
  const min = arr[0];
  v = max / 255;
  if (max === 0) {
    s = 0;
  } else {
    s = 1 - min / max;
  }
  if (max === min) {
    h = 0;
  } else if (max === r && g >= b) {
    h = 60 * ((g - b) / (max - min)) + 0;
  } else if (max === r && g < b) {
    h = 60 * ((g - b) / (max - min)) + 360;
  } else if (max === g) {
    h = 60 * ((b - r) / (max - min)) + 120;
  } else if (max === b) {
    h = 60 * ((r - g) / (max - min)) + 240;
  }
  // h = (h);
  s = (s * 100);
  v = (v * 100);
  return [h, s, v];
}
