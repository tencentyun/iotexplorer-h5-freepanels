import React, { useState } from 'react';
import './curtain_background.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import Bus from '@libs/utillib';
import { useMount } from 'ahooks';

export function Curtain_background() {
  const [position, setPosition] = useState((sdk.deviceData.percent_control && sdk.deviceData.percent_control >= 0 && sdk.deviceData.percent_control <= 100) ? sdk.deviceData.percent_control : 40);
  const [animInfo, setAnimInfo] = useState({ dire: '' });

  useMount(() => {
    Bus.addListener('percent_control', (ratio) => {
      updateDom(ratio, 0);
    });
  });

  const updateDom = (ratio, tSpan) => {
    const el_wrap = document.getElementById('dark_leave_wrap');
    const x = el_wrap?.clientWidth / 22.0 * ratio / 100;
    const divs = document.getElementsByClassName('dark_leave_div');
    for (let i = 0; i < divs.length; i++) {
      if (tSpan <= 0) {
        divs[i].style.transition = null;
      } else {
        divs[i].style.transition = `width ${tSpan}s linear`;
      }
      divs[i].style.width = `${x}px`;
    }
  };

  // const [lampSrc] = useState(lampIcon);
  return (
    <article id={'curtain_background'} className={classNames('curtain_background')}>
      <div className="curtain_title">
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

export default Curtain_background;
