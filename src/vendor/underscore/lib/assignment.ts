/**
 * 简单的deep merge实现
 * @see https://github.com/bevacqua/assignment
 */
export function assignment(result: any, ...sources): any {
  var stack = sources;
  var item;
  var key;
  while (stack.length) {
    item = stack.shift();
    for (key in item) {
      if (item.hasOwnProperty(key)) {
        if (typeof result[key] === 'object' && result[key] && Object.prototype.toString.call(result[key]) !== '[object Array]') {
          if (typeof item[key] === 'object' && item[key] !== null) {
            result[key] = assignment({}, result[key], item[key]);
          } else {
            result[key] = item[key];
          }
        } else {
          result[key] = item[key];
        }
      }
    }
  }
  return result;
}
