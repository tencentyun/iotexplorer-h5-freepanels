"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = timeout => new Promise(resolve => setTimeout(() => resolve(), timeout));
exports.genReqId = () => `${Date.now().toString()}-${Math.floor(Math.random() * 10000)}`;
exports.getStrLen = (str) => {
    if (!str)
        str = '';
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i); // 单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
};
exports.isSafeInteger = number => +number <= Math.pow(2, 53) - 1;
exports.isNumber = value => /^[0-9]*$/.test(value);
exports.normalizeBool = value => !(value === 0 || value === false);
exports.hashString = (str) => {
    let hash = 0;
    let i;
    let chr;
    let len;
    if (str.length === 0)
        return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
exports.getValueFromRange = (range) => {
    const value = [];
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
exports.isValidMainlandIDCardNumber = (cardNumber) => {
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
exports.isMail = mail => /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(String(mail).trim());
exports.operatingReject = (error) => {
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
function getStandardDate(dateStr) {
    let date = new Date(dateStr);
    // 先尝试直接new，如果不合法再继续走
    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(date)) {
        return date;
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
    }
    catch (err) {
        console.error(err);
        return new Date(dateStr);
    }
}
exports.getStandardDate = getStandardDate;
// 返回一个可以遍历的指定长度的数组:  array(5).map((v, index) => console.log(index));
function array(length) {
    return Array(...new Array(length));
}
exports.array = array;
function getSuffix(filePath) {
    const tmpArr = filePath.split('.');
    if (tmpArr.length > 1) {
        return tmpArr[tmpArr.length - 1];
    }
    return '';
}
exports.getSuffix = getSuffix;
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
function transBytes(bytes, base, preferFormat, isTraffic = false) {
    let value;
    let format;
    const _oneKb = isTraffic ? 1000 : oneKb;
    const _oneMb = isTraffic ? (_oneKb * 1000) : oneMb;
    const _oneGb = isTraffic ? (_oneMb * 1000) : oneGb;
    const _oneTb = isTraffic ? (_oneGb * 1000) : oneTb;
    if (bytes >= _oneTb || preferFormat === 'TB') {
        value = (bytes / _oneTb).toFixed(2);
        base = base ? `Tb${base}` : 'TB';
        format = 'TB';
    }
    else if (bytes >= _oneGb || preferFormat === 'GB') {
        value = (bytes / _oneGb).toFixed(2);
        base = base ? `Gb${base}` : 'GB';
        format = 'GB';
    }
    else if (bytes >= _oneMb || preferFormat === 'MB') {
        value = (bytes / _oneMb).toFixed(2);
        base = base ? `Mb${base}` : 'MB';
        format = 'MB';
    }
    else if (bytes >= _oneKb || preferFormat === 'KB') {
        value = (bytes / _oneKb).toFixed(2);
        base = base ? `Kb${base}` : 'KB';
        format = 'KB';
    }
    else {
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
exports.transBytes = transBytes;
function getFileName(filePath) {
    const lastIndex = filePath.lastIndexOf('/');
    return filePath.slice(lastIndex + 1);
}
exports.getFileName = getFileName;
/*
腾讯云云api专用的一个参数转换方法
用于将 {a: [1, 2, 3]} 转成 { 'a.0': 1, 'a.1': 2, 'a.2': 3 }
 */
function flattenArray(input, prefix = '') {
    const output = {};
    for (const key in input) {
        const value = input[key];
        if (typeof value === 'object') {
            Object.assign(output, flattenArray(value, `${prefix}${key}.`));
        }
        else {
            output[`${prefix}${key}`] = value;
        }
    }
    return output;
}
exports.flattenArray = flattenArray;
// @ts-ignore
exports.noop = (a) => { };
function defineMap2SelectorList(defineMap) {
    const result = [];
    for (const key in defineMap) {
        result.push({ value: key, text: defineMap[key] });
    }
    return result;
}
exports.defineMap2SelectorList = defineMap2SelectorList;
function getSecondsFromHourMinute(time) {
    const [hour = '', minute = '', second = ''] = time.split(':');
    return Number(hour) * 3600 + Number(minute) * 60 + Number(second);
}
exports.getSecondsFromHourMinute = getSecondsFromHourMinute;
function getHourMinuteFromTime(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor(seconds % 3600 / 60);
    const second = seconds % 3600 % 60;
    return { hour, minute, second };
}
exports.getHourMinuteFromTime = getHourMinuteFromTime;
function getHourMinuteStr(seconds) {
    const { hour, minute } = getHourMinuteFromTime(seconds);
    const hourStr = hour > 0 ? `${hour}小时` : '';
    const minuteStr = minute > 0 || hour === 0 ? `${minute}分钟` : '';
    return `${hourStr}${minuteStr}`;
}
exports.getHourMinuteStr = getHourMinuteStr;
/**
 * 获取精度
 */
function getPrecision(value) {
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
exports.getPrecision = getPrecision;
async function fetchAllList(fetchFn) {
    const limit = 100;
    let offset = 0;
    let total = 100;
    let list = [];
    while (offset === 0 || list.length < total) {
        const resp = await fetchFn({ offset, limit });
        if (!resp.list.length)
            return list;
        total = resp.total;
        offset = offset + limit;
        list = list.concat(resp.list);
    }
    return list;
}
exports.fetchAllList = fetchAllList;
exports.getFileExtension = (fileName) => {
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
function maskPhoneNumber(phoneNumber) {
    phoneNumber = `${phoneNumber}`;
    if (/^\d{5,}$/.test(phoneNumber)) {
        const left = phoneNumber.slice(0, 2);
        let middle = phoneNumber.slice(2, -2);
        const right = phoneNumber.slice(-2);
        if (middle.length <= 4) {
            middle = '****'.slice(0, middle.length);
        }
        else {
            middle = `${middle.slice(0, Math.floor(middle.length / 2) - 2)}****${middle.slice(Math.floor(middle.length / 2) + 2)}`;
        }
        phoneNumber = left + middle + right;
    }
    return phoneNumber;
}
exports.maskPhoneNumber = maskPhoneNumber;
/**
 * 掩盖邮箱,使部分可见：隐藏`@`前4位,`@`前少于5位则用`*`号补全5位
 * 如：12345678@qq.com => 1234****@qq.com; 1234@qq.com => 1****@qq.com
 * @param  {String} mail
 * @return {String} mail 若未处理，则原样返回
 * @author  ericji
 */
function maskMail(mail) {
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
    }
    else {
        mailId = `${mailId.slice(0, 1)}****`;
    }
    return (`${mailId}@${mailDomain}`);
}
exports.maskMail = maskMail;
function arrayBufferToHexStringArray(buffer) {
    try {
        if (Object.prototype.toString.call(buffer) !== '[object ArrayBuffer]') {
            throw 'invalid array buffer';
        }
        const dataView = new DataView(buffer);
        const hexStrArr = [];
        for (let i = 0, l = dataView.byteLength; i < l; i++) {
            const str = dataView.getUint8(i);
            let hex = (str & 0xff).toString(16);
            hex = (hex.length === 1) ? `0${hex}` : hex;
            hexStrArr.push(hex.toUpperCase());
        }
        return hexStrArr;
    }
    catch (err) {
        console.error('arrayBufferToHexStringArray error', err);
        return [];
    }
}
exports.arrayBufferToHexStringArray = arrayBufferToHexStringArray;
function byteArrayToStr(bytes) {
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
exports.byteArrayToStr = byteArrayToStr;
// 过滤&排序管理端配置的数据
function configListFilter(list) {
    if (!list || !list.length) {
        return list;
    }
    return list.filter(item => item.Status === 1)
        .sort((a, b) => a.Order - b.Order);
}
exports.configListFilter = configListFilter;
function genPromise() {
    let resolve;
    let reject;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    return { promise, resolve, reject };
}
exports.genPromise = genPromise;
function mergeConnectDeviceConfig(defaultConfig, config) {
    const mergedConfig = {};
    Object.keys(defaultConfig).forEach((section) => {
        mergedConfig[section] = Object.assign({}, defaultConfig[section]);
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
exports.mergeConnectDeviceConfig = mergeConnectDeviceConfig;
const refEquality = (a, b) => a === b;
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
function subscribeStore({ store, selector, equalComparator = refEquality, onInit, onChange, onInitOrChange, }) {
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
exports.subscribeStore = subscribeStore;
function isH5PanelAvailable(productConfig) {
    return productConfig &&
        productConfig.Panel &&
        productConfig.Panel.h5 && (productConfig.Panel.h5.url || (productConfig.Panel.h5.release &&
        productConfig.Panel.h5.release.scripts &&
        productConfig.Panel.h5.release.scripts.length));
}
exports.isH5PanelAvailable = isH5PanelAvailable;
//# sourceMappingURL=utillib.js.map