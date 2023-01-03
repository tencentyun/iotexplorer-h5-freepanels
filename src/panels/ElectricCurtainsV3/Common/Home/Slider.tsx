import React, { ReactNode, forwardRef, useImperativeHandle, useEffect } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { onControlDevice } from '@hooks/useDeviceData';
import Bus from '@libs/utillib';
import { useDidMount, useWillUnmount } from 'beautiful-react-hooks';

let timer;

const SideHead = forwardRef((props, ref) => {
  let { deviceData: { position = 30, mode, power_switch }, doControlDeviceData } = { ...props };

  let info = {
    curRatio: position || position === 0 ? position : 30,
  };

  // useDidMount(() => {
  //   timer = setInterval(changeRatio, 50);
  //   Bus.emit('position', info.curRatio);
  // });

  useEffect(() => {
    moveProgress(position);
  }, [position])

  useWillUnmount(() => {
    clearInterval(timer);
  });



  const changeRatio = () => {
    if (mode === null || mode === 2 || power_switch === 0) {
      clearInterval(timer);
      timer = null;
      return;
    }
    if (mode === 0) {
      if (info.curRatio > 0) {
        info.curRatio = info.curRatio - 1;
        moveProgress(info.curRatio);
        openLeave(info.curRatio);
      }
      if (info.curRatio === 0) {
        clearInterval(timer);
        timer = null;
        doControlDeviceData({ position: info.curRatio })
      }
    } else if (mode === 1) {
      if (info.curRatio < 100) {
        info.curRatio = info.curRatio + 1;
        moveProgress(info.curRatio);
        openLeave(info.curRatio);
      }
      if (info.curRatio === 100) {
        clearInterval(timer);
        timer = null;
        doControlDeviceData({ position: info.curRatio })
      }
    }
  };


  const start = () => {
    timer = setInterval(changeRatio, 100);
  };

  useImperativeHandle(ref, () => ({
    open: start,
    pause: () => {
      clearInterval(timer);
      timer = null;
      doControlDeviceData({ position: info.curRatio })
    },
    close: () => {
      clearInterval(timer);
      timer = null;
      doControlDeviceData({ position: info.curRatio })
    },
  }));

  const getNode = id => document.getElementById(id) || {
    clientWidth: 0,
    offsetLeft: 0,
    style: { marginLeft: 0, width: 0 },
    innerText: '',
  };

  const moveProgress = (pRatio) => {
    const ratio = pRatio / 100.0;
    const { clientWidth } = getNode('bar-progress');
    const controlBar = getNode('control-bar');
    const barBtn = getNode('bar-btn');
    let x = clientWidth * ratio - barBtn?.clientWidth / 2;
    if (x < 0) x = 0;
    if (x > clientWidth - barBtn?.clientWidth) x = clientWidth - barBtn?.clientWidth;
    barBtn.style.marginLeft = `${x}px`;
    controlBar.style.width = `${x + barBtn?.clientWidth * 0}px`;
    const node = getNode('open-ratio');
    node.innerText = getText(pRatio);
  };

  const openLeave = (openRatio) => {
    const { clientWidth } = getNode('leave-wrap');
    const x = ((clientWidth / 12.0) * openRatio) / 100;
    const items = document.getElementsByClassName('leave_item');
    for (let i = 0; i < items.length; i++) {
      items[i].style.width = `${x}px`;
    }
  };

  const getCx = e => e.changedTouches[0] || {};

  const handleMoveOpenRatio = (e: React.TouchEvent) => {
    clearInterval(timer);
    timer = null;
    // onControlDevice('mode', null);

    const { offsetLeft, clientWidth } = getNode('bar-progress');
    const controlBar = getNode('control-bar');
    const barBtn = getNode('bar-btn');
    const cx = getCx(e).clientX;
    let openRatio = (cx - offsetLeft) / clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    const openRatio_val = parseInt(`${openRatio * 100}`, 10); // 亮度数值
    // info.curRatio = openRatio_val;

    const node = getNode('open-ratio');
    node.innerText = getText(openRatio_val);

    openLeave(openRatio_val);

    let x = cx - offsetLeft - barBtn.clientWidth / 2;
    if (x < 0) x = 0;
    if (x > clientWidth - barBtn.clientWidth) x = clientWidth - barBtn.clientWidth;
    barBtn.style.marginLeft = `${x}px`;
    controlBar.style.width = `${x + barBtn.clientWidth * 0}px`;
  };

  const handleEndMoveOpenRatio = (e: React.TouchEvent) => {
    const { offsetLeft, clientWidth } = getNode('bar-progress');
    const cx = getCx(e).clientX;
    let openRatio = (cx - offsetLeft) / clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    const openRatio_val = parseInt(`${openRatio * 100}`, 10); // 亮度数值
    // info.curRatio = openRatio_val;
    moveProgress(openRatio_val);
    openLeave(openRatio_val);
    doControlDeviceData('position', openRatio_val);
    mode !== 2 && doControlDeviceData('mode', null);
  };

  const handleStartOpenRatio = (e: React.TouchEvent) => {
    // sdk.deviceData.control = 'pause';
    // doControlDeviceData('mode', 2);
    const { clientWidth, offsetLeft } = getNode('bar-progress');
    let openRatio = (getCx(e).clientX - offsetLeft) / clientWidth;
    if (openRatio < 0) openRatio = 0;
    if (openRatio > 1) openRatio = 1;
    const openRatio_val = parseInt(`${openRatio * 100}`, 10); // 亮度数值
    // info.curRatio = openRatio_val;
    doControlDeviceData('position', openRatio_val);
  };

  const createNodes = (num) => {
    const nodes: ReactNode[] = [];
    for (let i = 0; i < num; i++) {
      nodes.push(<div className="leave_item" key={i}>
        <div className="leave" />
      </div>);
    }
    return nodes;
  };

  ;
  // 自启动开发开启 同时控制为开启 则为开启中
  // 自启动开发关闭 同时控制为开启 则为关闭中
  // 自启动开发开启 同时控制为关闭 则为关闭 -- 执行完毕后设置为关闭
  const STATUS = {
    open_1: '开启中',
    open_0: '关闭中',
    pause_1: '暂停',
    pause_0: '暂停',
    close_0: '关闭',
    close_1: '关闭',
  };

  const getText = curRatio => `开合度: ${curRatio || '0'}%`;

  const FIXED_POSITION = [
    ['全开', 0],
    ['半开', 50],
    ['1/4', 75],
    ['关闭', 100],

  ];


  return (
    <article className="p-side">
      <div className="state">
        {/* <div className="state-font">
          {STATUS[`${control}_${auto_power}`] || '关闭'}
        </div> */}
      </div>

      <div className="head-img">
        <div className="bar" />
        <div className="radius-left" />
        <div className="radius-right" />
        <div id="leave-wrap" className="leave-wrap">
          <div className="panel panel-left">{createNodes(6)}</div>
          <div className="panel panel-right">{createNodes(6)}</div>
        </div>
      </div>

      <div className="fixed-position">
        {FIXED_POSITION.map(([text, position], index) => <div className="item" key={index} onClick={() => {
          if (!power_switch) {
            return;
          }
          // info.curRatio = position;
          // Bus.emit('position', info.curRatio);
          moveProgress(position);
          openLeave(position);
          doControlDeviceData('position', position);
        }}>{text}</div>)}
      </div>
      {/* <div id="open-ratio" className="open-ratio">
        {getText(info.curRatio)}
      </div> */}
      <div
        className="head-fond"
        onTouchStart={handleStartOpenRatio}
        onTouchMove={handleMoveOpenRatio}
        onTouchEnd={handleEndMoveOpenRatio}
      >
        <div id="bar-progress" className="bar-progress">
          <div id="control-bar" className="control-bar"></div>
          <div id="bar-btn" className="bar-btn"></div>
        </div>
      </div>
    </article>
  );
});

export default SideHead;
