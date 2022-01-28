import React from 'react';
import './side_head.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {onControlDevice} from '@hooks/useDeviceData';
import Bus from '@libs/utillib';
import {useDidMount, useWillUnmount} from 'beautiful-react-hooks';

let timer = null;
const info = {curRatio: sdk.deviceData.percent_control ? sdk.deviceData.percent_control : 30}

export function Side_Head() {
  useDidMount(() => {
    timer = setInterval(changeRatio, 50)
    Bus.emit('percent_control', info.curRatio);
    moveProgress(info.curRatio);
  });

  useWillUnmount(() => {
    clearInterval(timer);
  })

  const changeRatio = () => {
    if (sdk.deviceData.control == 'pause') {
      return;
    }

    if (sdk.deviceData.control == 'open') {
      if (info.curRatio > 0) {
        info.curRatio--;
        // onToggleOpenRatio(curRatio);
        moveProgress(info.curRatio)
        openLeave(info.curRatio)
      }
    } else if (sdk.deviceData.control == 'close') {
      if (info.curRatio < 100) {
        info.curRatio++;
        // onToggleOpenRatio(curRatio);
        moveProgress(info.curRatio)
        openLeave(info.curRatio)
      }
    }
  }

  const moveProgress = (ratio) => {
    ratio /= 100.0;
    const control_bar_progress = document.getElementById('control_bar_progress_total');
    const control_bar_progress_pass = document.getElementById('control_bar_progress_pass');
    const control_bar_progress_btn = document.getElementById('control_bar_progress_btn');

    let x = control_bar_progress.clientWidth * ratio - control_bar_progress_btn.clientWidth / 2;
    if (x < 0) x = 0;
    if (x > control_bar_progress?.clientWidth - control_bar_progress_btn.clientWidth)
      x = control_bar_progress?.clientWidth - control_bar_progress_btn.clientWidth;
    control_bar_progress_btn.style.marginLeft = x + 'px';
    control_bar_progress_pass.style.width = (x + control_bar_progress_btn.clientWidth * 0) + 'px';
  }

  // const [openRatio, onToggleOpenRatio] = useState(55);

  const openLeave = (openRatio) => {
    let one_el_div = document.getElementsByClassName("dark_leave_div")[0];
    let el_wrap = document.getElementById("dark_leave_wrap");
    // console.log(one_el_div?.clientWidth);
    // console.log(el_wrap?.clientWidth);
    let x = el_wrap?.clientWidth / 18.0 * openRatio / 100;
    // console.log(x);
    let divs = document.getElementsByClassName("dark_leave_div");
    for (let i = 0; i < divs.length; i++) {

      divs[i].style.width = x + "px";
    }
  }

  const handleMoveOpenRatio = (e: React.MouseEvent) => {
    const control_bar_progress = document.getElementById('control_bar_progress_total');
    const control_bar_progress_pass = document.getElementById('control_bar_progress_pass');
    const control_bar_progress_btn = document.getElementById('control_bar_progress_btn');

    let openRatio = (e.changedTouches[0].clientX - control_bar_progress.offsetLeft) / control_bar_progress.clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    let openRatio_val = parseInt(openRatio * 100); // 亮度数值
    // console.log(openRatio_val);
    // onToggleOpenRatio(openRatio_val);
    info.curRatio = openRatio_val;

    openLeave(openRatio_val);

    let x = e.changedTouches[0].clientX - control_bar_progress.offsetLeft - control_bar_progress_btn.clientWidth / 2;
    if (x < 0) x = 0;
    if (x > control_bar_progress?.clientWidth - control_bar_progress_btn.clientWidth)
      x = control_bar_progress?.clientWidth - control_bar_progress_btn.clientWidth;
    control_bar_progress_btn.style.marginLeft = x + 'px';
    control_bar_progress_pass.style.width = (x + control_bar_progress_btn.clientWidth * 0) + 'px';
  };

  const handleEndMoveOpenRatio = (e: React.MouseEvent) => {
    const control_bar_progress = document.getElementById('control_bar_progress_total');

    let openRatio = (e.changedTouches[0].clientX - control_bar_progress.offsetLeft) / control_bar_progress.clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    let openRatio_val = parseInt(openRatio * 100); // 亮度数值
    // console.log(openRatio_val);
    // onToggleOpenRatio(openRatio_val);
    info.curRatio = openRatio_val;
    moveProgress(info.curRatio);
    openLeave(info.curRatio);
    onControlDevice('percent_control', openRatio_val);
  };

  const handleStartOpenRatio = (e: React.MouseEvent) => {
    sdk.deviceData.control = 'pause';
    onControlDevice('control', 'pause');
    const control_bar_progress = document.getElementById('control_bar_progress_total');

    let openRatio = (e.changedTouches[0].clientX - control_bar_progress.offsetLeft) / control_bar_progress.clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    let openRatio_val = parseInt(openRatio * 100); // 亮度数值
    // console.log(openRatio_val);
    // onToggleOpenRatio(openRatio_val);
    info.curRatio = openRatio_val;
    onControlDevice('percent_control', openRatio_val);
  };
  return (
    <article id={'sidehead'} className={classNames('sidehead')}>
      <div className="dark_head_fond" onTouchStart={handleStartOpenRatio} onTouchMove={handleMoveOpenRatio}
           onTouchEnd={handleEndMoveOpenRatio}>
        <div id="control_bar_progress_total" className="control_bar_progress_total">
          <div id="control_bar_progress_pass" className="control_bar_progress_pass">
          </div>
          <div id="control_bar_progress_btn" className="control_bar_progress_btn">
          </div>
        </div>
      </div>
      <div className="dark_head_img">
        <img className="dark_bar"
             src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-bar-blueWhite.png"
             alt=""/>

        <div id="dark_leave_wrap" className="dark_leave_wrap">
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          {/* <div class="dark_leave_div"><img className="dark_leaves" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png" alt="" /></div>
                  <div class="dark_leave_div"><img className="dark_leaves" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png" alt="" /></div> */}
          <div className="dark_leave_space"></div>
          {/* <div class="dark_leave_div"><img className="dark_leaves" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png" alt="" /></div>
                  <div class="dark_leave_div"><img className="dark_leaves" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png" alt="" /></div> */}
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
          <div className="dark_leave_div"><img className="dark_leaves"
                                               src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-curtain/curtains-curtain-leaves-colorful.png"
                                               alt=""/></div>
        </div>
      </div>
      <div className="state">
        <div className="state_font">
          {sdk.deviceData.control === 'open' ? '开启中' : sdk.deviceData.control === 'close' ? '关闭中' : '暂停'}
        </div>
      </div>
    </article>
  );
};

export default Side_Head;
