## 换肤
### 使用方法
 - 在各产品入口文件app.js中引入global.less
### 样式文件说明
- base.less
```less
:root {
  // 公共5度灰 用于个性化主题之外的任意产品的文字或icon等元素。
  --global-color-darker: #000000;
  --global-color-dark: #576273;
  --global-color-gray: #A6AFC2;
  --global-color-light: #A3A6AB;
  --global-color-lighter: #B5C4D1;

  // 黑白
  --global-color-black: #000000;
  --global-color-white: #FFFFFF;
}
```
   - common.less
```less
// 定义全局字号变量和行高变量，用于快速文字排版
// 字号
.font_24 {
  font-size: @font_24;
}
.font_36 {
  font-size: @font_36;
}
.font_48 {
  font-size: @font_48;
}
.font_60 {
  font-size: @font_60;
}
.font_72 {
  font-size: @font_72;
}
.font_120 {
  font-size: @font_120;
}
```
   -
