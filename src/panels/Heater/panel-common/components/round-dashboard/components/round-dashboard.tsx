/**
 * 圆形仪表盘
 */
import React, { useEffect, useState } from 'react';
import './round-dashboard.less';

export interface DashboardProps {
  width: number;
  height: number;
  radius?: number;
  isOuterCicle?: boolean;
  scaleIsGradient?: boolean;
  centerCicleFilter?: string;
  // 起始角度。采用角度制
  startAngle?: number;
  // 终止角度
  endAngle?: number;
  // 间隔角度
  step?: number;
  lines?: Array<LineProps>;
  minValue?: number;
  maxValue?: number;
  value?: number;
  indicator?: IndicatorProps;
  businessType: string;
  centerCicle?: CenterCicle;
  outerCicle?: OuterCicle;
  scaleLine: ScaleLine;
  indicatorStyle?: Indicator;
}

// 中心圆
export interface CenterCicle {
  circleX: number; // 圆心x
  circleY: number; // 圆心y
  circleR: number; // 半径r
  color: string; // 颜色
  startColor?: string; // 渐变
  endColor?: string; // 渐变
  strokeColor?: string; // 描边
  strokeWidth?: number;
  shade: string; // 阴影
}

// 外层圆
export interface OuterCicle {
  circleR: string;
  color: string; // 颜色
  startColor?: string; // 渐变
  endColor?: string; // 渐变
  strokeColor?: string; // 描边
  strokeWidth?: number;
  shade: string; // 阴影
}

// 刻度线
export interface ScaleLine {
  defaultColor: string;
  activeColor: string;
}

// 指示
export interface Indicator {
  color: string;
}

// 刻度线属性
export interface LineProps {
  angle: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  opacity?: number;
}

// 指针
export interface IndicatorProps {
  x: number;
  y: number;
  radius: number;
  color: string;
}

export function RoundDashboard(props: DashboardProps) {
  const {
    width = 760,
    height = 760,
    radius = 380,
    isOuterCicle = true,
    scaleIsGradient = false,
    startAngle = 135,
    // 终止角度
    endAngle = 405,
    // 间隔角度
    step = 6,
    lines = [],
    minValue = 0,
    maxValue = 100,
    value = 20,
    indicator = {
      x: 0,
      y: 0,
      radius: 12,
      color: '#0F0F0F',
    },
    businessType = '',
    centerCicle = {
      circleX: 380,
      circleY: 374,
      circleR: 300,
      color: '#FFFFFF',
      strokeColor: '', // 描边
      strokeWidth: 0,
      shade: 'true', // 阴影
      startColor: '#527DF4',
      endColor: '#044DFF',
    },
    outerCicle = {
      circleR: 380,
      color: '#FFFFFF',
      strokeColor: '', // 描边
      strokeWidth: 0,
      shade: 'true', // 阴影
      startColor: '#527DF4',
      endColor: '#044DFF',
    },
    // 刻度线
    scaleLine = {
      defaultColor: 'rgba(156, 170, 181, 0.3)',
      activeColor: '#9CAAB5',
    },
    // 指针
    indicatorStyle = {
      color: '#9CAAB5',
    },
  } = props;

  console.log(props);

  useEffect(() => {
    console.log('组件');
  });

  // 当前角度
  const currentAngle = (() => {
    // 进度
    const progress = value / (maxValue - minValue);
    const range = endAngle - startAngle;
    let angle = range * progress + startAngle;
    if (angle < startAngle) {
      angle = startAngle;
    }
    if (angle > endAngle) {
      angle = endAngle;
    }
    return angle;
  })();

  // 当前透明度
  const currentOpacity: number = (() => Number(((1 - 0.15) / ((currentAngle - startAngle) / step)).toFixed(2)))();

  const lineArray = () => {
    // 半径
    const r1 = width / 2;
    // 半径2
    const r2 = r1 - 30;

    // 遍历角度，算出每条刻度线的起始坐标和终止坐标。
    for (let i = startAngle; i <= endAngle; i += step) {
      let color = scaleLine.defaultColor;
      const n = (i - startAngle) / step;

      if (i <= currentAngle) {
        color = scaleLine.activeColor;
      } else {
        color = scaleLine.defaultColor;
      }
      // 0 刻度线跟svg外层距离
      const x = r1 + (r1 - 0) * Math.cos((i * Math.PI) / 180);
      const y = r1 + (r1 - 0) * Math.sin((i * Math.PI) / 180);

      const x2 = r1 + (r2 - 0) * Math.cos((i * Math.PI) / 180);
      const y2 = r1 + (r2 - 0) * Math.sin((i * Math.PI) / 180);

      lines.push({
        angle: i,
        x1: x,
        y1: y,
        x2,
        y2,
        color,
        opacity: scaleIsGradient ? 0.15 + currentOpacity * n : 1,
      });
    }

    return lines;
  };

  // 中心圆
  const renderCenterCicle = () => {
    const centerCicleStyle = {
      fill: centerCicle.color,
      filter: 'url(#dropshadow)',
      stroke: centerCicle.strokeColor,
      strokeWidth: `${centerCicle.strokeWidth}px`,
    };

    return (
      <circle
        className="circleShadow"
        cx={centerCicle.circleX}
        cy={centerCicle.circleY}
        r={centerCicle.circleR}
        style={centerCicleStyle}
      ></circle>
    );
  };

  // 外层圆
  const renderOuterCicle = () => {
    const outerCicleStyle = {
      fill: outerCicle.color,
      filter: 'url(#dropshadow)',
      stroke: outerCicle.strokeColor,
      strokeWidth: `${outerCicle.strokeWidth}px`,
    };

    if (isOuterCicle) {
      console.log('--------');
      return (
        <circle
          className="circleShadow"
          cx={centerCicle.circleX}
          cy={centerCicle.circleY}
          r={outerCicle.circleR}
          style={outerCicleStyle}
        ></circle>
      );
    }
    return null;
  };

  // 绘制刻度线
  const renderLine = (item: LineProps, index: number) => (
      <line
        className="line"
        key={index}
        x1={item.x1}
        y1={item.y1}
        x2={item.x2}
        y2={item.y2}
        style={{ stroke: item.color, opacity: item.opacity, strokeWidth: 5 }}
        strokeLinecap="round"
      ></line>
  );

  // 圆形刻度
  const renderRoundScale = () => {
    // 半径
    const r1 = 380;
    // 半径2
    const r2 = r1 - 3;
    const arr = [];
    for (let i = startAngle; i <= endAngle; i += 14) {
      let color = '#9CAAB5';

      if (i <= currentAngle) {
        color = '#0E0E0E';
      } else {
        color = '#9CAAB5';
      }
      // 0 刻度线跟svg外层距离
      const x = r1 + (r1 - 130) * Math.cos((i * Math.PI) / 180);
      const y = r1 + (r1 - 130) * Math.sin((i * Math.PI) / 180);

      const x2 = r1 + (r2 - 0) * Math.cos((i * Math.PI) / 180);
      const y2 = r1 + (r2 - 0) * Math.sin((i * Math.PI) / 180);

      arr.push(<circle
          key={i}
          cx={x}
          cy={y}
          r="6"
          style={{ stroke: color, strokeWidth: 5 }}
        />);
    }

    console.log(arr);
    return arr;
  };

  const ellipse2path = (sx: number, sy: number, ex: number, ey: number) => {
    // 大于180度时候画大角度弧，小于180度的画小角度弧，(deg > 180) ? 1 : 0
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    const angle = startAngle + (currentAngle - startAngle) / 2;

    const x = radius + (radius - 104) * Math.cos((angle * Math.PI) / 180);
    const y = radius + (radius - 104) * Math.sin((angle * Math.PI) / 180);

    // path 属性
    const descriptions = [
      'M',
      sx,
      sy,
      // 'Q', x, y, ex, ey
      'A',
      x,
      y,
      angle,
      largeArcFlag,
      1,
      ex,
      ey,
      // 'a', r, r, 0, largeArcFlag, 1, ex, ey
    ].join(' ');

    return descriptions;
  };

  // 绘制指示标
  const renderIndicator = () => {
    // 指示器的x,y坐标 根据圆上的点的坐标公式
    // x=centerX + radius*cos(angle) y =centerX + radius*sin(angle)
    // 124指示球距离圆形边的距离
    const startX =      radius + (radius - 104) * Math.cos((startAngle * Math.PI) / 180);
    const startY =      radius + (radius - 104) * Math.sin((startAngle * Math.PI) / 180);
    indicator.x =      radius + (radius - 104) * Math.cos((currentAngle * Math.PI) / 180);
    indicator.y =      radius + (radius - 104) * Math.sin((currentAngle * Math.PI) / 180);

    const dpath = ellipse2path(startX, startY, indicator.x, indicator.y);
    return (
      <>
        <path d={dpath} stroke="#ccc" strokeWidth="0" fill="none" id="myPath" />
        <circle
          // cx={indicator.x}
          // cy={indicator.y}
          r={indicator.radius}
          fill={indicatorStyle.color}
        >
          <animateMotion begin="0s" dur="2s" fill="freeze" repeatCount="1">
            <mpath xlinkHref="#myPath" />
          </animateMotion>
        </circle>
      </>
    );
  };

  const getViewbox = () =>
    // px2vw(props.width) as string
    [0, 0, width, height].join(' ')
  ;

  return (
    <svg
      className={`${businessType}-round-dashboard`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={getViewbox()}
    >
      <defs>
        {centerCicle.color === 'url(#gradient)' ? (
          <linearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientTransform="rotate(49)"
          >
            <stop
              offset="0%"
              stopColor={
                centerCicle.startColor ? centerCicle.startColor : '#527DF4'
              }
            />
            <stop
              offset="100%"
              stopColor={
                centerCicle.endColor ? centerCicle.endColor : '#044DFF'
              }
            />
          </linearGradient>
        ) : null}
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

      {renderOuterCicle()}
      {renderCenterCicle()}
      {renderIndicator()}

      {lineArray().map(renderLine)}
      {/* {renderRoundScale()} */}
    </svg>
  );
}
