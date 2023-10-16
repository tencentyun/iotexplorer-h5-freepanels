const path = require('path');

/**
 * 入口目录配置
 * 格式 = src/panels/${产品品类Key}/${面板名称}/app.tsx
 */
module.exports = {
  SmartSpeaker: {
    category: '全屋智能-网关中控-无屏音响A2S',
    panels: [
      { name: 'panel-default', desc: '默认面板' },
    ],
  },
};
