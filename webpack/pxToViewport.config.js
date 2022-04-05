module.exports = {
  unitToConvert: 'px', // (String) 需要转换的单位，默认为"px"
  viewportWidth: 750, // (Number) 设计稿的视口宽度，一般是750
  unitPrecision: 3, //  (Number) 单位转换后保留的精度（很多时候无法整除）
  viewportUnit: 'vw', // (String) 希望使用的视口单位
  propList: ['*'], // 不需要转换的样式
  selectorBlackList: ['.ignore', '.hairlines'],
  /* (Array) 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位
            如果传入的值为字符串的话，只要选择器中含有传入值就会被匹配
                例如 selectorBlackList 为 ['body'] 的话， 那么 .body-class 就会被忽略
            如果传入的值为正则表达式的话，那么就会依据CSS选择器是否匹配该正则
                例如 selectorBlackList 为 [/^body$/] , 那么 body 会被忽略，而 .body 不会*/
  minPixelValue: 1, // (Number) 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
  mediaQuery: false, // (Boolean) 媒体查询里的单位是否需要转换单位
  exclude: [/node_modules/, /src\/pc/],
  // include: [/src\/mobile/],
  /* (Array or Regexp) 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件
            如果值是一个正则表达式，将包含匹配的文件，否则将排除该文件
            如果传入的值是一个数组，那么数组里的值必须为正则
            注意：exclude和include是可以一起设置的，将取两者规则的交集*/
  landscapeUnit: 'vw', // (String) 横屏时使用的单位
  landscapeWidth: 750, // (Number) 横屏时使用的视口宽度
};
