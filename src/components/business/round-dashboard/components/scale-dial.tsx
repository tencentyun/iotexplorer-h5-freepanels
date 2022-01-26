/**
 * 半圆刻度仪表盘
 */
import React, { useEffect } from 'react';
import './round-dashboard.less';

export interface DashboardProps {
  width: number;
  height: number;
  radius?: number;
  scaleIsGradient?: boolean;
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

// 刻度线
export interface ScaleLine {
  defaultColor: string;
  activeColor: string;
  animaTime: number;
}

// 指示
export interface Indicator {
  color: string;
  distance?: number;
}

// 刻度线属性
export interface LineProps {
  angle: number;
  className: string;
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
  distance?: number;
}

export function ScaleDial(props: DashboardProps) {
  const {
    width = 760,
    height = 760,
    radius = 380,
    scaleIsGradient = false,
    startAngle = 180,
    // 终止角度
    endAngle = 360,
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
      color: '#0F0F0F'
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
      endColor: '#044DFF'
    },
    // 刻度线
    scaleLine = {
      defaultColor: 'rgba(156, 170, 181, 0.3)',
      activeColor: '#9CAAB5',
      animaTime: 60
    },
    // 指针
    indicatorStyle = {
      color: '#9CAAB5'
    }
  } = props;

  console.log(props);

  useEffect(() => {
    const tickAnimation = () => {
      let interval: any;
      let i = 0;
      let activeLineList = document.getElementsByClassName('activeLine');
      interval = setInterval(() => {
        activeLineList[i].setAttribute('style', 'stroke: ' + scaleLine.activeColor + ';stroke-width: 5');
        i++;
        if (i === activeLineList.length) {
          clearInterval(interval);
        }
      }, scaleLine.animaTime);
    }
    tickAnimation();
  })

  // 当前角度
  const currentAngle = (() => {
    //进度
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
  const currentOpacity: number = (() => {
    return Number(
      ((1 - 0.15) / ((currentAngle - startAngle) / step)).toFixed(2)
    );
  })();

  const lineArray = () => {
    // 半径
    const r1 = width / 2;
    // 半径2
    const r2 = r1 - 30;

    //遍历角度，算出每条刻度线的起始坐标和终止坐标。
    for (let i = startAngle; i <= endAngle; i += step) {
      const color = scaleLine.defaultColor;
      const n = (i - startAngle) / step;

      const x = r1 + (r1 - 0) * Math.cos((i * Math.PI) / 180);
      const y = r1 + (r1 - 0) * Math.sin((i * Math.PI) / 180);

      const x2 = r1 + (r2 - 0) * Math.cos((i * Math.PI) / 180);
      const y2 = r1 + (r2 - 0) * Math.sin((i * Math.PI) / 180);

      lines.push({
        angle: i,
        className: i <= currentAngle ? 'activeLine' : 'defaultLine',
        x1: x,
        y1: y,
        x2: x2,
        y2: y2,
        color: color,
        opacity: scaleIsGradient ? 0.15 + currentOpacity * n : 1
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
      strokeWidth: centerCicle.strokeWidth + 'px'
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

  // 绘制刻度线
  const renderLine = (item: LineProps, index: number) => {
    return (
      <line
        key={item.angle}
        className={item.className}
        x1={item.x1}
        y1={item.y1}
        x2={item.x2}
        y2={item.y2}
        style={{ stroke: item.color, strokeWidth: 5 }}
        strokeLinecap="round"
      ></line>
    );
  };

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

  // 绘制指示标
  const renderIndicator = () => {
    // 指示器的x,y坐标 根据圆上的点的坐标公式
    // 124指示球距离圆形边的距离
    const pathBorder = 10; // 指针轨迹border值
    const distance = indicator.distance ? indicator.distance : 124;
    const r = radius - distance - pathBorder / 2;
    const angle = 180; // 起点角度
    const startX =
      pathBorder / 2 + (1 - Math.sin((angle / 360) * Math.PI)) * r + distance;
    const startY =
      pathBorder / 2 + (1 + Math.cos((angle / 360) * Math.PI)) * r + distance;
    let endX, endY, dpath;
    // 起点确定，终点坐标轴四象限决定终点计算
    let angleDiff = value * (720 / 50);
    if (value <= 50) { // 小于等于50%
      let newAngle = 180 + angleDiff;
      endX = pathBorder / 2 + (1 - Math.sin(newAngle / 360 * Math.PI)) * r + distance;
      endY = pathBorder / 2 + (1 + Math.cos(newAngle / 360 * Math.PI)) * r + distance;
      dpath = ellipse2path(r, startX, startY, endX, endY, newAngle, 0);
    } else { // 大于50%
      let newAngle = 900 - angleDiff;
      endX = pathBorder / 2 + (1 + Math.sin(newAngle / 360 * Math.PI)) * r + distance;
      endY = pathBorder / 2 + (1 + Math.cos(newAngle / 360 * Math.PI)) * r + distance;
      dpath = ellipse2path(r, startX, startY, endX, endY, newAngle, 1);
    }

    const number = (currentAngle - startAngle) / step;
    return (
      <>
        <path d={dpath}
          stroke="red" strokeWidth="10px"
          fill="none"
          id="myPath"
        />
        <g transform={'translate(' + startX + ', ' + startY + '）rotate(-60.000000) translate(' + endX + ',' + endY +')'}>
          <polygon
            points="159.675895 173.511121 176.619407 207.397401 142.736694 207.395246"
            fill={indicatorStyle.color}
          >
          </polygon>
        </g>
        <polygon
          points="159.675895 173.511121 176.619407 207.397401 142.736694 207.395246"
          fill={indicatorStyle.color}
          transform={'translate(' + startX + ', ' + startY + ') rotate(-60)'}
        >
          {/* <animateMotion
            begin="0s"
            dur={(scaleLine.animaTime * number) / 1000 + 's'}
            fill="freeze"
            repeatCount="1"
          > */}
            <mpath xlinkHref="#myPath" />
          {/* </animateMotion> */}
        </polygon>
        {/* <circle
          r={indicator.radius}
          fill={indicatorStyle.color}
        >
          <animateMotion
            begin="0s"
            dur={(scaleLine.animaTime * number) / 1000 + 's'}
            fill="freeze"
            repeatCount="1"
          >
            <mpath xlinkHref="#myPath" />
          </animateMotion>
        </circle> */}
      </>
    );
  };

  const getViewbox = () => {
    return [0, 0, width, height].join(' ');
  };

  return (
    <svg
      className={businessType + '-round-dashboard'}
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

      {renderCenterCicle()}
      {/* {renderIndicator()} */}

      <g id="lineList">{lineArray().map(renderLine)}</g>
    </svg>
  );
}
