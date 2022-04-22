import React from 'react';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import HomeMorandi from './home-morandi/home_morandi';
import HomeNormal from './home-normal/home_normal';
import HomeDark from './home-dark/home_dark';
import HomeColorful from './home-colorful/home_colorful';
import HomeBlueWhite from './home-bluewhite/home_bluewhite';
import './home.less';

export function Home() {
  const themeType = getThemeType();
  const getHomePage = () => {
    if (themeType == 'blueWhite') {
      return (<HomeBlueWhite/>);
    } if (themeType == 'colorful') {
      return (<HomeColorful/>);
    } if (themeType == 'dark') {
      return (<HomeDark/>);
    } if (themeType == 'morandi') {
      return (<HomeMorandi/>);
    } if (themeType == 'normal') {
      return (<HomeNormal/>);
    }
  };

  return (
    <article className={classNames('home')}>
      {getHomePage()}
    </article>
  );
}

export default Home;
