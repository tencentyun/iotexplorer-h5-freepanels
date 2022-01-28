import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {getThemeType} from '@libs/theme';
import {Position} from './position/position';
import {Detail} from './detail/detail';
import Ticker from './tiker/ticker';
import './home.less';

export function Home() {
  const themeType = getThemeType();

  const getHomePage = () => {
    if (themeType == 'normal' || themeType == 'colorful') {
      return (
        <article
          id={'home'}
          className={classNames(
            'home',
            sdk.deviceData.power_switch != 1 && 'power-off'
          )}
        >
          <Ticker/>
          <Position defaultValue={300}/>
          <Detail/>
        </article>
      );
    } else {
      return (
        <article
          id={'home'}
          className={classNames(
            'home',
            sdk.deviceData.power_switch != 1 && 'power-off'
          )}
        >
          <Position/>
          <Detail/>
          <Ticker/>

        </article>
      );
    }
  }
  return (
    getHomePage()
  );
}
