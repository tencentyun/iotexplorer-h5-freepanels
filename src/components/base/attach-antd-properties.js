/*
 * @Author: wrq
 * @Date: 2021-10-03 22:13:34
 * @Description: 提取 antd 组件上的属性到自定义组件上
 */
export function attachAntdProperties(target, antd, properties = []) {
  const ret = target;

  for (let i = 0; i < properties.length; i++) {
    const key = properties[i];

    if (antd[key] !== undefined) {
      ret[key] = antd[key];
    }
  }

  return ret;
}
