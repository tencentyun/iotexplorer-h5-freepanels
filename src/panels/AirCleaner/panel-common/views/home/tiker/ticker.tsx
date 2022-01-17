import React from 'react';
import './ticker.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import fleckSrcNormal from '../../icons/normal/fleck.svg';
import fleckSrcBlue from '../../icons/blue-white/fleck.svg';
import fleckSrcDark from '../../icons/dark/fleck.svg';
const circleSrcNormal =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/air-purifier/normal/circle.svg';
const circleSrcBlue =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/air-purifier/blue-white/circle.svg';
const circleSrcDark =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/air-purifier/blue-white/circle.svg';
const circleSrcColor =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/air-purifier/colorful/circle.svg';
const circleSrcMorandi =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/air-purifier/morandi/circle.svg';
const circleSrcWhite =
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/air-purifier/morandi/circle-white.svg';

export interface TickerProps {
  title: string;
  text: string;
  value: string;
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
        return circleSrcNormal;
      case 'blueWhite':
        return circleSrcBlue;
      case 'dark':
        return circleSrcDark;
      case 'colorful':
        return circleSrcColor;
      case 'morandi':
        return circleSrcMorandi;
      default:
        return circleSrcNormal;
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
    unit,
    badNum,
    status
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
  return (
    <article id={'ticker'} className={classNames('ticker')}>
      <section className={value >= badNum ? 'badly-info' : ''}>
        <div className={classNames('title')}>{title}</div>
        <div className={classNames('value')}>
          {value}
          <span className={classNames('unit')}>{unit}</span>
        </div>
        <div className={classNames('text')}>{text}</div>
      </section>
      <div className={classNames('bg', value >= badNum ? 'badly' : '')} />
      {status === '0' ? (
        ''
      ) : (
        value >= badNum ?
          <div className="bg-img-wrap">
            <img id={'bg-img'} className={classNames('bg-img','bg-img-animation')} src={circleSrcWhite} alt="" />
          </div> :
          <div className="bg-img-wrap">
            <img id={'bg-img'} className={classNames('bg-img','bg-img-animation')} src={circleSrc()} alt="" />
          </div>
      )}
      {status === '0' ? (
        ''
      ) : (
        <div className="bg-fleck-wrap">
          <img id={'bg-fleck'} className={classNames('bg-fleck','bg-fleck-animation')} src={fleckSrc()} alt="" />
        </div>
      )}
    </article>
  );
};

export default Ticker;
