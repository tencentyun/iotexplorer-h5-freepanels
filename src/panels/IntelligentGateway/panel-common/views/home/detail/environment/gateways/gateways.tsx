import React from 'react';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import './gateways.less';

import SwitchImage from '../../../../icons/normal/switch.svg';
import SwitchImageBlueWhite from '../../../../icons/blue-white/switch.svg';
import SwitchImageDark from '../../../../icons/dark/switch.svg';
import SwitchImageColorful from '../../../../icons/colorful/switch.svg';
import SwitchImageMorandi from '../../../../icons/morandi/switch.svg';

const Environment = () => {
  const themeType = getThemeType();
  const switchImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return SwitchImage;
      case 'blueWhite':
        return SwitchImageBlueWhite;
      case 'dark':
        return SwitchImageDark;
      case 'colorful':
        return SwitchImageColorful;
      case 'morandi':
        return SwitchImageMorandi;
      default:
        return SwitchImage;
    }
  };

  return (
    <article className={classNames('gateways')}>
      <div className="gateway_info">
        <img src={switchImageSrc()} alt="" />
        <div className="description">
          <div className="name">六位场景开关</div>
          <div className="state">离线</div>
        </div>
      </div>
      <div className="gateway_info">
        <img src={switchImageSrc()} alt="" />
        <div className="description">
          <div className="name">六位场景开关</div>
          <div className="state">离线</div>
        </div>
      </div>
    </article>
  );
};

export default Environment;
