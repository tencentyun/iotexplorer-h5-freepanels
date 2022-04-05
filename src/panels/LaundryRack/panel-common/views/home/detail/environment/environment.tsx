import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import './environment.less';
import { getThemeType } from '@libs/theme';
import { apiControlDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { numberToArray } from '@libs/utillib';
import { ValuePicker } from '@components/business';

import LightImage from '../../../icons/normal/light-open.svg';
import LightImageDefault from '../../../icons/normal/light-close.svg';
import LightImageBlueWhite from '../../../icons/blue-white/light-open.svg';
import LightImageBlueWhiteDefault from '../../../icons/blue-white/light-close.svg';
import LightImageDark from '../../../icons/dark/light-open.svg';
import LightImageDarkDefault from '../../../icons/dark/light-close.svg';
import LightImageColorful from '../../../icons/colorful/light-open.svg';
import LightImageColorfulDefault from '../../../icons/colorful/light-close.svg';
import LightImageMorandi from '../../../icons/morandi/light-open.svg';
import LightImageMorandiDefault from '../../../icons/morandi/light-close.svg';

import SterilizeImage from '../../../icons/normal/sterilize-open.svg';
import SterilizeImageDefault from '../../../icons/normal/sterilize-close.svg';
import SterilizeImageBlueWhite from '../../../icons/blue-white/sterilize-open.svg';
import SterilizeImageBlueWhiteDefault from '../../../icons/blue-white/sterilize-close.svg';
import SterilizeImageDark from '../../../icons/dark/sterilize-open.svg';
import SterilizeImageDarkDefault from '../../../icons/dark/sterilize-close.svg';
import SterilizeImageColorful from '../../../icons/colorful/sterilize-open.svg';
import SterilizeImageColorfulDefault from '../../../icons/colorful/sterilize-close.svg';
import SterilizeImageMorandi from '../../../icons/morandi/sterilize-open.svg';
import SterilizeImageMorandiDefault from '../../../icons/morandi/sterilize-close.svg';

import SeasonImage from '../../../icons/normal/season-open.svg';
import SeasonImageDefault from '../../../icons/normal/season-close.svg';
import SeasonImageBlueWhite from '../../../icons/blue-white/season-open.svg';
import SeasonImageBlueWhiteDefault from '../../../icons/blue-white/season-close.svg';
import SeasonImageDark from '../../../icons/dark/season-open.svg';
import SeasonImageDarkDefault from '../../../icons/dark/season-close.svg';
import SeasonImageColorful from '../../../icons/colorful/season-open.svg';
import SeasonImageColorfulDefault from '../../../icons/colorful/season-close.svg';
import SeasonImageMorandi from '../../../icons/morandi/season-open.svg';
import SeasonImageMorandiDefault from '../../../icons/morandi/season-close.svg';

import DryingImage from '../../../icons/normal/drying-open.svg';
import DryingImageDefault from '../../../icons/normal/drying-close.svg';
import DryingImageBlueWhite from '../../../icons/blue-white/drying-open.svg';
import DryingImageBlueWhiteDefault from '../../../icons/blue-white/drying-close.svg';
import DryingImageDark from '../../../icons/dark/drying-open.svg';
import DryingImageDarkDefault from '../../../icons/dark/drying-close.svg';
import DryingImageColorful from '../../../icons/colorful/drying-open.svg';
import DryingImageColorfulDefault from '../../../icons/colorful/drying-close.svg';
import DryingImageMorandi from '../../../icons/morandi/drying-open.svg';
import DryingImageMorandiDefault from '../../../icons/morandi/drying-close.svg';

import TimimgImage from '../../../icons/normal/timing-open.svg';
import TimimgImageDefault from '../../../icons/normal/timing-close.svg';
import TimimgImageBlueWhite from '../../../icons/blue-white/timing-open.svg';
import TimimgImageBlueWhiteDefault from '../../../icons/blue-white/timing-close.svg';
import TimimgImageDark from '../../../icons/dark/timing-open.svg';
import TimimgImageDarkDefault from '../../../icons/dark/timing-close.svg';
import TimimgImageColorful from '../../../icons/colorful/timing-open.svg';
import TimimgImageColorfulDefault from '../../../icons/colorful/timing-close.svg';
import TimimgImageMorandi from '../../../icons/morandi/timing-open.svg';
import TimimgImageMorandiDefault from '../../../icons/morandi/timing-close.svg';

const Environment = () => {
  const themeType = getThemeType();
  const lightImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.light_switch === 1
          ? LightImage
          : LightImageDefault;
      case 'blueWhite':
        return sdk.deviceData.light_switch === 1
          ? LightImageBlueWhite
          : LightImageBlueWhiteDefault;
      case 'dark':
        return sdk.deviceData.light_switch === 1
          ? LightImageDark
          : LightImageDarkDefault;
      case 'colorful':
        return sdk.deviceData.light_switch === 1
          ? LightImageColorful
          : LightImageColorfulDefault;
      case 'morandi':
        return sdk.deviceData.light_switch === 1
          ? LightImageMorandi
          : LightImageMorandiDefault;
      default:
        return sdk.deviceData.light_switch === 1
          ? LightImage
          : LightImageDefault;
    }
  };

  const sterilizeImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.disinfect_switch === 1
          ? SterilizeImage
          : SterilizeImageDefault;
      case 'blueWhite':
        return sdk.deviceData.disinfect_switch === 1
          ? SterilizeImageBlueWhite
          : SterilizeImageBlueWhiteDefault;
      case 'dark':
        return sdk.deviceData.disinfect_switch === 1
          ? SterilizeImageDark
          : SterilizeImageDarkDefault;
      case 'colorful':
        return sdk.deviceData.disinfect_switch === 1
          ? SterilizeImageColorful
          : SterilizeImageColorfulDefault;
      case 'morandi':
        return sdk.deviceData.disinfect_switch === 1
          ? SterilizeImageMorandi
          : SterilizeImageMorandiDefault;
      default:
        return sdk.deviceData.disinfect_switch === 1
          ? SterilizeImage
          : SterilizeImageDefault;
    }
  };

  const seasonImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.air_dry_switch === 1
          ? SeasonImage
          : SeasonImageDefault;
      case 'blueWhite':
        return sdk.deviceData.air_dry_switch === 1
          ? SeasonImageBlueWhite
          : SeasonImageBlueWhiteDefault;
      case 'dark':
        return sdk.deviceData.air_dry_switch === 1
          ? SeasonImageDark
          : SeasonImageDarkDefault;
      case 'colorful':
        return sdk.deviceData.air_dry_switch === 1
          ? SeasonImageColorful
          : SeasonImageColorfulDefault;
      case 'morandi':
        return sdk.deviceData.air_dry_switch === 1
          ? SeasonImageMorandi
          : SeasonImageMorandiDefault;
      default:
        return sdk.deviceData.air_dry_switch === 1
          ? SeasonImage
          : SeasonImageDefault;
    }
  };

  const dryingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.drying_switch === 1
          ? DryingImage
          : DryingImageDefault;
      case 'blueWhite':
        return sdk.deviceData.drying_switch === 1
          ? DryingImageBlueWhite
          : DryingImageBlueWhiteDefault;
      case 'dark':
        return sdk.deviceData.drying_switch === 1
          ? DryingImageDark
          : DryingImageDarkDefault;
      case 'colorful':
        return sdk.deviceData.drying_switch === 1
          ? DryingImageColorful
          : DryingImageColorfulDefault;
      case 'morandi':
        return sdk.deviceData.drying_switch === 1
          ? DryingImageMorandi
          : DryingImageMorandiDefault;
      default:
        return sdk.deviceData.drying_switch === 1
          ? DryingImage
          : DryingImageDefault;
    }
  };

  const timingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.timing === 1
          ? TimimgImage
          : TimimgImageDefault;
      case 'blueWhite':
        return sdk.deviceData.timing === 1
          ? TimimgImageBlueWhite
          : TimimgImageBlueWhiteDefault;
      case 'dark':
        return sdk.deviceData.timing === 1
          ? TimimgImageDark
          : TimimgImageDarkDefault;
      case 'colorful':
        return sdk.deviceData.timing === 1
          ? TimimgImageColorful
          : TimimgImageColorfulDefault;
      case 'morandi':
        return sdk.deviceData.timing === 1
          ? TimimgImageMorandi
          : TimimgImageMorandiDefault;
      default:
        return sdk.deviceData.timing === 1
          ? TimimgImage
          : TimimgImageDefault;
    }
  };

  const handleLight = () => {
    apiControlDeviceData({
      light_switch: sdk.deviceData.light_switch === 1 ? 0 : 1,
    });
  };
  const handleSterilize = () => {
    apiControlDeviceData({
      disinfect_switch: sdk.deviceData.disinfect_switch === 1 ? 0 : 1,
    });
  };
  const handleSeason = () => {
    apiControlDeviceData({
      air_dry_switch: sdk.deviceData.air_dry_switch === 1 ? 0 : 1,
    });
  };
  const handleDrying = () => {
    apiControlDeviceData({
      drying_switch: sdk.deviceData.drying_switch === 1 ? 0 : 1,
    });
  };
  const handleTiming = () => {
    apiControlDeviceData({
      timing: sdk.deviceData.timing === 1 ? 0 : 1,
    });
    onToggleTiming(true);
  };
  const [timingVisible, onToggleTiming] = useState(false);
  const [timingTime] = useState([]);

  const countDownColumns = () => {
    const hourCols = numberToArray(24, '时');
    const minuteCols = numberToArray(60, '分');

    return [hourCols, minuteCols];
  };
  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div id={'light'} className={classNames('btn')} onClick={handleLight}>
          <img src={lightImageSrc()} alt="" />
          <div
            className={classNames(
              'label',
              sdk.deviceData.light_switch === 1 ? 'check' : '',
            )}
          >
            灯光
          </div>
        </div>
        <div
          id={'sterilize'}
          className={classNames('btn')}
          onClick={handleSterilize}
        >
          <img src={sterilizeImageSrc()} alt="" />
          <div
            className={classNames(
              'label',
              sdk.deviceData.disinfect_switch === 1 ? 'check' : '',
            )}
          >
            消毒
          </div>
        </div>
        <div id={'season'} className={classNames('btn')} onClick={handleSeason}>
          <img src={seasonImageSrc()} alt="" />
          <div
            className={classNames(
              'label',
              sdk.deviceData.air_dry_switch === 1 ? 'check' : '',
            )}
          >
            风干
          </div>
        </div>
        <div id={'drying'} className={classNames('btn')} onClick={handleDrying}>
          <img src={dryingImageSrc()} alt="" />
          <div
            className={classNames(
              'label',
              sdk.deviceData.drying_switch === 1 ? 'check' : '',
            )}
          >
            烘干
          </div>
        </div>
        <div id={'timing'} className={classNames('btn')} onClick={handleTiming}>
          <img src={timingImageSrc()} alt="" />
          <div className="label">定时</div>
        </div>
        <ValuePicker
          title="定时关闭"
          visible={timingVisible}
          value={timingTime}
          columns={countDownColumns()}
          onCancel={() => {
            onToggleTiming(false);
          }}
          onConfirm={(value) => {
            let hour = value[0];
            let minute = value[1];
            if (hour != null) {
              hour = hour.substr(0, hour.length - 1);
            }
            if (minute != null) {
              minute = minute.substr(0, minute.length - 1);
            }
            const countDown = Number(hour) * 3600 + Number(minute) * 60;
            if (sdk.deviceData.disinfect_switch === 1) {
              apiControlDeviceData({
                set_disinfection: Number(countDown),
                disinfect_left: Number(countDown),
              });
            }
            if (sdk.deviceData.air_dry_switch === 1) {
              apiControlDeviceData({
                set_air_dry: Number(countDown),
                air_dry_left: Number(countDown),
              });
            }
            if (sdk.deviceData.drying_switch === 1) {
              apiControlDeviceData({
                set_drying: Number(countDown),
                drying_left: Number(countDown),
              });
              onControlDevice('set_drying', Number(countDown));
            }
            onToggleTiming(false);
          }}
        />
      </div>
    </article>
  );
};

export default Environment;
