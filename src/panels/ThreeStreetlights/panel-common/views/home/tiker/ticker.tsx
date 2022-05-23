import React, { useEffect, useState } from 'react';
import './ticker.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { LampLargeSvg } from '@components/common/lampsvg/lamplarge';
import { rgb } from 'd3';

const handleSelectColor = (mode: string) => {
  onControlDevice('work_mode', mode);
};
import SettingImage from '../../icons/normal/dev-open.svg';
import SettingImageBlueWhite from '../../icons/normal/dev-open.svg';
import SettingImageDark from '../../icons/normal/dev-open.svg';
import SettingImageColorful from '../../icons/normal/dev-open.svg';
import SettingImageMorandi from '../../icons/normal/dev-open.svg';
const Ticker = () => {
  const themeType = getThemeType();
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
  const handleSetting = () => {
    sdk.goDeviceDetailPage({});
  };
  function hsvToRgb(arr) {
    const h = arr[0]; let s = arr[1]; let v = arr[2];
    s = s / 100;
    v = v / 100;
    let r = 0; let g = 0; let b = 0;
    const i = parseInt((h / 60) % 6);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
      default:
        break;
    }
    r = parseInt(r * 255.0);
    g = parseInt(g * 255.0);
    b = parseInt(b * 255.0);
    return rgb(r, g, b);
  }

  const [brightness, setBrightness] = useState(sdk.deviceData.brightness ? sdk.deviceData.brightness : 80);
  const [colorValue, setColorValue] = useState(sdk.deviceData.color_value ? sdk.deviceData.color_value : [86, 32, 92]);

  const rgbcolor = colorValue ? hsvToRgb(colorValue) : '#f00';
  // console.log(rgbcolor)
  useEffect(() => {
    setBrightness(sdk.deviceData.brightness);
  }, [sdk.deviceData.brightness]);

  useEffect(() => {
    setColorValue(sdk.deviceData.color_value);
  }, [sdk.deviceData.color_value]);

  if (themeType == 'colorful') {
    return (
      <article id={'ticker'} className={classNames('ticker_top_colorful')}>
        <div
          className={classNames(
            'devSetting', 'dev-setting-open'
          )}
        >
          <img src={settingImageSrc()} alt="" onClick={handleSetting}/>
        </div>
        <div className='ticker_top_bottom'>
            <span
              id={'colored_button'}
              className={classNames(
                'colored_bottom_colorful',
                sdk.deviceData.work_mode != '1' ? 'color_mode_selected' : '',
              )}
              onClick={() => {
                handleSelectColor('0');
              }}
            >
              <span className={classNames('colored_font')}>彩光</span>
            </span>

          <span
            id={'white_bottom'}
            className={classNames(
              'white_bottom_colorful',
              sdk.deviceData.work_mode === '1' ? 'color_mode_selected' : '',
            )}
            onClick={() => {
              handleSelectColor('1');
            }}
          >
              <span className={classNames('colored_font')}>白光</span>
            </span>
        </div>
        <div className='lamp'>
          {/* <SvgIcon name={sdk.deviceData.work_mode != 1 && 'icon-lamp-bulb-'+themeType || 'icon-lamp-bulb-'+themeType+'2'} width={400} height={800} /> */}
          <LampLargeSvg color={rgbcolor} opacity={brightness / 100}></LampLargeSvg>
        </div>
      </article>
    );
  }
  return (
      <article id={'ticker'} className={classNames('ticker')}>
        <div
          className={classNames(
            'devSetting', 'dev-setting-open'
          )}
        >
          <img src={settingImageSrc()} alt="" onClick={handleSetting}/>
        </div>
        <span
            id={'colored_button'}
            className={classNames(
              'colored_bottom',
              sdk.deviceData.work_mode != '1' ? 'color_mode_selected' : '',
            )}
            onClick={() => {
              handleSelectColor('0');
            }}
          >
            <span className={classNames('colored_font')}>彩光</span>
          </span>

        <div className='lamp'>
          {/* <SvgIcon name={sdk.deviceData.work_mode != 1 && 'icon-lamp-bulb-'+themeType || 'icon-lamp-bulb-'+themeType+'2'} width={400} height={800} /> */}
          <LampLargeSvg color={rgbcolor} opacity={brightness / 100}></LampLargeSvg>
        </div>

        <span
          id={'white_bottom'}
          className={classNames(
            'white_bottom',
            sdk.deviceData.work_mode === '1' ? 'color_mode_selected' : '',
          )}
          onClick={() => {
            handleSelectColor('1');
          }}
        >
            <span className={classNames('colored_font')}>白光</span>
          </span>
      </article>
  );
};

export default Ticker;
