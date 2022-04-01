import React, { useState } from 'react';
import './curtain_options.less';
import classNames from 'classnames';
import { onControlDevice } from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SvgIcon } from '@components/common/icon';
import Options_Work from '../work_model/work_model';
import Options_Motor from '../motor/motor';
import { useHistory } from 'react-router-dom';
import { useDidMount, useWillUnmount } from 'beautiful-react-hooks';
import Bus from '@libs/utillib';

let timer = null;
const info = { curRatio: sdk.deviceData.percent_control ? sdk.deviceData.percent_control : 30 };

export function Curtain_options() {
  // const [openRatio, onToggleOpenRatio] = useState(
  //   sdk.deviceData.percent_control ? sdk.deviceData.percent_control : 50
  // );

  useDidMount(() => {
    timer = setInterval(changeRatio, 50);
    Bus.emit('percent_control', info.curRatio);
    moveProgress(info.curRatio);
  });

  useWillUnmount(() => {
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

  const moveProgress = (ratio) => {
    ratio /= 100.0;
    const control_bar_progress = document.getElementById('control_bar_progress');
    const control_bar_progress_pass = document.getElementById('control_bar_progress_pass');
    const control_bar_progress_btn = document.getElementById('control_bar_progress_btn');

    let x = control_bar_progress.clientWidth * ratio - control_bar_progress_btn.clientWidth / 2;
    if (x < 0) x = 0;
    if (x > control_bar_progress?.clientWidth - control_bar_progress_btn.clientWidth) x = control_bar_progress?.clientWidth - control_bar_progress_btn.clientWidth;
    control_bar_progress_btn.style.marginLeft = `${x}px`;
    control_bar_progress_pass.style.width = `${x + control_bar_progress_btn.clientWidth * 1}px`;
    // control_bar_progress_pass.style.width = (ratio*100)+'%';

    document.getElementById('control_bar_title').innerText = `开合度:${parseInt(ratio * 100)}%`;
  };

  const openLeave = (openRatio) => {
    info.curRatio = openRatio;
    Bus.emit('percent_control', openRatio);
  };

  const handleMoveOpenRatio = (e: React.MouseEvent) => {
    const control_bar_progress = document.getElementById('control_bar_progress');

    let openRatio = (e.changedTouches[0].clientX - control_bar_progress.offsetLeft) / control_bar_progress.clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    const openRatio_val = parseInt(openRatio * 100); // 数值

    // onToggleOpenRatio(openRatio_val);
    info.curRatio = openRatio_val;
    openLeave(openRatio_val);
    moveProgress(openRatio_val);
  };

  const handleEndMoveOpenRatio = (e: React.MouseEvent) => {
    const control_bar_progress = document.getElementById('control_bar_progress');

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

  const handleStartOpenRatio = (e: React.MouseEvent) => {
    sdk.deviceData.control = 'pause';
    onControlDevice('control', 'pause');

    const control_bar_progress = document.getElementById('control_bar_progress');

    let openRatio = (e.changedTouches[0].clientX - control_bar_progress.offsetLeft) / control_bar_progress.clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    const openRatio_val = parseInt(openRatio * 100); // 数值
    // onToggleOpenRatio(openRatio_val);
    info.curRatio = openRatio_val;
    onControlDevice('percent_control', openRatio_val);
  };

  return (
    <article id={'curtain_options'} className={classNames('curtain_options')}>
      <div className="card_top">
        <div className="across">

        </div>

        <div className="control_bar">
          <div id="control_bar_title" className="control_bar_title">开合度:50%</div>
          <div id="control_bar_progress" className="control_bar_progress" onTouchStart={handleStartOpenRatio}
               onTouchMove={handleMoveOpenRatio} onTouchEnd={handleEndMoveOpenRatio}>
            <div className="control_bar_left"></div>
            <div className="control_bar_center">
              <div id="control_bar_progress_pass" className="control_bar_progress_pass">
                <div id="control_bar_progress_btn" className="control_bar_progress_btn">
                  <div className="control_bar_progress_btn_mark_left"></div>
                  <div className="control_bar_progress_btn_mark_right"></div>
                </div>
              </div>
            </div>
            <div className="control_bar_right"></div>
          </div>
        </div>

        <div className="options_line"></div>
      </div>


      <div className="button_model">
        <div className="options_box" onClick={onCurtain}>
          <div>
            <SvgIcon name={'icon-curtains-motor-reverse-normal'} color="#FFFFF" width={55} height={55}/>
          </div>
          <div className="options_font1">
            电机反向
          </div>
        </div>

        <div className="options_box" onClick={onWork}>
          <div className="icon_wh">
            <SvgIcon className="icon_margtop" name={'icon-curtains-morning-mode-normal'} color="#FFFFF" width={150}
                     height={150}/>
          </div>
          <div className="options_font2">
            早安模式
          </div>
        </div>

        <div className="options_box"
             onClick={onCurtainWork}
        >
          <div>
            <SvgIcon name={'icon-curtains-more-normal'} color="#FFFFF" width={60} height={20}/>
          </div>
          <div className="options_font3">
            更多
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

export default Curtain_options;
