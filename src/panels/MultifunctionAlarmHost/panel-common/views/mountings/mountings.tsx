import React from 'react';
import classNames from 'classnames';
import { Cell } from '@components/base';
import { getThemeType } from '@libs/theme';
import {useHistory} from "react-router";
import './mountings.less';

import LightSensorImage from "../icons/normal/light-sensor.png";
import LightSensorImageBlueWhite from "../icons/blue-white/light-sensor.svg";
import LightSensorImageDark from "../icons/dark/light-sensor.svg";
import LightSensorImageColorful from "../icons/colorful/light-sensor.svg";
import LightSensorImageMorandi from "../icons/morandi/light-sensor.svg";
import ExigencyBtnImage from "../icons/normal/exigency-btn.png";
import ExigencyBtnImageBlueWhite from "../icons/blue-white/exigency-btn.svg";
import ExigencyBtnImageDark from "../icons/dark/exigency-btn.svg";
import ExigencyBtnImageColorful from "../icons/colorful/exigency-btn.png";
import ExigencyBtnImageMorandi from "../icons/morandi/exigency-btn.png";
import SoundLightImage from "../icons/normal/sound-light-alarm.svg";
import SoundLightImageBlueWhite from "../icons/blue-white/sound-light-alarm.svg";
import SoundLightImageDark from "../icons/dark/sound-light-alarm.svg";
import SoundLightImageColorful from "../icons/colorful/sound-light-alarm.svg";
import SoundLightImageMorandi from "../icons/morandi/sound-light-alarm.svg";
import CoAlarmImage from "../icons/normal/co-alarm.png";
import CoAlarmImageBlueWhite from "../icons/blue-white/co-alarm.svg";
import CoAlarmImageDark from "../icons/dark/co-alarm.svg";
import CoAlarmImageColorful from "../icons/colorful/co-alarm.png";
import CoAlarmImageMorandi from "../icons/morandi/co-alarm.png";
import MethaneAlarmImage from "../icons/normal/methane-alarm.png";
import MethaneAlarmImageBlueWhite from "../icons/blue-white/methane-alarm.svg";
import MethaneAlarmImageDark from "../icons/dark/methane-alarm.svg";
import MethaneAlarmImageColorful from "../icons/colorful/methane-alarm.png";
import MethaneAlarmImageMorandi from "../icons/morandi/methane-alarm.png";
import GasAlarmImage from "../icons/normal/gas-alarm.png";
import GasAlarmImageBlueWhite from "../icons/blue-white/gas-alarm.svg";
import GasAlarmImageDark from "../icons/dark/gas-alarm.svg";
import GasAlarmImageColorful from "../icons/colorful/gas-alarm.png";
import GasAlarmImageMorandi from "../icons/morandi/gas-alarm.png";

export function Mountings() {
  const themeType = getThemeType();
  const lightSensorImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return LightSensorImage;
      case 'blueWhite':
        return LightSensorImageBlueWhite;
      case 'dark':
        return LightSensorImageDark;
      case 'colorful':
        return LightSensorImageColorful;
      case 'morandi':
        return LightSensorImageMorandi;
      default:
        return LightSensorImage;
    }
  };
  const exigencyBtnImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return ExigencyBtnImage;
      case 'blueWhite':
        return ExigencyBtnImageBlueWhite;
      case 'dark':
        return ExigencyBtnImageDark;
      case 'colorful':
        return ExigencyBtnImageColorful;
      case 'morandi':
        return ExigencyBtnImageMorandi;
      default:
        return ExigencyBtnImage;
    }
  };
  const soundLightAlarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SoundLightImage;
      case 'blueWhite':
        return SoundLightImageBlueWhite;
      case 'dark':
        return SoundLightImageDark;
      case 'colorful':
        return SoundLightImageColorful;
      case 'morandi':
        return SoundLightImageMorandi;
      default:
        return SoundLightImage;
    }
  };
  const coAlarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return CoAlarmImage;
      case 'blueWhite':
        return CoAlarmImageBlueWhite;
      case 'dark':
        return CoAlarmImageDark;
      case 'colorful':
        return CoAlarmImageColorful;
      case 'morandi':
        return CoAlarmImageMorandi;
      default:
        return CoAlarmImage;
    }
  };
  const methaneAlarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return MethaneAlarmImage;
      case 'blueWhite':
        return MethaneAlarmImageBlueWhite;
      case 'dark':
        return MethaneAlarmImageDark;
      case 'colorful':
        return MethaneAlarmImageColorful;
      case 'morandi':
        return MethaneAlarmImageMorandi;
      default:
        return MethaneAlarmImage;
    }
  };
  const gasAlarmImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return GasAlarmImage;
      case 'blueWhite':
        return GasAlarmImageBlueWhite;
      case 'dark':
        return GasAlarmImageDark;
      case 'colorful':
        return GasAlarmImageColorful;
      case 'morandi':
        return GasAlarmImageMorandi;
      default:
        return GasAlarmImage;
    }
  };
  const history = useHistory();
  const handleAdd = () => {
    return history.push('/addDevExplanatory');
  };
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url}></img>
  );
  return (
    <article className={classNames('dev-list')}>
      <ul>
        <li className="list-item" id={'light-sensor'}>
          <Cell
            size="medium"
            title="亮度传感器"
            prefixIcon={cellIcon(lightSensorImageSrc())}
            value=""
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'exigency-btn'}>
          <Cell
            size="medium"
            title="紧急按钮"
            prefixIcon={cellIcon(exigencyBtnImageSrc())}
            value=""
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'sound-light-alarm'}>
          <Cell
            size="medium"
            title="声光报警器"
            value=""
            prefixIcon={cellIcon(soundLightAlarmImageSrc())}
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'co-alarm'}>
          <Cell
            size="medium"
            title="CO报警器"
            value=""
            prefixIcon={cellIcon(coAlarmImageSrc())}
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'methane-alarm'}>
          <Cell
            size="medium"
            title="甲烷报警器"
            value=""
            prefixIcon={cellIcon(methaneAlarmImageSrc())}
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
        <li className="list-item" id={'gas-alarm'}>
          <Cell
            size="medium"
            title="燃气报警器"
            value=""
            prefixIcon={cellIcon(gasAlarmImageSrc())}
            valueStyle="gray"
            onClick={() => {}}
          />
        </li>
      </ul>
      <div className="dev-operate">
        <div className="addDev" onClick={handleAdd}>
          如何添加设备
        </div>
        <div className="fastAdd">快速添加</div>
      </div>
    </article>
  );
}
