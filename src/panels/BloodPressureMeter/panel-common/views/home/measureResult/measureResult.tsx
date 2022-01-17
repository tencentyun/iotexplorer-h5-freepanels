import React, { useState } from 'react';
import { Modal } from '@components/base';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';
import './measureResult.less';

import HighImage from '../../icons/normal/hight-pressure-result.svg';
import HighImageBlueWhite from '../../icons/blue-white/hight-pressure-result.svg';
import HighImageDark from '../../icons/dark/hight-pressure-result.svg';
import HighImageColorful from '../../icons/colorful/hight-pressure-result.svg';
import HighImageMorandi from '../../icons/morandi/hight-pressure-result.svg';

import LowImage from '../../icons/normal/low-pressure-result.svg';
import LowImageBlueWhite from '../../icons/blue-white/low-pressure-result.svg';
import LowImageDark from '../../icons/normal/low-pressure.svg';
import LowImageMorandi from '../../icons/morandi/low-pressure-result.svg';

import PulseImage from '../../icons/normal/pulse-result.svg';
import PulseImageBlueWhite from '../../icons/blue-white/pulse-result.svg';
import PulseImageDark from '../../icons/normal/pulse.svg';
import PulseImageMorandi from '../../icons/morandi/pulse-result.svg';

const MeasureResult = ({ isShow, onClose }) => {
  const themeType = getThemeType();
  const highPressureImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return HighImage;
      case 'blueWhite':
        return HighImageBlueWhite;
      case 'dark':
        return HighImageDark;
      case 'colorful':
        return HighImageColorful;
      case 'morandi':
        return HighImageMorandi;
      default:
        return HighImage;
    }
  };
  const lowPressureImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return LowImage;
      case 'blueWhite':
        return LowImageBlueWhite;
      case 'dark':
        return LowImageDark;
      case 'morandi':
        return LowImageMorandi;
      default:
        return LowImage;
    }
  };
  const pulseImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return PulseImage;
      case 'blueWhite':
        return PulseImageBlueWhite;
      case 'dark':
        return PulseImageDark;
      case 'morandi':
        return PulseImageMorandi;
      default:
        return PulseImage;
    }
  };
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({
      spray_mode: dataUser
    });
    onClose();
  };
  return (
    <Modal
      title={'测量结果'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <div className="head">
        <div className="head-title">血压正常</div>
        <div className="head-time">2021-10-1 10:22</div>
      </div>
      <div className="measure-result">
        <div className="title">
          <div>
            高压 <div className="unit">mmHg</div>
          </div>
          <div>
            低压<div className="unit">mmHg</div>
          </div>
          <div>
            脉搏<div className="unit">/分钟</div>
          </div>
        </div>
        <div className="values">
          <div className="pre-img">
            <img src={highPressureImageSrc()} alt="" />
            <img src={lowPressureImageSrc()} alt="" />
            <img src={pulseImageSrc()} alt="" />
          </div>
          <div className="pre-value">
            <div className="label">
              {sdk.deviceData.systolic_pressure
                ? sdk.deviceData.systolic_pressure
                : 0}
            </div>
            <div className="label">
              {sdk.deviceData.disatolic_pressure
                ? sdk.deviceData.disatolic_pressure
                : 0}
            </div>
            <div className="label">
              {sdk.deviceData.pulse ? sdk.deviceData.pulse : 0}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MeasureResult;
