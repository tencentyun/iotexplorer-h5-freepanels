import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Battery } from '@components/business';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { Detail } from './detail/detail';
import './home.less';

import armingImage from '../icons/normal/arming.png';
import armingImageBlueWhite from '../icons/blue-white/arming.svg';
const armingImageDark =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/multifunction-alarm-host/dark/arming.png';
import armingImageColorful from '../icons/colorful/arming.svg';
import armingImageMorandi from '../icons/morandi/arming.svg';

import disarmingImage from '../icons/normal/disarming.png';
import disarmingImageBlueWhite from '../icons/blue-white/disarming.svg';
const disarmingImageDark =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/multifunction-alarm-host/dark/disarming.png';
import disarmingImageColorful from '../icons/colorful/disarming.svg';
import disarmingImageMorandi from '../icons/morandi/disarming.svg';

import homeImage from '../icons/normal/home.svg';
import homeImageBlueWhite from '../icons/blue-white/home.svg';
const homeImageDark =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/multifunction-alarm-host/dark/home.png';
import homeImageColorful from '../icons/colorful/home.svg';
import homeImageMorandi from '../icons/morandi/home.svg';

import instancyImage from '../icons/normal/instancy.svg';
import instancyImageBlueWhite from '../icons/blue-white/instancy.svg';
const instancyImageDark =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/multifunction-alarm-host/dark/instancy.png';
import instancyImageColorful from '../icons/colorful/instancy.svg';
import instancyImageMorandi from '../icons/morandi/instancy.svg';

import relaxImage from '../icons/normal/relax.svg';
import relaxImageBlueWhite from '../icons/blue-white/relax.svg';
const relaxImageDark =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/multifunction-alarm-host/dark/relax.png';
import relaxImageColorful from '../icons/colorful/relax.svg';
import relaxImageMorandi from '../icons/morandi/relax.svg';

import workImage from '../icons/normal/work.svg';
import workImageBlueWhite from '../icons/blue-white/work.svg';
const workImageDark =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/multifunction-alarm-host/dark/work.png';
import workImageColorful from '../icons/colorful/work.svg';
import workImageMorandi from '../icons/morandi/work.svg';

import ArmingImageOpen from '../icons/normal/arming-open.png';
import ArmingImageOpenBlueWhite from '../icons/blue-white/arming-open.svg';
import ArmingImageOpenDark from '../icons/dark/arming-open.svg';
import ArmingImageOpenColorful from '../icons/colorful/arming-open.svg';
import ArmingImageOpenMorandi from '../icons/morandi/arming-open.svg';
import ArmingImageClose from '../icons/normal/arming-close.svg';
import ArmingImageCloseBlueWhite from '../icons/blue-white/arming-close.svg';

import DisarmingImageOpen from '../icons/normal/disarming-open.svg';
import DisarmingImageOpenBlueWhite from '../icons/blue-white/disarming-open.svg';
import DisarmingImageOpenDark from '../icons/dark/disarming-open.svg';
import DisarmingImageOpenColorful from '../icons/colorful/disarming-open.svg';
import DisarmingImageOpenMorandi from '../icons/morandi/disarming-open.svg';
import DisarmingImageClose from '../icons/normal/disarming-close.svg';
import DisarmingImageCloseBlueWhite from '../icons/blue-white/disarming-close.svg';

import HomeImageOpen from '../icons/normal/home-open.png';
import HomeImageOpenBlueWhite from '../icons/blue-white/home-open.svg';
import HomeImageOpenDark from '../icons/dark/home-open.svg';
import HomeImageOpenColorful from '../icons/colorful/home-open.svg';
import HomeImageOpenMorandi from '../icons/morandi/home-open.svg';
import HomeImageClose from '../icons/normal/home-close.svg';
import HomeImageCloseBlueWhite from '../icons/blue-white/home-close.svg';

import InstancyImageOpen from '../icons/normal/instancy-open.png';
import InstancyImageOpenBlueWhite from '../icons/blue-white/instancy-open.svg';
import InstancyImageOpenDark from '../icons/dark/instancy-open.svg';
import InstancyImageOpenColorful from '../icons/colorful/instancy-open.svg';
import InstancyImageOpenMorandi from '../icons/morandi/instancy-open.svg';
import InstancyImageClose from '../icons/normal/instancy-close.svg';
import InstancyImageCloseBlueWhite from '../icons/blue-white/instancy-close.svg';

import RelaxImageOpen from '../icons/normal/relax-open.png';
import RelaxImageOpenBlueWhite from '../icons/blue-white/relax-open.svg';
import RelaxImageOpenDark from '../icons/dark/relax-open.svg';
import RelaxImageOpenColorful from '../icons/colorful/relax-open.svg';
import RelaxImageOpenMorandi from '../icons/morandi/relax-open.svg';
import RelaxImageClose from '../icons/normal/relax-close.svg';
import RelaxImageCloseBlueWhite from '../icons/blue-white/relax-close.svg';

import WorkImageOpen from '../icons/normal/work-open.png';
import WorkImageOpenBlueWhite from '../icons/blue-white/work-open.svg';
import WorkImageOpenDark from '../icons/dark/work-open.svg';
import WorkImageOpenColorful from '../icons/colorful/work-open.svg';
import WorkImageOpenMorandi from '../icons/morandi/work-open.svg';
import WorkImageClose from '../icons/normal/work-close.svg';
import WorkImageCloseBlueWhite from '../icons/blue-white/work-close.svg';

export function Home() {
  const themeType = getThemeType();
  const armingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.woke_mode === 'arm' ? ArmingImageOpen : ArmingImageClose;
      case 'blueWhite':
        return sdk.deviceData.woke_mode === 'arm' ? ArmingImageOpenBlueWhite : ArmingImageCloseBlueWhite;
      case 'dark':
        return sdk.deviceData.woke_mode === 'arm' ? ArmingImageOpenDark : ArmingImageClose;
      case 'colorful':
        return sdk.deviceData.woke_mode === 'arm' ? ArmingImageOpenColorful : ArmingImageClose;
      case 'morandi':
        return sdk.deviceData.woke_mode === 'arm' ? ArmingImageOpenMorandi : ArmingImageClose;
      default:
        return sdk.deviceData.woke_mode === 'arm' ? ArmingImageOpen : ArmingImageClose;
    }
  };
  const disarmingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.woke_mode === 'disarmed' ? DisarmingImageOpen : DisarmingImageClose;
      case 'blueWhite':
        return sdk.deviceData.woke_mode === 'disarmed' ? DisarmingImageOpenBlueWhite : DisarmingImageCloseBlueWhite;
      case 'dark':
        return sdk.deviceData.woke_mode === 'disarmed' ? DisarmingImageOpenDark : DisarmingImageClose;
      case 'colorful':
        return sdk.deviceData.woke_mode === 'disarmed' ? DisarmingImageOpenColorful : DisarmingImageClose;
      case 'morandi':
        return sdk.deviceData.woke_mode === 'disarmed' ? DisarmingImageOpenMorandi : DisarmingImageClose;
      default:
        return sdk.deviceData.woke_mode === 'disarmed' ? DisarmingImageOpen : DisarmingImageClose;
    }
  };
  const homeImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.woke_mode === 'home' ? HomeImageOpen : HomeImageClose;
      case 'blueWhite':
        return sdk.deviceData.woke_mode === 'home' ? HomeImageOpenBlueWhite : HomeImageCloseBlueWhite;
      case 'dark':
        return sdk.deviceData.woke_mode === 'home' ? HomeImageOpenDark : HomeImageClose;
      case 'colorful':
        return sdk.deviceData.woke_mode === 'home' ? HomeImageOpenColorful : HomeImageClose;
      case 'morandi':
        return sdk.deviceData.woke_mode === 'home' ? HomeImageOpenMorandi : HomeImageClose;
      default:
        return sdk.deviceData.woke_mode === 'home' ? HomeImageOpen : HomeImageClose;
    }
  };
  const instancyImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.woke_mode === 'sos' ? InstancyImageOpen : InstancyImageClose;
      case 'blueWhite':
        return sdk.deviceData.woke_mode === 'sos' ? InstancyImageOpenBlueWhite : InstancyImageCloseBlueWhite;
      case 'dark':
        return sdk.deviceData.woke_mode === 'sos' ? InstancyImageOpenDark : InstancyImageClose;
      case 'colorful':
        return sdk.deviceData.woke_mode === 'sos' ? InstancyImageOpenColorful : InstancyImageClose;
      case 'morandi':
        return sdk.deviceData.woke_mode === 'sos' ? InstancyImageOpenMorandi : InstancyImageClose;
      default:
        return sdk.deviceData.woke_mode === 'sos' ? InstancyImageOpen : InstancyImageClose;
    }
  };
  const workImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.woke_mode === 'work' ? WorkImageOpen : WorkImageClose;
      case 'blueWhite':
        return sdk.deviceData.woke_mode === 'work' ? WorkImageOpenBlueWhite : WorkImageCloseBlueWhite;
      case 'dark':
        return sdk.deviceData.woke_mode === 'work' ? WorkImageOpenDark : WorkImageClose;
      case 'colorful':
        return sdk.deviceData.woke_mode === 'work' ? WorkImageOpenColorful : WorkImageClose;
      case 'morandi':
        return sdk.deviceData.woke_mode === 'work' ? WorkImageOpenMorandi : WorkImageClose;
      default:
        return sdk.deviceData.woke_mode === 'work' ? WorkImageOpen : WorkImageClose;
    }
  };
  const relaxImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.woke_mode === 'play' ? RelaxImageOpen : RelaxImageClose;
      case 'blueWhite':
        return sdk.deviceData.woke_mode === 'play' ? RelaxImageOpenBlueWhite : RelaxImageCloseBlueWhite;
      case 'dark':
        return sdk.deviceData.woke_mode === 'play' ? RelaxImageOpenDark : RelaxImageClose;
      case 'colorful':
        return sdk.deviceData.woke_mode === 'play' ? RelaxImageOpenColorful : RelaxImageClose;
      case 'morandi':
        return sdk.deviceData.woke_mode === 'play' ? RelaxImageOpenMorandi : RelaxImageClose;
      default:
        return sdk.deviceData.woke_mode === 'play' ? RelaxImageOpen : RelaxImageClose;
    }
  };
  const workModeThemeTypeSrc = () => {
    const workMode = sdk.deviceData.woke_mode;
    switch (themeType) {
      case 'normal':
        switch (workMode) {
          case 'arm':
            return armingImage;
          case 'disarmed':
            return disarmingImage;
          case 'home':
            return homeImage;
          case 'sos':
            return instancyImage;
          case 'work':
            return workImage;
          case 'play':
            return relaxImage;
          default:
            return armingImage;
        }
      case 'blueWhite':
        switch (workMode) {
          case 'arm':
            return armingImageBlueWhite;
          case 'disarmed':
            return disarmingImageBlueWhite;
          case 'home':
            return homeImageBlueWhite;
          case 'sos':
            return instancyImageBlueWhite;
          case 'work':
            return workImageBlueWhite;
          case 'play':
            return relaxImageBlueWhite;
          default:
            return armingImageBlueWhite;
        }
      case 'dark':
        switch (workMode) {
          case 'arm':
            return armingImageDark;
          case 'disarmed':
            return disarmingImageDark;
          case 'home':
            return homeImageDark;
          case 'sos':
            return instancyImageDark;
          case 'work':
            return workImageDark;
          case 'play':
            return relaxImageDark;
          default:
            return armingImageDark;
        }
      case 'colorful':
        switch (workMode) {
          case 'arm':
            return armingImageColorful;
          case 'disarmed':
            return disarmingImageColorful;
          case 'home':
            return homeImageColorful;
          case 'sos':
            return instancyImageColorful;
          case 'work':
            return workImageColorful;
          case 'play':
            return relaxImageColorful;
          default:
            return armingImageColorful;
        }
      case 'morandi':
        switch (workMode) {
          case 'arm':
            return armingImageMorandi;
          case 'disarmed':
            return disarmingImageMorandi;
          case 'home':
            return homeImageMorandi;
          case 'sos':
            return instancyImageMorandi;
          case 'work':
            return workImageMorandi;
          case 'play':
            return relaxImageMorandi;
          default:
            return armingImageMorandi;
        }
      default:
        switch (workMode) {
          case 'arm':
            return armingImage;
          case 'disarmed':
            return disarmingImage;
          case 'home':
            return homeImage;
          case 'sos':
            return instancyImage;
          case 'work':
            return workImage;
          case 'play':
            return relaxImage;
          default:
            return armingImage;
        }
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
        return 'white';
      default:
        return '';
    }
  };
  const handleMode = (type: string) => {
    onControlDevice('woke_mode', type);
  };
  return (
    <article className={classNames('home')}>
      {/*仪表盘*/}
      <section className={classNames('dashboard')}>
        <div className="control-panel">
          <div className="panel-head">
            {/*电量*/}
            <Battery
              isShowPercent={false}
              isShowTip={false}
              color={BatteryColor()}
              value={
                sdk.deviceData.battery_percentage
                  ? sdk.deviceData.battery_percentage
                  : '50'
              }
            />
            <img src={workModeThemeTypeSrc()} alt="" />
          </div>
          <div className={classNames('alarm-tools-bar', 'border-bottom')}>
            <button onClick={() => handleMode('disarmed')}>
              <img src={disarmingImageSrc()} alt="" />
              <div
                className={classNames(
                  'label',
                  sdk.deviceData.woke_mode === 'disarmed' ? 'active' : ''
                )}
              >
                撤防
              </div>
            </button>
            |
            <button onClick={() => handleMode('arm')}>
              <img src={armingImageSrc()} alt="" />
              <div
                className={classNames(
                  'label',
                  sdk.deviceData.woke_mode === 'arm' ? 'active' : ''
                )}
              >
                布防
              </div>
            </button>
            |
            <button onClick={() => handleMode('home')}>
              <img src={homeImageSrc()} alt="" />
              <div
                className={classNames(
                  'label',
                  sdk.deviceData.woke_mode === 'home' ? 'active' : ''
                )}
              >
                在家
              </div>
            </button>
          </div>
          <div className="alarm-tools-bar">
            <button onClick={() => handleMode('sos')}>
              <img src={instancyImageSrc()} alt="" />
              <div
                className={classNames(
                  'label',
                  sdk.deviceData.woke_mode === 'sos' ? 'active' : ''
                )}
              >
                紧急
              </div>
            </button>
            |
            <button onClick={() => handleMode('work')}>
              <img src={workImageSrc()} alt="" />
              <div
                className={classNames(
                  'label',
                  sdk.deviceData.woke_mode === 'work' ? 'active' : ''
                )}
              >
                工作
              </div>
            </button>
            |
            <button onClick={() => handleMode('play')}>
              <img src={relaxImageSrc()} alt="" />
              <div
                className={classNames(
                  'label',
                  sdk.deviceData.woke_mode === 'play' ? 'active' : ''
                )}
              >
                休闲
              </div>
            </button>
          </div>
        </div>
      </section>
      {/*详情区域*/}
      <Detail />
    </article>
  );
}
