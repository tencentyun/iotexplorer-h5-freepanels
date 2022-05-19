import React, { useState } from 'react';
import classNames from 'classnames';
import './plugs.less';
import {getThemeType} from '@libs/theme';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {TimePicker} from '@components/business';
import { useHistory } from 'react-router';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';

import PlugImage from '../../icons/normal/plug-open.svg';
import PlugImageClose from '../../icons/normal/plug-close.svg';
import PlugImageBlueWhite from '../../icons/blue-white/plug-open.svg';
import PlugImageBlueWhiteClose from '../../icons/blue-white/plug-close.svg';
import PlugImageDark from '../../icons/dark/plug-open.svg';
import PlugImageDarkClose from '../../icons/dark/plug-close.svg';
import PlugImageColorful from '../../icons/colorful/plug1.svg';
import PlugImageColorfulClose from '../../icons/colorful/plug-close.svg';
import PlugImageMorandi from '../../icons/morandi/plug-open.svg';
import PlugImageMorandiClose from '../../icons/morandi/plug-close.svg';

import ClockImage from '../../icons/normal/clock-open.svg';
import ClockImageClose from '../../icons/normal/clock-close.svg';
import ClockImageBlueWhite from '../../icons/blue-white/clock.svg';
import ClockImageBlueWhiteClose from '../../icons/blue-white/clock-close.svg';
import ClockImageDark from '../../icons/dark/clock.svg';
import ClockImageDarkClose from '../../icons/dark/clock-close.svg';
import ClockImageColorful from '../../icons/colorful/clock.svg';
import ClockImageColorfulClose from '../../icons/colorful/clock-close.svg';
import ClockImageMorandi from '../../icons/morandi/clock.svg';
import ClockImageMorandiClose from '../../icons/morandi/clock-close.svg';

import CountdownImage from '../../icons/normal/countdown-open.svg';
import CountdownImageClose from '../../icons/normal/countdown-close.svg';
import CountdownImageBlueWhite from '../../icons/blue-white/countdown.svg';
import CountdownImageBlueWhiteClose from '../../icons/blue-white/countdown-close.svg';
import CountdownImageDark from '../../icons/dark/countdown.svg';
import CountdownImageDarkClose from '../../icons/dark/countdown-close.svg';
import CountdownImageColorful from '../../icons/colorful/countdown.svg';
import CountdownImageColorfulClose from '../../icons/colorful/countdown-close.svg';
import CountdownImageMorandi from '../../icons/morandi/countdown.svg';
import CountdownImageMorandiClose from '../../icons/morandi/countdown-close.svg';

const plugs = () => {
  const themeType = getThemeType();
  const plugImageSrc = (type: number) => {
    switch (themeType) {
      case 'normal':
        return type === 1 ? PlugImage : PlugImageClose;
      case 'blueWhite':
        return type === 1
          ? PlugImageBlueWhite
          : PlugImageBlueWhiteClose;
      case 'dark':
        return type === 1
          ? PlugImageDark
          : PlugImageDarkClose;
      case 'colorful':
        return type === 1
          ? PlugImageColorful
          : PlugImageColorfulClose;
      case 'morandi':
        return type === 1
          ? PlugImageMorandi
          : PlugImageMorandiClose;
      default:
        return type === 1
          ? PlugImage
          : PlugImageClose;
    }
  };
  const clockImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.power_switch === 1
          ? ClockImage
          : ClockImageClose;
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1
          ? ClockImageBlueWhite
          : ClockImageBlueWhiteClose;
      case 'dark':
        return sdk.deviceData.power_switch === 1
          ? ClockImageDark
          : ClockImageDarkClose;
      case 'colorful':
        return sdk.deviceData.power_switch === 1
          ? ClockImageColorful
          : ClockImageColorfulClose;
      case 'morandi':
        return sdk.deviceData.power_switch === 1
          ? ClockImageMorandi
          : ClockImageMorandiClose;
      default:
        return sdk.deviceData.power_switch === 1
          ? ClockImage
          : ClockImageClose;
    }
  };
  /*定时*/
  const countdownImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.power_switch === 1
          ? CountdownImage
          : CountdownImageClose;
      case 'blueWhite':
        return sdk.deviceData.power_switch === 1
          ? CountdownImageBlueWhite
          : CountdownImageBlueWhiteClose;
      case 'dark':
        return sdk.deviceData.power_switch === 1
          ? CountdownImageDark
          : CountdownImageDarkClose;
      case 'colorful':
        return sdk.deviceData.power_switch === 1
          ? CountdownImageColorful
          : CountdownImageColorfulClose;
      case 'morandi':
        return sdk.deviceData.power_switch === 1
          ? CountdownImageMorandi
          : CountdownImageMorandiClose;
      default:
        return sdk.deviceData.power_switch === 1
          ? CountdownImage
          : CountdownImageClose;
    }
  };
  const history = useHistory();

  //倒计时关闭
  const [countDownVisible1, onToggleCountDown1] = useState(false);
  const [countDownVisible2, onToggleCountDown2] = useState(false);

  const handleCountdownDefault = (value: number) => {
    const hours: number = (value - value % (60 * 60)) / (60 * 60);
    const minutes: number = (value % (60 * 60)) / (60);
    const countdownTime: any = [hours.toString(), minutes.toString()];
    return countdownTime;
  };

  const handleCountdownVal1 = () => {
    let switchOpen = sdk.deviceData.count_down_1;
    return handleCountdownDefault(switchOpen);
  };

  const handleCountdownVal2 = () => {
    let switchOpen = sdk.deviceData.count_down_2;
    return handleCountdownDefault(switchOpen);
  };
  const handleCountdown1 = () => {
    if (sdk.deviceData.switch_1 === 1) {
      onToggleCountDown1(true);
    } else {
      return '';
    }
  };
  const handleCountdown2 = () => {
    if (sdk.deviceData.switch_2 === 1) {
      onToggleCountDown2(true);
    } else {
      return '';
    }
  };

  const handleToggle1 = () => {
    if (sdk.deviceData.switch_1 === 1) {
      apiControlDeviceData({
        timer_dev: 'switch_1'
      });
      return history.push('/timing');
    } else {
      return '';
    }
  };
  const handleToggle2 = () => {
    if (sdk.deviceData.switch_2 === 1) {
      apiControlDeviceData({
        timer_dev: 'switch_2'
      });
      return history.push('/timing');
    } else {
      return '';
    }
  };

  const handlePlug1 = () => {
    if (sdk.deviceData.power_switch === 1) {
      apiControlDeviceData({
        switch_1: sdk.deviceData.switch_1 === 0 ? 1 : 0
      });
    }
  };
  const handlePlug2 = () => {
    if (sdk.deviceData.power_switch === 1) {
      apiControlDeviceData({
        switch_2: sdk.deviceData.switch_2 === 0 ? 1 : 0
      });
    }
  };

  console.log(sdk.deviceData)
  return (
    <article className={classNames('plugs')} id={'plugs'}>
      <div className="plug_info">
        <div className="plug_img">
          <img src={plugImageSrc(sdk.deviceData.switch_1)} alt="" onClick={handlePlug1} />
        </div>
        <div className="description">
          <div className="name">开关</div>
          <div className="state">
            {sdk.deviceData.switch_1 === 0 ? '已关闭' : '已开启'}
          </div>
        </div>
        <div className="plug_clock" onClick={handleToggle1}>
          <img src={clockImageSrc()} alt="" />
        </div>
        <div className="plug_count_down" onClick={handleCountdown1}>
          <img src={countdownImageSrc()} alt="" />
        </div>
      </div>
      <div className="plug_info">
        <div className="plug_img">
          <img src={plugImageSrc(sdk.deviceData.switch_2)} alt="" onClick={handlePlug2} />
        </div>
        <div id={'description'} className="description">
          <div className="name">开关</div>
          <div className="state">
            {sdk.deviceData.switch_2 === 0 ? '已关闭' : '已开启'}
          </div>
        </div>
        <div className="plug_clock" onClick={handleToggle2}>
          <img src={clockImageSrc()} alt="" />
        </div>
        <div className="plug_count_down" onClick={handleCountdown2}>
          <img src={countdownImageSrc()} alt="" />
        </div>
      </div>
      <TimePicker
        showSemicolon={false}
        value={handleCountdownVal1()}
        showUnit={true}
        showTime={false}
        showTwoDigit={false}
        theme={themeType}
        title="倒计时关闭"
        onCancel={onToggleCountDown1.bind(null, false)}
        onConfirm={(value: any) => {
          const hour: number = Number(value[0].split('时')[0]);
          const mins: number = Number(value[1].split('分')[0]);
          const num = hour * 3600 + mins * 60;
          onControlDevice('count_down_1', num);
        }}
        visible={countDownVisible1}
      />
      <TimePicker
        showSemicolon={false}
        value={handleCountdownVal2()}
        showUnit={true}
        showTime={false}
        showTwoDigit={false}
        theme={themeType}
        title="倒计时关闭"
        onCancel={onToggleCountDown2.bind(null, false)}
        onConfirm={(value: any) => {
          const hour: number = Number(value[0].split('时')[0]);
          const mins: number = Number(value[1].split('分')[0]);
          const num = hour * 3600 + mins * 60;
          onControlDevice('count_down_2', num);
        }}
        visible={countDownVisible2}
      />
    </article>
  );
};

export default plugs;
