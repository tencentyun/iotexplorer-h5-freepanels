import React, {useState} from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Block, Row, Col } from '@components/layout';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice} from '@hooks/useDeviceData';
import {TimePicker} from '@components/business';

import SwitchImageDefaule from "./icons/normal/switch-close.svg";
import SwitchImage from "./icons/normal/switch.svg";
import SwitchImageBlueWhite from "./icons/blue-white/switch.svg";
import SwitchImageDark from "./icons/dark/switch.svg";
import SwitchImageColorful from "./icons/colorful/switch.svg";
import SwitchImageMorandi from "./icons/morandi/switch.svg";

import TimingImageDefaule from "./icons/normal/timing-close.svg";
import TimingImage from "./icons/normal/timing.svg";
import TimingImageBlueWhite from "./icons/blue-white/timing.svg";
import TimingImageDark from "./icons/dark/timing.svg";
const TimingImageColorful = "https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/lamp-one/colorful/timing.png";
import TimingImageMorandi from "./icons/morandi/timing.svg";

import ReadImage from "./icons/normal/read.svg";
import ReadImageCheck from "./icons/normal/read-check.svg";
import ReadImageBlueWhite from "./icons/blue-white/read.svg";
import ReadImageDark from "./icons/dark/read.svg";
import ReadImageColorful from "./icons/colorful/read.svg";
import ReadImageMorandi from "./icons/morandi/read.svg";

import SleepImage from "./icons/normal/sleep.svg";
import SleepImageCheck from "./icons/normal/sleep-check.svg";
import SleepImageBlueWhite from "./icons/blue-white/sleep.svg";
import SleepImageDark from "./icons/dark/sleep.svg";
import SleepImageColorful from "./icons/colorful/sleep.svg";
import SleepImageMorandi from "./icons/morandi/sleep.svg";

import WorkImage from "./icons/normal/work.svg";
import WorkImageCheck from "./icons/normal/work-check.svg";
import WorkImageBlueWhite from "./icons/blue-white/work.svg";
import WorkImageDark from "./icons/dark/work.svg";
import WorkImageColorful from "./icons/colorful/work.svg";
import WorkImageMorandi from "./icons/morandi/work.svg";

import RelaxImage from "./icons/normal/relax.svg";
import RelaxImageCheck from "./icons/normal/relax-check.svg";
import RelaxImageBlueWhite from "./icons/blue-white/relax.svg";
import RelaxImageDark from "./icons/dark/relax.svg";
import RelaxImageColorful from "./icons/colorful/relax.svg";
import RelaxImageMorandi from "./icons/morandi/relax.svg";

export function Scene() {
  const themeType = getThemeType();
  const [switchSrc] = useState(SwitchImageDefaule);
  const [timingSrc] = useState(TimingImageDefaule);
  const [timingVisible, onToggleTiming] = useState(false);

  const switchImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SwitchImage;
      case 'blueWhite':
        return SwitchImageBlueWhite;
      case 'dark':
        return SwitchImageDark;
      case 'colorful':
        return SwitchImageColorful;
      case 'morandi':
        return SwitchImageMorandi;
      default:
        return SwitchImage;
    }
  };
  const timingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return TimingImage;
      case 'blueWhite':
        return TimingImageBlueWhite;
      case 'dark':
        return TimingImageDark;
      case 'colorful':
        return TimingImageColorful;
      case 'morandi':
        return TimingImageMorandi;
      default:
        return TimingImage;
    }
  };
  const readImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return ReadImage;
      case 'blueWhite':
        return ReadImageBlueWhite;
      case 'dark':
        return ReadImageDark;
      case 'colorful':
        return ReadImageColorful;
      case 'morandi':
        return ReadImageMorandi;
      default:
        return ReadImage;
    }
  };
  const sleepImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SleepImage;
      case 'blueWhite':
        return SleepImageBlueWhite;
      case 'dark':
        return SleepImageDark;
      case 'colorful':
        return SleepImageColorful;
      case 'morandi':
        return SleepImageMorandi;
      default:
        return SleepImage;
    }
  };
  const workImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return WorkImage;
      case 'blueWhite':
        return WorkImageBlueWhite;
      case 'dark':
        return WorkImageDark;
      case 'colorful':
        return WorkImageColorful;
      case 'morandi':
        return WorkImageMorandi;
      default:
        return WorkImage;
    }
  };
  const relaxImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return RelaxImage;
      case 'blueWhite':
        return RelaxImageBlueWhite;
      case 'dark':
        return RelaxImageDark;
      case 'colorful':
        return RelaxImageColorful;
      case 'morandi':
        return RelaxImageMorandi;
      default:
        return RelaxImage;
    }
  };
  const handleCountdownDefault = (value: number) => {
    const hours: number = (value - value % (60 * 60)) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: any = [hours.toString(), minutes.toString()];
    return countdownTime;
  };

  const handleCountdownVal = () => {
    let switchOpen = sdk.deviceData.count_down;
    return handleCountdownDefault(switchOpen);
  };
  const handleTiming = () => {
    if (sdk.deviceData.power_switch === 1) {
      onToggleTiming(true);
    }
  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  };
  const handleMode = (type: string) => {
    if (sdk.deviceData.power_switch === 1) {
      onControlDevice('scene', type);
    }
  };
  return (
    <div className="scene">
      <div className="scene-box">
        <Row>
          <Col onClick={() => handleMode('1')}>
            <Block className={sdk.deviceData.scene === '1' && 'check'}>
              <img src={sdk.deviceData.scene === '1' ? ReadImageCheck : readImageSrc()} alt="" />
            </Block>
            <div className="label">阅读</div>
          </Col>
          <Col onClick={() => handleMode('2')}>
            <Block className={sdk.deviceData.scene === '2' && 'check'}>
              <img src={sdk.deviceData.scene === '2' ? SleepImageCheck : sleepImageSrc()} alt="" />
            </Block>
            <div className="label">晚安</div>
          </Col>
          <Col onClick={() => handleMode('0')}>
            <Block className={sdk.deviceData.scene === '0' && 'check'}>
              <img src={sdk.deviceData.scene === '0' ? WorkImageCheck : workImageSrc()} alt="" />
            </Block>
            <div className="label">工作</div>
          </Col>
        </Row>
        <Row>
          <Col onClick={() => handleMode('3')}>
            <Block className={sdk.deviceData.scene === '3' && 'check'}>
              <img src={sdk.deviceData.scene === '3' ? RelaxImageCheck : relaxImageSrc()} alt="" />
            </Block>
            <div className="label">休闲</div>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </div>
      {/* 控制区 */}
      <div className="control-area">
        <Block onClick={handlePowerSwitch}>
          <img
            src={
              sdk.deviceData.power_switch === 1 ? switchImageSrc() : switchSrc
            }
            alt=""
          />
          <div>开关</div>
        </Block>
        <Block onClick={handleTiming}>
          <img
            src={
              sdk.deviceData.power_switch === 1 ? timingImageSrc() : timingSrc
            }
            alt=""
          />
          <div>定时</div>
        </Block>
        <TimePicker
          showSemicolon={false}
          value={handleCountdownVal()}
          showUnit={true}
          showTime={false}
          showTwoDigit={false}
          theme={themeType}
          title="倒计时关闭"
          onCancel={onToggleTiming.bind(null, false)}
          onConfirm={(value: any) => {
            const hour: number = Number(value[0].split('时')[0]);
            const mins: number = Number(value[1].split('分')[0]);
            const num = hour * 3600 + mins * 60;
            onControlDevice('count_down', num);
          }}
          visible={timingVisible}
        />
      </div>
    </div>
  );
}
