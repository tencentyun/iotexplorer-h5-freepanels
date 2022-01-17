import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {Modal} from '@components/base';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import './drawdown.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';


const Drawdown = ({isShow, onClose}) => {
  const max_value = 100;
  const min_value = 20;
  const step = 5;
  const [dataUser, setDataUser] = useState(sdk.deviceData.water_set ? sdk.deviceData.water_set : 20);
  // const currentWidth = (dataUser-min_value)*95/(max_value-min_value)+'%';
  // 这么设置的原因是因为进度条左端初始值有min-width影响,前5%的移动看不出变化
  const currentWidth = (5 + (dataUser - min_value) * 95 / (max_value - min_value)) + '%';
  const handleCommit = () => {
    apiControlDeviceData({
      water_set: dataUser
    });
    onClose();
  };

  useEffect(() => {
    updateVolumetricVal(dataUser);
  }, []);

  const updateVolumetricVal = (val) => {
    if (val < min_value) {
      val = min_value;
    } else if (val > max_value) {
      val = max_value;
    }
    setDataUser(val);
  }

  const toggleReduce = () => {
    updateVolumetricVal(dataUser - step);
  }

  const toggleAdd = () => {
    updateVolumetricVal(dataUser + step);
  }

  const handleSelectBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');
    let offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;
    let brightness = (e.clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    let brightness_val = parseInt(brightness * (max_value - min_value) / step) * step + min_value;
    updateVolumetricVal(brightness_val);
  };

  const handleMoveBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');
    let offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;
    let brightness = (e.changedTouches[0].clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    let brightness_val = parseInt(brightness * (max_value - min_value) / step) * step + min_value;
    updateVolumetricVal(brightness_val);
  };

  const handleEndMoveBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');
    let offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;
    let brightness = (e.changedTouches[0].clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    let brightness_val = parseInt(brightness * (max_value - min_value) / step) * step + min_value;
    updateVolumetricVal(brightness_val);
  };

  return (
    <Modal
      title={'水位设置'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <div className="lightbright">
        <div className={'lightbright-container'}>
          <div id={'lightbright-mark'} className={classNames('lightbright-mark')}>
            <div className={classNames('lightbright-mark-op-btn')} onClick={toggleReduce}>-</div>
            <div id={'lightbright-value-wrap'} className={classNames('lightbright-value-wrap')}>
              <div id={'lightbright-value-text'} className={classNames('lightbright-value-text')}>{dataUser}</div>
            </div>
            <div className={classNames('lightbright-mark-op-btn')} onClick={toggleAdd}>+</div>
          </div>
          <div id={'lightbright-slider'} className={classNames('lightbright-slider')} onClick={handleSelectBrightness}
               onTouchMove={handleMoveBrightness} onTouchEnd={handleEndMoveBrightness}>
            <div id={'lightbright-progress'} className={classNames('lightbright-progress')}
                 style={{width: currentWidth}}>
              <div id={'lightbright-progress-dot'} className={classNames('lightbright-progress-dot')}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Drawdown;
