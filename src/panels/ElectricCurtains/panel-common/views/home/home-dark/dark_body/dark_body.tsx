import React from 'react';
import './dark_body.less';
import classNames from 'classnames';
import { SvgIcon } from '@components/common/icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { onControlDevice } from '@hooks/useDeviceData';
import { useMount, useUnmount } from 'ahooks';
import Bus from '@libs/utillib';

let timer = null;
const info = { curRatio: sdk.deviceData.percent_control ? sdk.deviceData.percent_control : 30 };

export function Dark_body() {
  // const [openRatio, onToggleOpenRatio] = useState(
  //   sdk.deviceData.percent_state ? sdk.deviceData.percent_state : 20
  // );
  // useEffect(() => {
  //   moveProgress(openRatio);
  // }, []);

  useMount(() => {
    timer = setInterval(changeRatio, 50);
    Bus.emit('percent_control', info.curRatio);
    moveProgress(info.curRatio);
  });

  useUnmount(() => {
    clearInterval(timer);
  });

  const changeRatio = () => {
    if (sdk.deviceData.control == 'pause') {
      return;
    }

    console.log(info.curRatio);
    if (sdk.deviceData.control == 'open') {
      if (info.curRatio > 0) {
        info.curRatio--;
        // onToggleOpenRatio(curRatio);
        Bus.emit('percent_control', info.curRatio);
        moveProgress(info.curRatio);
      }
    } else if (sdk.deviceData.control == 'close') {
      if (info.curRatio < 100) {
        info.curRatio++;
        // onToggleOpenRatio(curRatio);
        Bus.emit('percent_control', info.curRatio);
        moveProgress(info.curRatio);
      }
    }
  };

  const moveProgress = (ratio) => {
    ratio /= 100.0;
    const index = ratio * 4;
    const w = document.getElementById('morandi-progress-card-dot-wrap2');
    // console.log(part);
    // console.log(index);
    const items = document.getElementsByClassName('morandi-progress-card-point-dot');
    for (let i = 0; i < items.length; i++) {
      const tmp = items[i];
      const tag = parseInt(tmp.attributes['data-key'].value);
      if (tag == index) {
        if (!tmp.classList.contains('morandi-progress-card-point-dot-bordered')) {
          tmp.classList.add('morandi-progress-card-point-dot-bordered');
        }
      } else {
        if (tmp.classList.contains('morandi-progress-card-point-dot-bordered')) {
          tmp.classList.remove('morandi-progress-card-point-dot-bordered');
        }
      }
    }

    const dotWidth = items[0].clientWidth;
    // w = document.getElementById("morandi-progress-card-border")?.clientWidth;
    const el = document.getElementById('morandi-progress-card-wrap');
    el.style.width = `${index / 4.0 * w?.clientWidth + dotWidth / 2}px`;
  };

  // const [openRatio, onToggleOpenRatio] = useState(55);

  const openLeave = (openRatio) => {
    //   onToggleOpenRatio(openRatio)
    //   // let el_wrap = document.getElementById("dark_leave_wrap");
    //   // // console.log(one_el_div?.clientWidth);
    //   // // console.log(el_wrap?.clientWidth);
    //   // let x = el_wrap?.clientWidth/22.0*openRatio/100;
    //   // // console.log(x);
    //   // let divs=document.getElementsByClassName("dark_leave_div");
    //   // for(let i=0;i<divs.length;i++){
    //   //   divs[i].style.width = x + "px";
    //   // }
    if (openRatio === 0) {
      onControlDevice('control', 'open');
    } else {
      onControlDevice('control', 'close');
    }
  };

  const onSwitch = () => {
    onControlDevice('control', 'pause');
  };

  const handleMoveOpenRatio = (e: React.MouseEvent) => {
    const w = document.getElementById('morandi-progress-card-dot-wrap2');
    const diff = e.changedTouches[0].clientX - w?.offsetLeft;
    let ratio = diff * 100.0 / w?.clientWidth;
    if (ratio < 0) ratio = 0;
    if (ratio > 100) ratio = 100;

    info.curRatio = ratio;
    moveProgress(info.curRatio);
    Bus.emit('percent_control', info.curRatio);
  };

  const handleStartOpenRatio = (e: React.MouseEvent) => {
    sdk.deviceData.control = 'pause';
    onControlDevice('control', 'pause');
    const w = document.getElementById('morandi-progress-card-dot-wrap2');
    const diff = e.changedTouches[0].clientX - w?.offsetLeft;
    let ratio = diff * 100.0 / w?.clientWidth;
    if (ratio < 0) ratio = 0;
    if (ratio > 100) ratio = 100;

    info.curRatio = ratio;
    moveProgress(info.curRatio);
    Bus.emit('percent_control', info.curRatio);
    onControlDevice('percent_control', info.curRatio);
  };

  const handleEndMoveOpenRatio = (e: React.MouseEvent) => {
    const w = document.getElementById('morandi-progress-card-dot-wrap2');
    const diff = e.changedTouches[0].clientX - w?.offsetLeft;
    let ratio = diff * 100.0 / w?.clientWidth;
    if (ratio < 0) ratio = 0;
    if (ratio > 100) ratio = 100;

    info.curRatio = ratio;
    moveProgress(info.curRatio);
    Bus.emit('percent_control', info.curRatio);
    onControlDevice('percent_control', info.curRatio);
  };

  return (
    <article id={'dark_body'} className={classNames('dark_body')}>

      <div className="dark_body_fond" id='power' onClick={onSwitch}>
        <SvgIcon className={'start_btn'}
                 name={!sdk.deviceData.control || sdk.deviceData.control === 'pause' ? 'icon-curtains-total-unlock-dark' : 'icon-curtains-total-paused-dark'}
                 color="#000000" width={140} height={140}/>
      </div>

      <div className="dark_body_card">
        <div className="side_botton">
          <div className={classNames('side_span', sdk.deviceData.control === 'open' && 'button_select')}
               onClick={() => openLeave(0)}>
            <SvgIcon
              name={sdk.deviceData.control === 'open' && 'icon-curtains-open-unlock-dark' || 'icon-curtains-open-dark'}
              color="#FFFFF" width={80} height={20}/>
            {/* <img className="span_open" src={require('../images/curtains-open-blueWhite.png')}></img> */}
            <div className={classNames('open_font', sdk.deviceData.control === 'open' && 'font_select')}>
              开启
            </div>
          </div>

          <div className={classNames('side_span', sdk.deviceData.control === 'close' && 'button_select')}
               onClick={() => openLeave(100)}>
            <SvgIcon
              name={sdk.deviceData.control === 'close' && 'icon-curtains-close-unlock-dark' || 'icon-curtains-close-open-dark'}
              color="#FFFFF" width={80} height={20}/>
            <div className={classNames('close_font', sdk.deviceData.control === 'close' && 'font_select')}>
              关闭
            </div>
          </div>
        </div>

        <div className="progress">
          <div className="morandi-progress-card-dot-wrap">
            <div className="morandi-progress-card-tra">
            </div>
          </div>
          <div className="morandi-progress-card-mark">
            <div>1%</div>
            <div style={{ marginLeft: '5%' }}>50%</div>
            <div>100%</div>
          </div>
          <div id="morandi-progress-card-border" className="morandi-progress-card-border">
            <div id="morandi-progress-card-wrap" className="morandi-progress-card-wrap">
              <div className="morandi-progress-card-bar"></div>
            </div>
            <div id="morandi-progress-card-dot-wrap2" className="morandi-progress-card-dot-wrap2"
                 onTouchStart={handleStartOpenRatio} onTouchMove={handleMoveOpenRatio}
                 onTouchEnd={handleEndMoveOpenRatio}>
              <div data-key="0" className="morandi-progress-card-point-dot"></div>
              <div data-key="1" className="morandi-progress-card-point-dot" style={{ marginLeft: '24%' }}></div>
              <div data-key="2" className="morandi-progress-card-point-dot" style={{ marginLeft: '48%' }}></div>
              <div data-key="3" className="morandi-progress-card-point-dot" style={{ marginLeft: '72%' }}></div>
              <div data-key="4" className="morandi-progress-card-point-dot" style={{ marginLeft: '96%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Dark_body;
