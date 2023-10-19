/**
 * ---
 * ##### 驼峰转下划线
 *
 * @param {string} camelStr 驼峰字符串
 * @returns  {string} 下划线字符串
 * @function
 */
export const camelToUnderline = camelStr => camelStr.replace(/([A-Z])/g, '_$1').replace(/^-/, '')
  .toLowerCase();

/**
 * ---
 * ##### 下划线转驼峰
 *
 * @param {string} underlineStr 下划线字符串
 * @returns  {string} 驼峰字符串
 * @function
 */
export const underlineToCamel = (underlineStr: string): string => underlineStr.replace(/\\_(\w)/g, (_all, letter) => letter.toUpperCase());
/**
 * ---
 * ##### 驼峰key值对象转换
 *
 * @param {string} underlineStr 下划线字符串
 * @returns  {string} 驼峰字符串
 * @function
 */
export const toLineObj = (obj) => {
  if (!obj) return obj;
  const lineObj = {};
  Object.keys(obj).forEach(key => (lineObj[camelToUnderline(key)] = obj[key]));
  return lineObj;
};

// 获取环境变量
export const getEnv = () => _env_;


export const numberToArray = (number: number, desc?: string): string[] => {
  const result: string[] = [];
  for (let i = 0; i < number; i++) {
    let value = `${i + 1}`;
    if (desc) {
      value += desc;
    }
    result.push(value);
  }
  return result;
};

// 统一wx入口的方法 为了兼容不同的版本
// 当前系统中使用的微信版本比较低 后续统一更换和兼容api接口


// 获取图片的数据
export const getLocalImgData = (localId, options?: any) => new Promise((resolve, reject) => {
  const opt = {
    localId,
    success(res) {
      // console.log('获取到的图片base64数据,可以用img标签显示', res.localData);
      resolve(res);
    },
    fail: reject,
  };
  wx.getLocalImgData({ ...opt, ...options });
});


// 选择图片
export const chooseImage = async (options?: any) => new Promise((resolve, reject) => {
  const defaultOption = {
    count: 1, // 默认只能选择一个
    success: (res) => {
      resolve(res.localIds);
    },
    fail: reject,
  };
  wx.chooseImage({ ...defaultOption, ...options });
});

export const copyText = (text) => {
  const node = document.createElement('input');
  node.setAttribute('readonly', 'readonly');
  node.value = text;
  document.body.appendChild(node);
  node.select();
  document.execCommand('Copy');
  node.className = 'oInput';
  node.style.display = 'none';
  return text;
};

export const copy = nodeId => copyText(document.getElementById(nodeId).innerText);

interface OptionProps {
  label: string;
  value: string | number;
}
export const getOptions = (templateMap, key: string) => {
  if (templateMap[key]) {
    const type = templateMap[key]?.define?.type;
    if (type === 'enum' || type === 'stringenum') {
      const options: OptionProps[] = [];
      Object.entries(templateMap[key].define.mapping).forEach(([index, value]) => {
        options.push({
          label: value,
          value: index,
        });
      });
      return (options || []).length > 0 ? options : [];
    }
  }
  return [{ label: '没数据', value: '0' }];
};

export const getOptionsArray = (templateMap, key: string) => {
  let res = getOptions(templateMap,key);
  return res.map(({label,value})=>([label,value]))
};


export const getDesc = (templateMap, key: string, type: string): string => {
  if (templateMap[key]) {
    const typeObj = templateMap[key];

    return typeObj.define.mapping[type];
  }
  return '';
};

export function mapsToOptions(templateMap, name: string): string[] {
  if (!templateMap[name]) return ['1', '2', '3'];

  const min = Number(templateMap[name]?.define.min);
  const max = Number(templateMap[name]?.define.max);
  const step = Number(templateMap[name]?.define.step);
  const result: string[] = [];

  for (let i = min; i <= max; i += step) {
    result.push(i.toString());
  }
  return result;
}

const parseColor = hexStr => (hexStr.length === 4 ? hexStr.substr(1).split('')
  .map(s => 0x11 * parseInt(s, 16)) : [hexStr.substr(1, 2),
  hexStr.substr(3, 2), hexStr.substr(5, 2)].map(s => parseInt(s, 16))
);

// zero-pad 1 digit to 2
const pad = s => ((s.length === 1) ? `0${s}` : s);

const gradientColors = (start: string, end: string, steps: number, gamma: number) => {
  let i; let j; let ms; let me; const output = []; const so = [];
  gamma = gamma || 1;
  const normalize = function (channel) {
    return Math.pow(channel / 255, gamma);
  };
  start = parseColor(start).map(normalize);
  end = parseColor(end).map(normalize);
  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1);
    me = 1 - ms;
    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
    }
    output.push(`#${so.join('')}`);
  }
  return output;
};

const colorListBymode = (mode) => {
  let colorList = [];
  const whiteConfig = ['#fbed96', '#aeecd5'];
  const colorConfig = [['#E500F0', '#2F00FF'], ['#03F7F9', '#32FB1D'], ['#A0EF07', '#EECD0C'], ['#F90219', '#E500F0'], ['#2F00FF', '#E500F0']];
  if (mode === 'colour') {
    colorConfig.forEach((item) => {
      const arr = gradientColors(item[0], item[1], 72, 1);
      colorList.push(...arr);
    });
  } else {
    colorList = [...gradientColors(whiteConfig[0], whiteConfig[1], 360, 1)];
  }
  console.log(colorList, 'colorList');

  return colorList;
};

export const getColorValue = (mode, deg) => {
  const colorList = colorListBymode(mode);
  return colorList[deg];
};

export const getDegValue = (mode, color) => {
  const colorList = colorListBymode(mode);
  return colorList.findIndex(value => value === color);
};

type RetryOptions = {
  /**
   * 重试次数
   */
  times?: number
  /**
   * 间隔多久重试
   */
  delay?: number
}
export function retry(fn, options: RetryOptions) {
  let { times = 3 } = options;
  const { delay = 1000 } = options;
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      fn()
        .then(resolve)
        .catch((err) => {
          times -= 1;
          if (times > 0) {
            setTimeout(() => {
              tryOnce();
            }, delay);
            return;
          }
          reject(err);
        });
    };
    return tryOnce();
  });
}

export const px2vw = (px: number, viewport = 375): string | number => {
  const vw = px * (100 / viewport);

  return `${vw.toFixed(3)}vw`;
};
