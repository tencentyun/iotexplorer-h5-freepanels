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
