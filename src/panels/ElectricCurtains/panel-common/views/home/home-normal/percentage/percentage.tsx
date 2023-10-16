import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Modal } from '@components/base';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './percentage.less';
import { useMount } from 'ahooks';

const Percentage = ({ cur_percent, isShow, onClose, onCommit }) => {
  // const [percent, setPercent] = useState(sdk.deviceData.percent_control1?sdk.deviceData.percent_control1:0);
  const [percent, setPercent] = useState(cur_percent);
  const cur_info = { cur_percent };

  const max_value = 100;
  const min_value = 0;
  const currentWidth = `${5 + (percent - min_value) * 95 / (max_value - min_value)}%`;

  const updatePercentVal = (val, endTouch) => {
    if (val < min_value) {
      val = min_value;
    } else if (val > max_value) {
      val = max_value;
    }
    setPercent(val);
    // if(endTouch){
    //   apiControlDeviceData({
    //     percent_control1: val
    //   });
    // }
  };

  const handleSelectBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');
    const progress = document.getElementById('lightbright-progress');
    const dot = document.getElementById('lightbright-progress-dot');

    const offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;

    const brightness = (e.clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    const brightness_val = parseInt(brightness * 100); // 亮度数值
    console.log(brightness_val);
    updatePercentVal(brightness_val, true);

    // let x = e.clientX - slider.offsetLeft - offsetModel - dot.clientWidth / 2;
    // if (x < 0) x = 0;
    // if (x > slider?.clientWidth - dot.clientWidth)
    //   x = slider?.clientWidth - dot.clientWidth;
    // dot.style.marginLeft = x + 'px';
    // progress.style.width = (x + dot.clientWidth * 1.2) + 'px';
  };

  const handleMoveBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');
    const progress = document.getElementById('lightbright-progress');
    const dot = document.getElementById('lightbright-progress-dot');

    const offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;
    const brightness = (e.changedTouches[0].clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    const brightness_val = parseInt(brightness * 100); // 亮度数值
    updatePercentVal(brightness_val, false);

    // let x = e.changedTouches[0].clientX - slider.offsetLeft - offsetModel - dot.clientWidth / 2;
    // if (x < 0) x = 0;
    // if (x > slider?.clientWidth - dot.clientWidth)
    //   x = slider?.clientWidth - dot.clientWidth;
    // dot.style.marginLeft = x + 'px';
    // progress.style.width = (x + dot.clientWidth * 1.2) + 'px';
  };

  const handleEndMoveBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');

    const offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;
    const brightness = (e.changedTouches[0].clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    const brightness_val = parseInt(brightness * 100); // 亮度数值
    console.log(brightness_val);
    // 修改设备亮度值
    updatePercentVal(brightness_val, true);
  };

  const onCancel = () => {
    // console.log('onCancel')
    // console.log(cur_info.cur_percent)
    updatePercentVal(cur_info.cur_percent, true);
    onClose();
  };

  const handleCommit = () => {
    // console.log('handleCommit')
    // apiControlDeviceData({
    //   percent_control1: percent
    // });
    cur_info.cur_percent = percent;
    onCommit(percent);
  };

  return (
    <Modal
      title={'百分比设置'}
      visible={isShow}
      onClose={onCancel}
      onConfirm={handleCommit}
    >
      <div className="lightbright">
        <div className={'lightbright-container'}>
          <div id={'lightbright-mark'} className={classNames('lightbright-mark')}>
            <div></div>
            <div id={'lightbright-value-wrap'} className={classNames('lightbright-value-wrap')}>
              {/* <img src={brightnessIcon} alt="" /> */}
              {/* <SvgIcon name={'icon-white-lamp-Heating-normal'} color="#0F0F0F" width={160} height={160}/> */}
              <div id={'lightbright-value-text'} className={classNames('lightbright-value-text')}>{percent}</div>
            </div>
            <div></div>
          </div>
          <div id={'lightbright-slider'} className={classNames('lightbright-slider')} onClick={handleSelectBrightness}
               onTouchMove={handleMoveBrightness} onTouchEnd={handleEndMoveBrightness}>
            <div id={'lightbright-progress'} className={classNames('lightbright-progress')} style={{ width: currentWidth }}>
              <div id={'lightbright-progress-dot'} className={classNames('lightbright-progress-dot')}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Percentage;
