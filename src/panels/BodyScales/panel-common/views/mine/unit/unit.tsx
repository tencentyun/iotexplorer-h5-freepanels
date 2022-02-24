import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {Cell, Modal} from '@components/base';
import classNames from "classnames";
import {onControlDevice} from "@hooks/useDeviceData";
import './unit.less';
import hookImage from '../../icons/normal/selected-hook.svg';
import hookImageBlueWhite from '../../icons/blue-white/selected-hook.svg';
import hookImageDark from '../../icons/dark/selected-hook.svg';
import hookImageColorful from '../../icons/colorful/selected-hook.svg';
import hookImageMorandi from '../../icons/morandi/selected-hook.svg';
import hookImageDefault from '../../icons/normal/hook.svg';
import {getThemeType} from "@libs/theme";
const Unit = ({ isShow, onClose }) => {
  const themeType = getThemeType();
  const hookImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return hookImage;
      case 'blueWhite':
        return hookImageBlueWhite;
      case 'dark':
        return hookImageDark;
      case 'colorful':
        return hookImageColorful;
      case 'morandi':
        return hookImageMorandi;
      default:
        return hookImage;
    }
  };
  const [heightUnit, setHeightUnit] = useState(sdk.deviceData.height_unit);
  const [weightUnit, setWeightUnit] = useState(sdk.deviceData.weight_unit);
  const handleCommit = () => {
    onControlDevice('height_unit', heightUnit);
    onControlDevice('weight_unit', weightUnit);
    onClose();
  };

  return (
    <Modal
      title={'编辑单位'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <div className="unit_data">
        <div id={'unit_info'} className={classNames('unit_info')}>
          <div className="height_unit">
            <div className="height_span">
              <div className="card_font">身高单位</div>
            </div>
            <Cell
              className="setting_title"
              title="cm"
              isLink={false}
              value={
                heightUnit === 'cm' ? (
                  <img className="img_select" src={hookImageSrc()} alt="" />
                ) : (
                  <img className="img_default" src={hookImageDefault} alt="" />
                )
              }
              valueStyle="gray"
              size="medium"
              onClick={() => {
                setHeightUnit('cm');
              }}
            />
            <Cell
              className="setting_title"
              title="inch"
              isLink={false}
              value={
                heightUnit === 'inch' ? (
                  <img className="img_select" src={hookImageSrc()} alt="" />
                ) : (
                  <img className="img_default" src={hookImageDefault} alt="" />
                )
              }
              valueStyle="gray"
              size="medium"
              onClick={() => {
                setHeightUnit('inch');
              }}
            />
          </div>
          <div className="weight_unit">
            <div className="weight_span">
              <div className="card_font">称重单位</div>
            </div>
            <Cell
              className="setting_title"
              title="kg"
              isLink={false}
              value={
                weightUnit === 'kg' ? (
                  <img className="img_select" src={hookImageSrc()} alt="" />
                ) : (
                  <img className="img_default" src={hookImageDefault} alt="" />
                )
              }
              valueStyle="gray"
              size="medium"
              onClick={() => {
                setWeightUnit('kg');
              }}
            />
            <Cell
              className="setting_title"
              title="lb"
              isLink={false}
              value={
                weightUnit === 'lb' ? (
                  <img className="img_select" src={hookImageSrc()} alt="" />
                ) : (
                  <img className="img_default" src={hookImageDefault} alt="" />
                )
              }
              valueStyle="gray"
              size="medium"
              onClick={() => {
                setWeightUnit('lb');
              }}
            />
            <Cell
              className="setting_title"
              title="st"
              isLink={false}
              value={
                weightUnit === 'st' ? (
                  <img className="img_select" src={hookImageSrc()} alt="" />
                ) : (
                  <img className="img_default" src={hookImageDefault} alt="" />
                )
              }
              valueStyle="gray"
              size="medium"
              onClick={() => {
                setWeightUnit('st');
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Unit;
