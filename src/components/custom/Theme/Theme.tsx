import { getEnv } from '@utils';
const { isDev, isPreview } = getEnv();
// 预览模式 或者发布模式
if (isPreview || !isDev) {
  require('amfe-flexible');
} else {
  // 不同设计稿的不同尺寸在开发模式下便捷开发适配
  // 开发模式下使用
  require('@theme/base/dev/3x.less');
  document.getElementsByTagName('html')[0].className = 'dev-preview';
}
