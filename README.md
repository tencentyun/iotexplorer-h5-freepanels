# iotexplorer-h5-freepanels

腾讯连连免开发面板

## Startup

1. `npm install`
2. 启动指定面板 `npm run dev --category=FiveRoadLight --panel=panel-default`
3. 编译出来的脚本和样式地址为：

```
js地址：
https://127.0.0.1:9000/FiveRoadLight_panel-default.js

css地址：
https://127.0.0.1:9000/FiveRoadLight_panel-default.css

其中 'socket' 为前面指定的 category 参数，'panel-default' 为前面指定的 panel 参数
```

4. 如果是基于H5面板开发，代理配置为：

```
developing.script/developing.js https://127.0.0.1:9000/FiveRoadLight_panel-default.js
developing.style/developing.css https://127.0.0.1:9000/FiveRoadLight_panel-default.css
```
