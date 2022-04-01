import React from 'react';
import './dark_head.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import Bus from '@libs/utillib';
import { useDidMount } from 'beautiful-react-hooks';

export function Dark_head() {
  useDidMount(() => {
    Bus.addListener('percent_control', (ratio) => {
      updateDom(ratio, 0);
    });
  });

  const updateDom = (ratio, tSpan) => {
    const el_wrap = document.getElementById('dark_leave_wrap');
    // console.log(one_el_div?.clientWidth);
    // console.log(el_wrap?.clientWidth);
    const x = el_wrap?.clientWidth / 22.0 * ratio / 100;
    // console.log(x);
    const divs = document.getElementsByClassName('dark_leave_div');
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.width = `${x}px`;
    }
  };

  return (
    <article id={'dark_head'} className={classNames('dark_head')}>
      <div className="dark_head_fond">
        {sdk.deviceData.control === 'open' ? '开启中' : sdk.deviceData.control === 'close' ? '关闭中' : '暂停'}
      </div>
      <div className="background_city">
        <img className="dark_bar"
             src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-bar-normal.png"
             alt=""/>
        <img className="dark_city"
             src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-city-dark.png"
             alt=""/>
        <div id="dark_leave_wrap" className="dark_leave_wrap">
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_space"></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-morandi.png"
                                               alt=""/></div>
        </div>
      </div>
    </article>
  );
}

export default Dark_head;
