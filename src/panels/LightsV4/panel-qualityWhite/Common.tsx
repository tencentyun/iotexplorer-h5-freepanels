import React from 'react';
import { Router } from '@router';
import { Home } from './Home';
import { TimerList, TimerAdd, MainSwitch, Repeat } from '../Common/Timer';
import { CountDownPage } from '../Common/CountDown';

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
  *    spotlight 射灯 --默认
  *    downlight 筒灯
  *    bicolorLamp 单双色灯
  *    lightStrip 灯带
  *   
  * 
  *  * productColorMode  支持固定的指定显示模式  默认是双色模式 1
  *    
  *    "0": "单色模式",
  *    "1": "双色模式"
  *    "2":"彩色光模式"
  */

const App = (props) => {
  const route = [
    { path: '/home', Component: Home },
    { path: '/timer/list', Component: TimerList },
    { path: '/timer/add', Component: TimerAdd },
    { path: '/timer/action/switch', Component: MainSwitch },
    { path: '/timer/action/repeat', Component: Repeat },
    { path: '/timer/countdownpage', Component: CountDownPage },
  ];
  return <Router route={route} {...props} detail={false} />;
};

export default App;
