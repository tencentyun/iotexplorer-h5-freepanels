# 免开发面板项目开发指南

## 开发调试

### 启动命令

`npm run dev --category=分类名称 --panel=面板名称`

### 入口说明

启动命令会寻找入口 `src/panels-next/CategoryKey/panel-xxx/app.tsx`

根据启动参数，构建产品面板，在 `localhost:9000` 启动开发服务器；对应文件路径为：`localhost:9000/index.js`、`localhost:9000/index.css`

### whistle代理配置

```
# 设备h5面板 js css
https://developing.script/developing.js http://localhost:9000/index.js
https://developing.style/developing.css http://localhost:9000/index.css

# 热更配置 ws json
wss://iot.cloud.tencent.com:9000/ws ws://localhost:9000/ws
developing.script localhost:9000
```

### 公众号调试工具

h5面板服务

https://iot.cloud.tencent.com/h5panel/developing?productId=${PRODUCT_ID}&deviceName=${DEVICE_NAME}

### 构建指南
`npm run build` 根据 `panelBuild.config.js` 的配置，按需构建面板

## 项目说明
- 当前项目配置默认基于375px设计稿，尺寸单位转换为vw
- 使用免开发面板直出自带的 `react16.14.0` 版本，作为外部依赖


