/**
 * 环状仪表盘
 */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import './ring-dashboard.less';

export interface DashboardProps {
  width: number;
  height: number;
  radius?: number;
  // 起始角度。采用角度制
  startAngle?: number;
  // 终止角度
  endAngle?: number;
  // 间隔角度
  value?: number;
  className: string;
  children: React.ReactNode;
}

export function RingDashboard(props: DashboardProps) {
  const {
    className = '',
    width = 764,
    height = 764,
    radius = 363,
    startAngle = 50, // 终止角度
    endAngle = 720, // 间隔角度
    value = 0
  } = props;

  useEffect(() => {
    console.log('组件');
  });

  const ellipse2path = (
    r: number,
    sx: number,
    sy: number,
    ex: number,
    ey: number,
    angle: number,
    largeArcFlag: number
  ) => {
    //path 属性
    const descriptions = [
      'M',
      sx,
      sy,
      'A',
      r,
      r,
      angle,
      largeArcFlag,
      1,
      ex,
      ey
    ].join(' ');

    return descriptions;
  };

  const renderIndicator = () => {
    const pathBorder = 18; // 指针轨迹border值
    const r = radius - pathBorder / 2 - 40;
    const angle = 50; // 起点角度
    const startX = (1 - Math.sin((angle / 360) * Math.PI)) * r + 40;
    const startY = (1 + Math.cos((angle / 360) * Math.PI)) * r + 40;
    let endX, endY, dpath;
    // 起点确定，终点坐标轴四象限决定终点计算
    const angleDiff = value * (310 / 50);
    if (value <= 50) {
      // 小于等于50%
      const newAngle = 50 + angleDiff;
      endX = (1 - Math.sin((newAngle / 360) * Math.PI)) * r + 45;
      endY = (1 + Math.cos((newAngle / 360) * Math.PI)) * r + 45;
      dpath = ellipse2path(r, startX, startY, endX, endY, newAngle, 0);
    } else {
      // 大于50%
      const newAngle = 630 - angleDiff;
      endX = (1 + Math.sin((newAngle / 360) * Math.PI)) * r + 45;
      endY = (1 + Math.cos((newAngle / 360) * Math.PI)) * r + 45;
      dpath = ellipse2path(r, startX, startY, endX, endY, newAngle, 1);
    }

    return (
      <>
        <path
          d={dpath}
          stroke="url(#fill-gradient)"
          strokeWidth="18px"
          fill="none"
          id="myPath"
          strokeLinecap="round"
        />
        <circle r="18" stroke="#FBFBFF" strokeWidth="11" fill="#00E0FE">
          <animateMotion begin="0s" dur={2 + 's'} fill="freeze" repeatCount="1">
            <mpath xlinkHref="#myPath" />
          </animateMotion>
        </circle>
      </>
    );
  };

  const renderPath = () => {
    const pathBorder = 18; // 指针轨迹border值
    const r = radius - pathBorder / 2 - 40;
    const angle = 50; // 起点角度
    const startX = (1 - Math.sin((angle / 360) * Math.PI)) * r + 40;
    const startY = (1 + Math.cos((angle / 360) * Math.PI)) * r + 40;
    const newAngle = 770;
    const endX = (1 + Math.sin((newAngle / 360) * Math.PI)) * r + 45;
    const endY = (1 + Math.cos((newAngle / 360) * Math.PI)) * r + 45;
    const dpath = ellipse2path(r, startX, startY, endX, endY, newAngle, 1);

    return (
      <>
        <path
          id="track"
          d={dpath}
          stroke="#212432"
          strokeWidth="18px"
          fill="none"
          strokeLinecap="round"
        />
      </>
    );
  };

  const getViewbox = () => {
    return [0, 0, width, height].join(' ');
  };

  return (
    <>
      <svg
        className={classNames('ring-dashboard', className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={getViewbox()}
      >
        <defs>
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientTransform="rotate(49)"
          >
            <stop offset="0%" stopColor="#333E4D" />
            <stop offset="100%" stopColor="#202C3A" />
          </linearGradient>
          <linearGradient
            id="fill-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientTransform="rotate(49)"
          >
            <stop offset="0%" stopColor="#1DC6FB" />
            <stop offset="100%" stopColor="#5870F4" />
          </linearGradient>
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="50" />
            <feOffset dx="0" dy="6" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          className="circleShadow"
          cx={382}
          cy={382}
          r={382}
          fill={'url(#gradient)'}
          stroke="#242735"
          strokeWidth="3"
        ></circle>
        {renderPath()}
        {renderIndicator()}
      </svg>
      {props.children}
    </>
  );
}
