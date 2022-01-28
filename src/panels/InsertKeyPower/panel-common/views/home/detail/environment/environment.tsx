import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { ListPicker, Option } from '@components/business';
import './environment.less';

import TimeImage from '../../../icons/normal/time.svg';
import TimeImageBlueWhite from '../../../icons/blue-white/time.svg';
import TimeImageDark from '../../../icons/dark/time.svg';
import TimeImageColorful from '../../../icons/colorful/time.svg';
import TimeImageMorandi from '../../../icons/morandi/time.svg';

import CardImage from '../../../icons/normal/card.svg';
import CardImageBlueWhite from '../../../icons/blue-white/card.svg';
import CardImageDark from '../../../icons/dark/card.svg';
import CardImageColorful from '../../../icons/colorful/card.svg';
import CardImageMorandi from '../../../icons/morandi/card.svg';

const Environment = () => {
  const themeType = getThemeType();
  const timeImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return TimeImage;
      case 'blueWhite':
        return TimeImageBlueWhite;
      case 'dark':
        return TimeImageDark;
      case 'colorful':
        return TimeImageColorful;
      case 'morandi':
        return TimeImageMorandi;
      default:
        return TimeImage;
    }
  };
  const cardImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return CardImage;
      case 'blueWhite':
        return CardImageBlueWhite;
      case 'dark':
        return CardImageDark;
      case 'colorful':
        return CardImageColorful;
      case 'morandi':
        return CardImageMorandi;
      default:
        return CardImage;
    }
  };
  const [timerCutVisible, onToggleTimerCut] = useState(false);
  const recordList: Option[] = [];
  for (let i = 0; i < 180; i++) {
    recordList.push({
      label: i + '秒',
      value: i,
      disabled: false
    });
  }
  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <div
          className={classNames('time')}
          onClick={() => {
            if (sdk.deviceData.switch === 1) {
              onToggleTimerCut(true);
            }
          }}
        >
          <img src={timeImageSrc()}></img>
          <div className="value">
            {sdk.deviceData.timer_cut ? sdk.deviceData.timer_cut + 's' : '-'}
          </div>
          <div className="label">断电延时</div>
          <ListPicker
            visible={timerCutVisible}
            title="断电延时(s)"
            defaultValue={[sdk.deviceData.timer_cut ? sdk.deviceData.timer_cut : '']}
            options={recordList}
            onCancel={() => onToggleTimerCut(false)}
            onConfirm={value => {
              onControlDevice('timer_cut', value[0]);
              onToggleTimerCut(false);
            }}
          />
        </div>
        <div className={classNames('card')}>
          <img src={cardImageSrc()}></img>
          <div className="value">
            {sdk.deviceData.card_status_report === '1' ? '已插卡' : '已取卡'}
          </div>
          <div className="label">卡状态</div>
        </div>
      </div>
    </article>
  );
};

export default Environment;
