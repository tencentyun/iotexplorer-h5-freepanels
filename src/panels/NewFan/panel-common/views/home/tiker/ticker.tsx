import React from 'react';
import './ticker.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';

import circleSrcNormal from '../../icons/normal/circle.svg';
import circleSrcBlue from '../../icons/blue-white/circle.svg';
import circleSrcDark from '../../icons/dark/circle.svg';
import circleSrcColor from '../../icons/colorful/circle.svg';
import circleSrcMorandi from '../../icons/morandi/circle.svg';
import circleSrcWhite from '../../icons/normal/white-circle.svg';

import fleckSrcNormal from '../../icons/normal/fleck.svg';
import fleckSrcBlue from '../../icons/blue-white/fleck.svg';
import fleckSrcDark from '../../icons/dark/fleck.svg';

export interface TickerProps {
  title: string;
  text: string;
  value: string;
  text1: string;
  unit: string;
  badNum: string;
  status: string;
  // width: number;
  // maxHeight: number;
  // percent: number;
  // value: number;
  // showValue: boolean;
  // unit: string;
  // lineNum: number;
  // defaultColor: string;
  // activeColor: string;
  // textStyle: object;
  // valueStyle: object;
}
const Ticker: React.FC<TickerProps> = function (props: TickerProps) {
  const themeType = getThemeType();
  const circleSrc = () => {
    switch (themeType) {
      case 'normal':
        return value >= badNum ? circleSrcWhite : circleSrcNormal;
      case 'blueWhite':
        return value >= badNum ? circleSrcWhite : circleSrcBlue;
      case 'dark':
        return value >= badNum ? circleSrcWhite : circleSrcDark;
      case 'colorful':
        return value >= badNum ? circleSrcWhite : circleSrcColor;
      case 'morandi':
        return value >= badNum ? circleSrcWhite : circleSrcMorandi;
      default:
        return value >= badNum ? circleSrcWhite : circleSrcNormal;
    }
  };
  const fleckSrc = () => {
    switch (themeType) {
      case 'normal':
        return fleckSrcNormal;
      case 'blueWhite':
        return fleckSrcBlue;
      case 'dark':
        return fleckSrcDark;
      default:
        return fleckSrcNormal;
    }
  };
  const {
    title,
    text,
    value,
    text1,
    unit,
    badNum,
    status,
    // width = 100,
    // maxHeight = 10,
    // percent = 50,
    // value,
    //
    // showValue = true,
    // unit = 'M',
    // lineNum = 12,
    // defaultColor = '#06c',
    // activeColor = 'red',
    // valueStyle,
    // textStyle
  } = props;

  // @ts-ignore
  const hourArr = [...new Array(55).keys()];
  const grad = hourArr.map(item => (
      <div
        key={item}
        className={classNames('grad', item < 25 ? 'active' : null)}
        style={{ transform: `rotateZ(${item * (280 / 55) + 223}deg)` }}
      />
  ));

  return (
    <article className={classNames('ticker')}>
      <section className={value >= badNum ? 'badly-info' : ''}>
        <div className={classNames('title')}>{title}</div>
        <div className={classNames('value')}>
          {value}
          <span className={classNames('unit')}>{unit}</span>
        </div>
        <div className={classNames('text')}>{text}</div>
        <div className={classNames('text1')}>{text1}</div>
      </section>
      <div
        id={'bg-close'}
        className={classNames('bg', value >= badNum ? 'badly' : '')}
      />
      {status === '0' ? (
        ''
      ) : (
        <div className="bg-img-wrap">
          <img id={'bg-img'} className={classNames('bg-img', 'bg-img-animation')} src={circleSrc()} alt="" />
        </div>
      )}
      {status === '0' ? (
        ''
      ) : (
        <div className="bg-fleck-wrap">
          <img id={'bg-fleck'} className={classNames('bg-fleck', 'bg-fleck-animation')} src={fleckSrc()} alt="" />
        </div>
      )}
    </article>
  );
};

export default Ticker;
