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
    fail: reject
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
    fail: reject
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

export const copy = (nodeId) => copyText(document.getElementById(nodeId).innerText);

