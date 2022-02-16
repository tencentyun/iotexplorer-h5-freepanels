import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {getThemeType} from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { Battery, Bluetooth } from '@components/business';
import { useUserInfo } from '@hooks/useUserInfo';
import { useHistory } from 'react-router';
import PirVisible from './measureResult/measureResult';
import './home.less';

import HeadImage from '../icons/normal/head.svg';
import HeadImageBlueWhite from '../icons/normal/head-white.svg';
import HeadImageDark from '../icons/dark/head.svg';
import HeadImageColorful from '../icons/colorful/head.svg';
import HeadImageMorandi from '../icons/morandi/head.svg';

import SettingImage from '../icons/normal/setting.svg';
import SettingImageBlueWhite from '../icons/blue-white/setting.svg';
import SettingImageDark from '../icons/blue-white/setting.svg';
import SettingImageColorful from '../icons/colorful/setting.svg';
import SettingImageMorandi from '../icons/morandi/setting.svg';

import HighImage from '../icons/normal/hight-pressure.svg';
import LowImage from '../icons/normal/low-pressure.svg';
import PulseImage from '../icons/normal/pulse.svg';

export function Home() {
  const themeType = getThemeType();
  const headImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return HeadImage;
      case 'blueWhite':
        return HeadImageBlueWhite;
      case 'dark':
        return HeadImageDark;
      case 'colorful':
        return HeadImageColorful;
      case 'morandi':
        return HeadImageMorandi;
      default:
        return HeadImage;
    }
  };
  const settingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SettingImage;
      case 'blueWhite':
        return SettingImageBlueWhite;
      case 'dark':
        return SettingImageDark;
      case 'colorful':
        return SettingImageColorful;
      case 'morandi':
        return SettingImageMorandi;
      default:
        return SettingImage;
    }
  };
  const BatteryColor = () => {
    switch (themeType) {
      case 'blueWhite':
        return 'white';
      case 'dark':
        return 'white';
      case 'colorful':
        return 'green';
      case 'morandi':
        return 'brown';
      default:
        return '';
    }
  };
  const [isShowMeasureResult, setIsShowMeasureResult] = useState(false);
  // 从 sdk 读取到的物模型 maps
  const [userInfo] = useUserInfo();
  const history = useHistory();
  const handleMyInfo = () => {
    // 个人信息
    return history.push('/myInfo');
  };
  const handleRecord = () => {
    // 个人信息
    return history.push('/record');
  };
  useEffect(() => {
    const toggle_test_value = () => {
      const val = sdk.deviceData.systolic_pressure
        ? (sdk.deviceData.systolic_pressure + sdk.deviceData.disatolic_pressure) / 2 : 110;

      const el = document.getElementById('num-wrap');
      const h = el?.clientHeight;

      const diff = ((MAX_TICK_VAL - val) * h) / (MAX_TICK_VAL - MIN_TICK_VAL + 10);
      el.style.marginTop =
        document.getElementById('num')?.clientHeight / 2 - diff + 'px';
      //$("#num-wrap").animate({marginTop: (document.getElementById("num")?.clientHeight/2-diff)+"px"});
    };
    toggle_test_value();
  }, []);
  const MIN_TICK_VAL = 5;
  const MAX_TICK_VAL = 205;
  const lineArray = () => {
    let lines = [];
    for(let i=MAX_TICK_VAL;i>=MIN_TICK_VAL;i-=10){
      if(i==85||i==135){
        lines.push({id:i,name:'num-tick2',val:i});
      }else{
        lines.push({id:i,name:'num-tick1',val:''});
      }
    }

    return lines;
  }

  const renderLine = (item: any) => {
    if (item.val == '') {
      return (
        <div className="num-tick-wrap">
          <div className={item.name}></div>
        </div>
      );
    } else {
      return (
        <div className="num-tick-wrap">
          <div className={item.name}></div>
          <p>{item.val}</p>
        </div>
      );
    }
  }
  const handleSwitch = () => {
    onControlDevice('power_switch', 1);
  };
  const handleSetting = () => {
    sdk.goDeviceDetailPage({});
  };
  return (
    <article className={classNames('home')}>
      {/*仪表盘*/}
      <section className={classNames('dashboard')}>
        <div className={classNames('dashboard-info')}>
          <div className="dev-info">
            {/* 蓝牙模块 */}
            <Bluetooth />
            {/* 电源模块 */}
            <Battery
              isShowPercent={false}
              isShowTip={false}
              value={
                sdk.deviceData.battery_percent_age
                  ? sdk.deviceData.battery_percent_age
                  : 50
              }
              color={BatteryColor()}
            />
            <div className="setting" >
              设备 <img src={settingImageSrc()} alt="" onClick={handleSetting}/>
            </div>
          </div>
          <div className="my-head" onClick={handleMyInfo}>
            <img src={headImageSrc()} alt="昵称" />
            {userInfo.nickName || '编辑昵称'}
          </div>
          <div className="my-info">
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
                <img src={HighImage} alt="" />
                <img src={LowImage} alt="" />
                <img src={PulseImage} alt="" />
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
            <div id="num" className="num">
              <div id="num-wrap" className="num-wrap">
                {lineArray().map(renderLine)}
              </div>
            </div>
          </div>
          <div className="dev-btn">
            <div onClick={() => setIsShowMeasureResult(true)}>测量结果</div>
            <div onClick={handleRecord}>测量记录</div>
          </div>
          <PirVisible
            isShow={isShowMeasureResult}
            onClose={() => {
              setIsShowMeasureResult(false);
            }}
          />
        </div>
      </section>
      <div className="measure-btn" onClick={handleSwitch}>开始测量</div>
    </article>
  );
}
