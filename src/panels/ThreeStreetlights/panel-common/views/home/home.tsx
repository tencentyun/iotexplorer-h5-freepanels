import React from 'react';
import classNames from 'classnames';
import './home.less';
import {Position} from './position/position';
import {Detail} from './detail/detail';
import Ticker from './tiker/ticker';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {LightBright} from '@components/business/light-bright/light-bright';
import { getThemeType } from '@libs/theme';
import { onControlDevice} from '@hooks/useDeviceData';

export function Home() {
  const themeType = getThemeType();
  const changeBrightness = (val, endTouch) => {
    if (endTouch) {
      onControlDevice('brightness', val);
    }
  };
  const getHomePage = () => {
    if (themeType == 'colorful') {
      return (
        <article>
          <Ticker/>
          <article className={classNames('lightbright')}>
            <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80}
                         onChange={changeBrightness}/>
          </article>
          <Position/>

          <Detail/>
        </article>
      );
    } else {
      return (
        <article>
          <div className='morandi_background'>
            <Ticker/>
            <Position/>
          </div>
          <div className='normal_background'>
            <article className={classNames('lightbright')}>
              <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80} onChange={changeBrightness}/>
            </article>
            <Detail/>
          </div>
        </article>
      );
    }
  };
  return (
    <article
      id={'home'}
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off'
      )}
    >
      {getHomePage()}
    </article>
  );
}
