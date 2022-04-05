import React from 'react';
import classNames from 'classnames';
import './home.less';
import { getThemeType } from '@libs/theme';
import Heater_Normal from './water-heater-normal/water_heater_normal';
import Heater_blueWhite from './water-heater-blueWhite/water_heater_blueWhite';
import Heater_Dark from './water-heater-dark/water_heater_dark';
import Heater_Colorful from './water-heater-colorful/water_heater_colorful';
import Heater_Morandi from './water-heater-morandi/water_heater_morandi';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Home() {
  const themeType = getThemeType();
  const getHomePage = () => {
    if (themeType == 'blueWhite') {
      return (<Heater_blueWhite/>);
    } if (themeType == 'colorful') {
      return (<Heater_Colorful/>);
    } if (themeType == 'dark') {
      return (<Heater_Dark/>);
    } if (themeType == 'morandi') {
      return (<Heater_Morandi/>);
    } if (themeType == 'normal') {
      return (<Heater_Normal/>);
    }
  };
  return (
    <article
      id={'home'}
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 1 ? '' : 'power-off',
      )}
    >
      {getHomePage()}
    </article>
  );
}

export default Home;
