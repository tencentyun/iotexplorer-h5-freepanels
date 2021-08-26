# iotexplorer-h5-freepanels

腾讯连连免开发面板

## Startup

1. `npm install`
2. 启动指定面板 `npm run dev --category=FiveRoadLight --panel=panel-default`
3. 编译出来的脚本和样式地址为：
4. 调试虚拟面板，在浏览器访问
`https://iot.cloud.tencent.com/h5panel/developing?productId=${对应品类的产品id}&uin=mmtest`
5. 真实面板的调试方法见官方文档

```
js地址：
https://127.0.0.1:9000/FiveRoadLight_panel-default.js

css地址：
https://127.0.0.1:9000/FiveRoadLight_panel-default.css

其中 'socket' 为前面指定的 category 参数，'panel-default' 为前面指定的 panel 参数
```
4.新开发的面板需要在panel-config.js文件中增加面板配置,可以参考已有目录和panel-config.js中的写法
5. 如果是基于H5面板开发，代理配置为：

```
developing.script/developing.js https://127.0.0.1:9000/FiveRoadLight_panel-default.js
developing.style/developing.css https://127.0.0.1:9000/FiveRoadLight_panel-default.css
```


