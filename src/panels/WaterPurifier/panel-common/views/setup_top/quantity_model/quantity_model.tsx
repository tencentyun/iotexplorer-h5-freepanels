import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { stringKey } from '@libs/global';
import { Modal } from '@components/base';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './quantity_model.less';

export const enumSprayMode: stringKey = {
  // humidity: '早安模式',
  // manual: '晚安模式',

};

const Quantity_model = ({ isShow, onClose }) => {
  const max_value = 1000;
  const min_value = 0;
  const step = 5;
  const [dataUser, setDataUser] = useState(sdk.deviceData.flow_set ? sdk.deviceData.flow_set : 350);
  const currentWidth = `${(dataUser - min_value) * 100 / (max_value - min_value)}%`;
  const handleCommit = () => {
    apiControlDeviceData({
      flow_set: dataUser,
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
  };

  const toggleReduce = () => {
    updateVolumetricVal(dataUser - step);
  };

  const toggleAdd = () => {
    updateVolumetricVal(dataUser + step);
  };
  const handleSelectBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');
    const offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;
    const brightness = (e.clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    const brightness_val = parseInt(brightness * (max_value - min_value)) + min_value;
    updateVolumetricVal(brightness_val);
  };

  const handleMoveBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');
    const offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;
    const brightness = (e.changedTouches[0].clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    const brightness_val = parseInt(brightness * (max_value - min_value)) + min_value;
    updateVolumetricVal(brightness_val);
  };

  const handleEndMoveBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');

    const offsetModel = (document.body.clientWidth - document.getElementsByClassName('modal-body')[0].clientWidth) / 2;
    const brightness = (e.changedTouches[0].clientX - slider.offsetLeft - offsetModel) / slider.clientWidth;
    const brightness_val = parseInt(brightness * (max_value - min_value)) + min_value;
    updateVolumetricVal(brightness_val);
  };

  return (
    <Modal
      title={'设置杯量'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <div className="lightbright">
        <div className={'lightbright-container'}>
          <div id={'lightbright-mark'} className={classNames('lightbright-mark')}>
            <div className={classNames('lightbright-mark-op-btn')} onClick={toggleReduce}>-</div>

            <div id={'lightbright-value-wrap'} className={classNames('lightbright-value-wrap')}>
              {/* <img src={brightnessIcon} alt="" /> */}
              {/* <SvgIcon name={'icon-white-lamp-Heating-normal'} color="#0F0F0F" width={160} height={160}/> */}
              <div id={'lightbright-value-text'} className={classNames('lightbright-value-text')}>{dataUser}</div>
            </div>
            <div className={classNames('lightbright-mark-op-btn')} onClick={toggleAdd}>+</div>

          </div>
          <div id={'lightbright-slider'} className={classNames('lightbright-slider')} onClick={handleSelectBrightness}
               onTouchMove={handleMoveBrightness} onTouchEnd={handleEndMoveBrightness}>
            <div id={'lightbright-progress'} className={classNames('lightbright-progress')}
                 style={{ width: currentWidth }}>
              <div id={'lightbright-progress-dot'} className={classNames('lightbright-progress-dot')}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Quantity_model;
