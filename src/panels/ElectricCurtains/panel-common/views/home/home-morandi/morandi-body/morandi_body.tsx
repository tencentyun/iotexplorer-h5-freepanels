import React, { useState } from 'react';
import './morandi_body.less';
import classNames from 'classnames';
import Options_Work from '../../home-normal/work_model/work_model';
import Options_Motor from '../../home-normal/motor/motor';
import { SvgIcon } from '@components/common/icon';
import { useHistory } from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { onControlDevice } from '@hooks/useDeviceData';
import { useMount, useUnmount } from 'ahooks';
import Bus from '@libs/utillib';

let timer = null;
const info = { curRatio: sdk.deviceData.percent_control ? sdk.deviceData.percent_control : 30 };

export function Morandi_body() {
  // const [openRatio, onToggleOpenRatio] = useState(
  //   sdk.deviceData.percent_state ? sdk.deviceData.percent_state : 50
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
    const index = ratio * 7;
    const items = document.getElementsByClassName('morandi-progress-card');
    for (let i = 0; i < items.length; i++) {
      const tmp = items[i];
      const tag = parseInt(tmp.attributes['data-key'].value);
      if (tag <= index) {
        tmp.style.backgroundColor = tmp.attributes['data-color'].value;
      } else {
        tmp.style.backgroundColor = 'transparent';
      }
    }
  };

  // const [openRatio, onToggleOpenRatio] = useState(55);

  const openLeave = (openRatio) => {
    // onToggleOpenRatio(openRatio);
    // let el_wrap = document.getElementById("dark_leave_wrap");
    // // console.log(one_el_div?.clientWidth);
    // // console.log(el_wrap?.clientWidth);
    // let x = el_wrap?.clientWidth/22.0*openRatio/100;
    // // console.log(x);
    // let divs=document.getElementsByClassName("dark_leave_div");
    // for(let i=0;i<divs.length;i++){

    //   divs[i].style.width = x + "px";
    // }
    if (openRatio === 0) {
      onControlDevice('control', 'open');
    } else {
      onControlDevice('control', 'close');
    }
  };

  const history = useHistory();

  const onCurtainWork = () => {
    history.push('/curtain_more');
  };

  const [selectTheCurtain, theCurtain_options] = useState(false);
  const [selectTheWork, theCurtain_Work] = useState(false);

  const onCurtain = () => {
    theCurtain_options(true);
  };
  const onWork = () => {
    theCurtain_Work(true);
  };
  const onSelectOpenRatio = (index) => {
    // console.log(index);
    const items = document.getElementsByClassName('morandi-progress-card');
    for (let i = 0; i < items.length; i++) {
      const tmp = items[i];
      const tag = parseInt(tmp.attributes['data-key'].value);
      if (tag <= index) {
        tmp.style.backgroundColor = tmp.attributes['data-color'].value;
      } else {
        tmp.style.backgroundColor = 'transparent';
      }
    }
    const val = (index + 1) * 100 / 7.0;
    openLeave(val);
    onControlDevice('percent_control', val);
  };
  const onSwitch = () => {
    onControlDevice('control', 'pause');
  };

  const handleStartOpenRatio = (e: React.MouseEvent) => {
    sdk.deviceData.control = 'pause';
    onControlDevice('control', 'pause');

    const control_bar_progress = document.getElementById('morandi-progress-card-wrap');

    let openRatio = (e.changedTouches[0].clientX - control_bar_progress.offsetLeft) / control_bar_progress.clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    const openRatio_val = parseInt(openRatio * 100); // 数值
    // onToggleOpenRatio(openRatio_val);
    info.curRatio = openRatio_val;
    onControlDevice('percent_control', openRatio_val);
  };

  const handleMoveOpenRatio = (e: React.MouseEvent) => {
    const control_bar_progress = document.getElementById('morandi-progress-card-wrap');

    let openRatio = (e.changedTouches[0].clientX - control_bar_progress.offsetLeft) / control_bar_progress.clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    const openRatio_val = parseInt(openRatio * 100); // 数值

    // onToggleOpenRatio(openRatio_val);
    info.curRatio = openRatio_val;
    // openLeave(openRatio_val);
    Bus.emit('percent_control', info.curRatio);
    moveProgress(openRatio_val);
  };

  const handleEndMoveOpenRatio = (e: React.MouseEvent) => {
    const control_bar_progress = document.getElementById('morandi-progress-card-wrap');

    let openRatio = (e.changedTouches[0].clientX - control_bar_progress.offsetLeft) / control_bar_progress.clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    const openRatio_val = parseInt(openRatio * 100); // 数值
    // onToggleOpenRatio(openRatio_val);
    info.curRatio = openRatio_val;
    moveProgress(info.curRatio);
    Bus.emit('percent_control', info.curRatio);
    onControlDevice('percent_control', openRatio_val);
  };

  return (
    <article id={'morandi_body'} className={classNames('morandi_body')}>

      <div className="morandi_card">
        <div className="morandi_botton">
          <div className="botton">
            <div className="botton_box" onClick={() => openLeave(0)}>
              <SvgIcon
                name={sdk.deviceData.control === 'open' && 'icon-curtains-open-unlock-morandi' || 'icon-curtains-open-morandi'}
                color="#FFFFF" width={60} height={20}/>

              <div className={classNames('botton_open', sdk.deviceData.control === 'open' && 'font_select')}>
                开启
              </div>
            </div>
          </div>
          <div onClick={onSwitch} id='power'>
            <SvgIcon
              name={!sdk.deviceData.control || sdk.deviceData.control === 'pause' ? 'icon-curtains-total-unlock-morandi' : 'icon-curtains-total-paused-morandi'}
              color="#000000" width={140} height={140}/>
          </div>
          <div className="botton">
            <div className="botton_box" onClick={() => openLeave(100)}>
              <SvgIcon
                name={sdk.deviceData.control === 'close' && 'icon-curtains-close-unlock-morandi' || 'icon-curtains-close-open-morandi'}
                color="#FFFFF" width={60} height={20}/>

              <div className={classNames('botton_close', sdk.deviceData.control === 'close' && 'font_select')}>
                关闭
              </div>
            </div>

          </div>
        </div>

        <div className="progress">
          <div className="morandi-progress-card-dot-wrap">
            <div className="morandi-progress-card-dot">
            </div>
          </div>
          <div className="morandi-progress-card-mark">
            <div>1%</div>
            <div>50%</div>
            <div>100%</div>
          </div>
          <div className="morandi-progress-card-border">
            <div id="morandi-progress-card-wrap" className="morandi-progress-card-wrap"
                 onTouchStart={handleStartOpenRatio} onTouchMove={handleMoveOpenRatio}
                 onTouchEnd={handleEndMoveOpenRatio}>
              <div data-key="0" data-color="#FDFBFC" className="morandi-progress-card"
                   style={{ backgroundColor: '#FDFBFC' }}></div>
              <div data-key="1" data-color="#E6E3E4" className="morandi-progress-card"
                   style={{ backgroundColor: '#E6E3E4' }}></div>
              <div data-key="2" data-color="#BCB5B7" className="morandi-progress-card"
                   style={{ backgroundColor: '#BCB5B7' }}></div>
              <div data-key="3" data-color="#9D9497" className="morandi-progress-card"
                   style={{ backgroundColor: '#9D9497' }}></div>
              <div data-key="4" data-color="#7E7678" className="morandi-progress-card"
                   style={{ backgroundColor: '#7E7678' }}></div>
              <div data-key="5" data-color="#655C5F" className="morandi-progress-card"
                   style={{ backgroundColor: '#655C5F' }}></div>
              <div data-key="6" data-color="#4E4749" className="morandi-progress-card"
                   style={{ backgroundColor: '#4E4749' }}></div>
            </div>
          </div>
        </div>

        <div className="across"></div>

        <div className="morandi_model">
          <div className="model_span"
               onClick={onCurtain}
          >
            <SvgIcon name={'icon-curtains-motor-reverse-morandi'} color="#FFFFF" width={55} height={55}/>
            <div className="model_font1">电机反向</div>
          </div>

          <div className="model_span"
               onClick={onWork}
          >
            <SvgIcon className="morandi_model_icon1" name={'icon-curtains-morning-mode-morandi'} color="#FFFFF"/>
            <div className="model_font2">早安模式</div>
          </div>

          <div className="model_span"
               onClick={onCurtainWork}
          >
            <SvgIcon className="morandi_model_icon2" name={'icon-curtains-more-morandi'} color="#FFFFF" width={60}
                     height={23}/>
            <div className="model_font3">更多</div>
          </div>
        </div>
      </div>
      <Options_Motor
        isShow={selectTheCurtain}
        onClose={() => {
          theCurtain_options(false);
        }}
      />

      <Options_Work
        isShow={selectTheWork}
        onClose={() => {
          theCurtain_Work(false);
        }}
      />
    </article>
  );
}

export default Morandi_body;
