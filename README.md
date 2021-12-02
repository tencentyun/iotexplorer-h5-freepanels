# iotexplorer-h5-freepanels

腾讯连连免开发面板

## Startup

### 启动项目

1. `npm install`
   
2. 启动指定面板 `npm run dev --category=FiveRoadLight --panel=panel-default`

3. 编译出来的脚本和样式地址为：
``` javascript
// js地址：
https://127.0.0.1:9000/FiveRoadLight_panel-default.js

// css地址：
https://127.0.0.1:9000/FiveRoadLight_panel-default.css

其中 'FiveRoadLight' 为前面命令行指定的 `category` 参数，'panel-default' 为前面命令行指定的 `panel` 参数
```

4.新开发的面板需添加配置

需要在 `webpack/panel-config.js` 文件中增加面板配置,可以参考已有目录和写法


### 代理配置

1、下载[whistle](http://wproxy.org/whistle/) 通过浏览器代理

```
npm install -g whistle
w2 help # 查看对应的命令
whistle start -p 8888 # 指定端口启动浏览器代理，如果不指定默认为 8899
# w2 restart 重启
# w2 stop 停止
相关文档请查看 http://wproxy.org/whistle/quickstart.html
```

```
浏览器安装代理插件：Proxy SwitchyOmega
主要是将浏览器页面请求代理到 127.0.0.1:8888 [即 whistle 启动端口]

chrome 市场直接安装下载[需翻墙] https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif

国内可以通过github下载 [SwitchyOmega_Chromium.crx] 文件手动安装。
地址：https://github.com/FelisCatus/SwitchyOmega/releases

安装方法
https://jingyan.baidu.com/article/219f4bf7a0b737de442d38e8.html

插件配置与使用方法
http://c.biancheng.net/python_spider/SwitchyOmega.html

```

如果是基于H5面板开发，代理配置为：
需要在[iot控制台](https://console.cloud.tencent.com/iotexplorer)按照流程
创建项目 -> 创建产品 -> 选择物模型 -> 交互开发 --> 面板配置 -> 自定义面板 -> 设置白名单 -> 设备调试

可以在线拼接调试地址(见调试)，也可以通过小程序长按获取已配置设备联调的h5页面地址。
```
# 通过在whistle 的 rule 中配置代理规则，可以实现代理到本地服务的功能。
developing.script/developing.js https://127.0.0.1:9000/FiveRoadLight_panel-default.js
developing.style/developing.css https://127.0.0.1:9000/FiveRoadLight_panel-default.css
```

### 调试与展示
4. 调试虚拟面板，在浏览器访问
`https://iot.cloud.tencent.com/h5panel/developing?productId=${对应品类的产品id}&uin={白名单的用户}`


5. 真实面板的调试
   方法见[官方文档](https://cloud.tencent.com/document/product/1081/49028)



### 目录说明

```
_
|-- dist # 构建编译的页面级js 文件
|-- src  # 源码目录
    |-- assets  # 普通静态资源、svg等
        |-- common
        |-- device
        |-- kugou
        |-- panel
    |-- components # 基础组件库
        |-- custom # 行业定制的面开发面板依赖的基础组件库
        |-- # 自定义开发 基础组件
        |--
    |-- constants # 页面里面所含有的静态变量
        |--
    |-- hooks # 使用到 react 的hooks 或jsSdk 中的hook信息，主要用于请求与设备通信接口
        |--
        |--
    |-- libs # 集成的第三库或公共库
        |-- wxlib
        |-- 
    |-- models # 特定面板数据请求响应
        |--
    |-- panels # 独立页面面板区域[主要开发目录]
        |--
        |--
    |-- style # 依赖的样式信息，公共的样式信息
        |-- custom 
        |-- themes
    |-- verdor 
        |-- underscore # underscore 提供的基础方法
        |--
```



## 已支持设备
