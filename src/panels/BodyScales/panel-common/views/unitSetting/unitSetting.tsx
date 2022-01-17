import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Cell } from '@components/base';
import { getThemeType } from '@libs/theme';
import { onControlDevice} from '@hooks/useDeviceData';
import './unitSetting.less';

import hookImage from '../icons/normal/selected-hook.svg';
import hookImageBlueWhite from '../icons/blue-white/selected-hook.svg';
import hookImageDark from '../icons/dark/selected-hook.svg';
import hookImageColorful from '../icons/colorful/selected-hook.svg';
import hookImageMorandi from '../icons/morandi/selected-hook.svg';
import hookImageDefault from '../icons/normal/hook.svg';
export function UnitSetting() {
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
  return (
    <article className={classNames('unit_data')}>
      <div id={'sacles_foot'} className={classNames('sacles_foot')}>
        <div className="height_unit">
          <div className="card_span">
            <div className="card_font">身高单位</div>
          </div>
          <Cell
            className="setting_title"
            title="cm"
            isLink={false}
            value={
              sdk.deviceData.height_unit === 'cm' ? (
                <img className="img_select" src={hookImageSrc()} alt="" />
              ) : (
                <img className="img_default" src={hookImageDefault} alt="" />
              )
            }
            valueStyle="gray"
            size="medium"
            onClick={() => {
              onControlDevice('height_unit', 'cm');
            }}
          />
          <Cell
            className="setting_title"
            title="inch"
            isLink={false}
            value={
              sdk.deviceData.height_unit === 'inch' ? (
                <img className="img_select" src={hookImageSrc()} alt="" />
              ) : (
                <img className="img_default" src={hookImageDefault} alt="" />
              )
            }
            valueStyle="gray"
            size="medium"
            onClick={() => {
              onControlDevice('height_unit', 'inch');
            }}
          />
        </div>
        <div className="weight_unit">
          <div className="card_span">
            <div className="card_font">称重单位</div>
          </div>
          <Cell
            className="setting_title"
            title="kg"
            isLink={false}
            value={
              sdk.deviceData.weight_unit === 'kg' ? (
                <img className="img_select" src={hookImageSrc()} alt="" />
              ) : (
                <img className="img_default" src={hookImageDefault} alt="" />
              )
            }
            valueStyle="gray"
            size="medium"
            onClick={() => {
              onControlDevice('weight_unit', 'kg');
            }}
          />
          <Cell
            className="setting_title"
            title="lb"
            isLink={false}
            value={
              sdk.deviceData.weight_unit === 'lb' ? (
                <img className="img_select" src={hookImageSrc()} alt="" />
              ) : (
                <img className="img_default" src={hookImageDefault} alt="" />
              )
            }
            valueStyle="gray"
            size="medium"
            onClick={() => {
              onControlDevice('weight_unit', 'lb');
            }}
          />
          <Cell
            className="setting_title"
            title="st"
            isLink={false}
            value={
              sdk.deviceData.weight_unit === 'st' ? (
                <img className="img_select" src={hookImageSrc()} alt="" />
              ) : (
                <img className="img_default" src={hookImageDefault} alt="" />
              )
            }
            valueStyle="gray"
            size="medium"
            onClick={() => {
              onControlDevice('weight_unit', 'st');
            }}
          />
        </div>
      </div>
    </article>
  );
}
export default UnitSetting;
