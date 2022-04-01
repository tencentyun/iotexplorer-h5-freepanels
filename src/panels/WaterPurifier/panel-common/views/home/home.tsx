import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './home.less';
import { getThemeType } from '@libs/theme';
import Purifier_Colorful from './purifier-colorful/purifier_colorful';
import Purifier_BlueWhite from './purifier-blueWhite/purifier_blueWhite';
import Purifier_Dark from './purifier-dark/purifier_dark';
import Purifier_Morandi from './purifier-morandi/purifier_morandi';
import Purifier_Normal from './purifier-normal/purifier_normal';

export function Home() {
  const themeType = getThemeType();
  const getHomePage = () => {
    if (themeType === 'blueWhite') {
      return (<Purifier_BlueWhite />);
    }
    if (themeType === 'colorful') {
      return (<Purifier_Colorful />);
    }
    if (themeType === 'dark') {
      return (<Purifier_Dark />);
    }
    if (themeType === 'morandi') {
      return (<Purifier_Morandi />);
    } if (themeType === 'normal') {
      return (<Purifier_Normal />);
    }
  };
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.switch === 1 ? '' : 'power-off',
      )}
    >
      {getHomePage()}
    </article>
  );
}
export default Home;
