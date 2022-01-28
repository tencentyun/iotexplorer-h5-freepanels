import React from 'react';
import './ticker.less';
import classNames from 'classnames';

export interface TickerProps {
  title: string;
  text: string;
  value: string;
  unit: string;
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
  const {
    title,
    text,
    value,
    unit
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
  const grad = hourArr.map(item => {
    return (
      <div
        key={item}
        className={classNames('grad', item < 25 ? 'active' : null)}
        style={{ transform: `rotateZ(${item * (280 / 55) + 223}deg)` }}
      />
    );
  });

  return (
    <article className={classNames('ticker')}>
      <section>
        <div className={classNames('title')}>{title}</div>
        <div
          className={classNames('value', value === '已关机' ? 'power-off' : '')}
        >
          {value}
          <span className={classNames('unit')}>{unit}</span>
        </div>
        <div className={classNames('text')}>{text}</div>
      </section>
      <div className={classNames('bg')} />
      {grad}
    </article>
  );
};

export default Ticker;
