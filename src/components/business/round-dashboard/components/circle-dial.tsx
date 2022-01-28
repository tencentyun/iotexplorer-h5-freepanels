/**
 * 无指针仪表盘
 */
import React, { useEffect } from 'react';
import './round-dashboard.less';

export interface DashboardProps {
  width: number;
  height: number;
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
  animaTime: number;
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
}

export function CircleDial(props: DashboardProps) {
  const {
    width = 760,
    height = 760,
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
    outerCicle = {
      circleR: 380,
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
    }
  } = props;

  useEffect(() => {
    const tickAnimation = () => {
      let interval: any;
      let i = 0;
      const activeLineList = document.getElementsByClassName('line');
      const lineList = document.getElementsByClassName('activeLine');
      const opacityValue = Number((1 / lineList.length).toFixed(2));
      interval = setInterval(() => {
        let opacity = opacityValue * i > 0.3 ? opacityValue * i : 0.3;
        let list = activeLineList[i].classList;
        if (list.contains('activeLine')) {
          activeLineList[i].setAttribute('style', 'stroke: ' + scaleLine.activeColor + ';stroke-width: 5;opacity: ' + opacity);
        } else {
          activeLineList[i].setAttribute('style', 'stroke: ' + 'none' + ';stroke-width: 5;');
        }
        i++;
        if (i === activeLineList.length) {
          clearInterval(interval);
        }
      }, scaleLine.animaTime);
    };
    tickAnimation();
  });

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
      ((1 - 0.3) / ((currentAngle - startAngle) / step)).toFixed(2)
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

      const x = r1 + (r1 - 23) * Math.cos((i * Math.PI) / 180);
      const y = r1 + (r1 - 23) * Math.sin((i * Math.PI) / 180);

      const x2 = r1 + (r2 - 23) * Math.cos((i * Math.PI) / 180);
      const y2 = r1 + (r2 - 23) * Math.sin((i * Math.PI) / 180);

      lines.push({
        angle: i,
        className: i <= currentAngle ? 'line activeLine' : 'line defaultLine',
        x1: x,
        y1: y,
        x2: x2,
        y2: y2,
        color: 'none',
        opacity: scaleIsGradient ? 0.3 + currentOpacity * n : 1
      });
    }

    return lines;
  };

  // 中心圆
  const renderCenterCicle = () => {
    const centerCicleStyle = {
      fill: centerCicle.color,
      filter: centerCicle.shade ? centerCicle.shade : '',
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

  // 外层圆
  const renderOuterCicle = () => {
    const outerCicleStyle = {
      fill: outerCicle.color,
      stroke: outerCicle.strokeColor,
      strokeWidth: outerCicle.strokeWidth + 'px'
    };

    return (
      <circle
        className="circleShadow"
        cx={centerCicle.circleX}
        cy={centerCicle.circleY}
        r={outerCicle.circleR}
        style={outerCicleStyle}
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
        style={{ stroke: item.color, opacity: item.opacity, strokeWidth: 5 }}
        strokeLinecap="round"
      ></line>
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
            x1="11.9385593%"
            y1="4.30729167%"
            x2="90.7415254%"
            y2="96.3203125%"
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
        <filter
          id="dropshadow"
          x="-26.8%"
          y="-25.8%"
          width="153.7%"
          height="153.7%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="0"
            dy="6"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            stdDeviation="50"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          ></feGaussianBlur>
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          ></feComposite>
          <feColorMatrix
            in="shadowBlurOuter1"
            type="matrix"
            values="0 0 0 0   0
                    0 0 0 0   0 
                    0 0 0 0   0 
                    0 0 0 .5 0"
          />
        </filter>
      </defs>

      {/* 外层圆 */}
      {renderOuterCicle()}
      {/* 中心圆 */}
      {renderCenterCicle()}
      <g id="lineList">{lineArray().map(renderLine)}</g>
    </svg>
  );
}
