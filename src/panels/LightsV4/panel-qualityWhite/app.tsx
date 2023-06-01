import render from '@custom/Render';
import App from './Common';
import '@theme/panel-qualityWhite';
import './app.less';

 /**
  *   所有的灯的入口
  * 
  *  * 是否显示模式 取决于灯光模式物模型
  * 
  *  * 无灯光模式 默认为双色模式
  * 
  *  * h5 弹窗分为 
  *   
  *    1 单色模式和双色模式
  *    2 单色 双色 和彩色
  * 
  *  参考一/二期免开发面板功能
  *  对应产品
  *  |名称        |       描述            |    备注                  |
  *  |-|-|-|
  *  |筒灯、射灯   |      双色模式         |    无模式                 |
  *  |单/双色灯源  |   单色、双色模式       |    两种模式选择           |
  *  |彩光灯带     |      彩色模式         |     无模式                |
  *  |灯带电源     | 单色/双色/彩色模式     |    三种模式选择           |
  * 
  *
  *
  *  * 每个产品都可以传递 productType 类渲染支持组件的图标显示
  *  * defModel 支持固定的指定显示模式  默认是双色模式
  */

render(App, { isModuleTimer: true, isModal: true, isPopUp: false });
