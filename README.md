# iotexplorer-h5-freepanels

腾讯连连免开发面板

## 项目简介

腾讯连连免开发面板是腾讯物联网平台为各行业设备制造商、方案商及应用开发商、普通开发者提供的各类物联网设备在腾讯连连小程序中控制的页面组件。
当前免开发面板提供[42个品类](./docs/product.md)的物联网标准化控制设备，**236** 个标准化模板。

通过提供的代码，可以支持两种方式实现智能硬件的快速接入。

### 1、直接使用

通过 [腾讯云物联网开发平台](https://console.cloud.tencent.com/iotexplorer) 提供的标准方案，可以实现快速配置。通过 [快速配置方案](./docs/explorer.md) 配置成功后，通过手机微信扫一扫，调试或验证物联网王设备智能控制的免开发面板效果。

当前已经支持的品类 [更多产品详情](./docs/product.md) , **模板预览效果：[点击跳转预览效果图](./docs/product-preview.md)**

| 一级分类     | 二级产品品类    | 现名称    | 文件名称                        |
|----------|-----------|--------|------------------------------|
| 电工-插座类   | 五孔单插      | 五孔单插   | five-plug                    |
|          | 三孔单插      | 三孔单插   | three-plug                   |
|          | 电量统计插座    | 电量统计插座 | electricity-stats-receptacle |
|          | 墙壁插座带USB  | 墙壁插头   | wall-plug                    |
| 电工类-开关类  | 场景开关      | 一路开关   | switch-one                   |
|          | 多路开关      | 二路开关   | two-switch                   |
|          |           | 三路开关   | three-switch                 |
|          |           | 四路开关   | four-switch                  |
|          |           | 五路开关   | five-switch                  |
|          | 调光开关      | 调光开关   | dimmer-switch                |
|          | 冷暖白光灯     | 冷暖白光灯  | white-lamp                   |
|          | 四路灯       | 四路灯    | four-streetlights            |
|          | 五路灯       | 五路灯    | five-streetlights            |
|          | 智能灯       | 智能灯    | lamp                         |
|          | 一路灯       | 一路灯    | lamp-one                     |
| 网关类      | 网关        | 智能网关   | intelligent-gateway          |
| 传感类      | 门窗磁传感器    | 门磁     | magnetic-door                |
|          | 人体运动&存在传感 | 人体传感器  | body-sensor                  |
|          | 声光报警器     | 声光报警器  | audible-visual-alarm         |
|          | 温湿度传感器    | 温湿度传感器 | temperature-humidity-sensor  |
|          | 紧急按钮      | 紧急按钮   | emergency-button             |
|          | 报警主机      | 多功能报警器 | multifunction-alarm-host     |
|          | 烟雾报警      | 烟雾传感器  | smoke-alarm                  |
|          | 燃气报警      | 燃气报警器  | gas-alarm                    |
|          | 水浸报警      | 水浸传感器  | immersion-sensor             |
| 小家电      | 取暖器       | 取暖器    | heater                       |
|          | 加湿器       | 加湿器    | humidifier                   |
|          | 温控器       | 温控器    | thermostat                   |
|          | 电动窗帘      | 电动窗帘   | electric-curtains            |
|          | 空气净化器     | 空气净化器  | air-purifier                 |
|          | 净水机       | 净水机    | water-purifier               |
|          | 电扇        | 风扇     | fan                          |
|          | 香薰机       | 香薰机    | aromatherapy-machine         |
|          | 晾衣架       | 晾衣架    | laundry-rack                 |
|          | 宠物喂养机     | 宠物喂养机  | pet-feeding-device           |
| 运动健康（蓝牙） | 体脂秤       | 体脂秤    | body-scales                  |
|          | 血压计       | 血压计    | blood-pressure-meter         |
|          | 智能跳绳      | 智能跳绳   | smart-rope                   |
| 大家电      | 新风机       | 新风机    | new-fan                      |
|          | 空调        | 空调     | air-conditioner              |
|          | 热水器       | 热水器    | water-heater                 |
| 厨电类      | 电烤箱       | 电烤箱    | electric-oven                |



### 2、二次开发

通过提供的免开发面板的示例代码，基于此进行二次定制开发，可以参考[Demo](https://github.com/tencentyun/iotexplorer-h5-panel-demo)开发出自己产品匹配的效果。




## 开发说明

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

- 1、项目文档
    当前支持43个品类， 73个模版类型，317个模版皮肤样式。[产品支持列表](./product.md)、[产品皮肤预览](./product-preview.md)
    开发说明：[如何开发自定义面板](./explorer.md)
    项目日志：[免开发面板更新日志](./changeLog.md)

- 2、代码结构说明

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
