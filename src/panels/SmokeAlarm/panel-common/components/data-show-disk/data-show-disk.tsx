/*
 * @Description: 数据显示表盘
 */
import React from 'react';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import './data-show-disk.less';

const circleColor = {
  normal: {
    normal: { color: '#0F0F0F' },
    alarm: { color: '#FFFFFF' },
    Normal: { color: '#0F0F0F' },
    Alarm: { color: '#FFFFFF' }
  },
  blueWhite: {
    normal: { color: '#2A87FF' },
    alarm: { color: '#FFFFFF' },
    Normal: { color: '#2A87FF' },
    Alarm: { color: '#FFFFFF' }
  },
  dark: {
    normal: { color: '#FFFFFF' },
    alarm: { color: '#FFFFFF' },
    Normal: { color: '#FFFFFF' },
    Alarm: { color: '#FFFFFF' }
  },
  colorful: {
    normal: { color: '#FFFFFF' },
    alarm: { color: '#FFFFFF' },
    Normal: { color: '#FFFFFF' },
    Alarm: { color: '#FFFFFF' }
  },
  morandi: {
    normal: { color: '#B5ABA1' },
    alarm: { color: '#FFFFFF' },
    Normal: { color: '#B5ABA1' },
    Alarm: { color: '#FFFFFF' }
  }
};

const bubbles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

interface DiskProps {
  status: string;
  value: number;
  unit: string;
}

interface circleProps {
  angle: number;
  cx: number;
  cy: number;
  cr: number;
  color: string;
  opacity?: number;
}

const circleList: any = [];
const circleArray = (
  radius: number,
  smallRadius: number,
  dis: number,
  color: string,
  opacity: number
) => {
  // 半径
  const r = radius / 2;

  const step = 3;

  //遍历角度，算出每条刻度线的起始坐标和终止坐标。
  for (let i = 0; i <= 360; i += step) {
    // 0 刻度线跟svg外层距离
    const x = r + (r - smallRadius - dis) * Math.cos((i * Math.PI) / 180);
    const y = r + (r - smallRadius - dis) * Math.sin((i * Math.PI) / 180);

    circleList.push({
      angle: i,
      cx: x,
      cy: y,
      cr: smallRadius,
      color: color,
      opacity: opacity
    });
  }

  return circleList;
};

// 绘制刻度线
const renderCircle = (item: circleProps, index: number) => {
  return (
    <circle
      className="circle"
      key={index}
      r={item.cr}
      cx={item.cx}
      cy={item.cy}
      fill={item.color}
      opacity={item.opacity}
    ></circle>
  );
};

const getViewbox = () => {
  return [0, 0, 664, 664].join(' ');
};

export function DataShowDisk(props: DiskProps) {
  const themeType = getThemeType();
  const currentColor: any = circleColor[themeType];

  const { status = 'normal', value = 0, unit = 'ppm' } = props;

  let currentStatus: string = '';

  if (status == '1') {
    currentStatus = 'alarm';
  } else {
    currentStatus = 'normal';
  }

  return (
    <div className="data-show-disk">
      <div
        className={classNames(
          'disk',
          currentStatus === 'alarm' ? 'active' : ''
        )}
      >
        <div className="data">
          <div className="data-icon"></div>
          <div className="number">{value / 10}</div>
          <div className="unit">{unit}</div>
        </div>
        <div
          className={classNames(
            'pulse',
            currentStatus === 'alarm' ? 'pulseAnimation' : ''
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox={getViewbox()}>
            {circleArray(664, 3.5, 0, currentColor[currentStatus].color, 1).map(
              renderCircle
            )}
            {circleArray(
              664,
              3.3,
              30,
              currentColor[currentStatus].color,
              0.6
            ).map(renderCircle)}
            {circleArray(
              664,
              2.6,
              60,
              currentColor[currentStatus].color,
              0.5
            ).map(renderCircle)}
            {circleArray(
              664,
              2.3,
              90,
              currentColor[currentStatus].color,
              0.2
            ).map(renderCircle)}
          </svg>
        </div>
      </div>
      <ul className={classNames('bg-bubbles')}>
        {bubbles.map(value => (
          <li
            className={classNames(currentStatus === 'alarm' ? 'animation' : '')}
            key={value}
          >
            <span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
