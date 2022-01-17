import React from 'react';
import './home_normal.less';
import Curtain_background from './curtain-background/curtain_background';
import Curtain_button from './curtain-button/curtain_button';
import Curtain_options from './curtain-options/curtain_options';

export function HomeNormal() {
  return (
    <article>
      <Curtain_background/>
      <Curtain_button/>
      <Curtain_options/>
    </article>
  );
}

export default HomeNormal;
