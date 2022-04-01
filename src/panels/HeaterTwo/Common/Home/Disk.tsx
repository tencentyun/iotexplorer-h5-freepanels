/*
 * @Description: 取暖器-表盘
 */
import React, { useEffect, useState } from 'react';
import './Disk.less';
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
  borderWidth?: number;
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

export function Disk(props: DashboardProps) {
  const {
    width = 260,
    height = 260,
    radius = 130,
    borderWidth = 6,
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
    // 刻度线
    scaleLine = {
      defaultColor: 'rgba(156, 170, 181, 0.3)',
      activeColor: '#9CAAB5',
      animaTime: 60,
    },
    // 指针
    indicatorStyle = {
      color: '#9CAAB5',
    },
  } = props;

  useEffect(() => {
    const tickAnimation = () => {
      let interval: any;
      let i = 0;
      const activeLineList = document.getElementsByClassName('line');
      interval = setInterval(() => {
        const list = activeLineList[i].classList;
        if (list.contains('activeLine')) {
          activeLineList[i].setAttribute('style', `stroke: ${scaleLine.activeColor};stroke-width: 2`);
        } else {
          activeLineList[i].setAttribute('style', `stroke: ${scaleLine.defaultColor};stroke-width: 2`);
        }
        i++;
        if (i === activeLineList.length) {
          clearInterval(interval);
        }
      }, scaleLine.animaTime);
    };
    tickAnimation();
  }, [value]);

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
    const r2 = r1 - 6;

    // 遍历角度，算出每条刻度线的起始坐标和终止坐标。
    for (let i = startAngle; i <= endAngle; i += step) {
      const color = scaleLine.defaultColor;
      const n = (i - startAngle) / step;

      const x = r1 + (r1 - 36) * Math.cos((i * Math.PI) / 180);
      const y = r1 + (r1 - 36) * Math.sin((i * Math.PI) / 180);

      const x2 = r1 + (r2 - 36) * Math.cos((i * Math.PI) / 180);
      const y2 = r1 + (r2 - 36) * Math.sin((i * Math.PI) / 180);

      lines.push({
        angle: i,
        className: i <= currentAngle ? 'line activeLine' : 'line defaultLine',
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

  // 绘制刻度线
  const renderLine = (item: LineProps, index: number) => (
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

  const ellipse2path = (
    r: number,
    sx: number,
    sy: number,
    ex: number,
    ey: number,
    angle: number,
    largeArcFlag: number,
  ) => {
    // path 属性
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
      ey,
    ].join(' ');

    return descriptions;
  };

  // 绘制指示标
  const renderIndicator: any = () => {
    // 半径
    const r1 = (width / 2) - borderWidth - 10;

    const scaleList: any[] = [];
    // 0 刻度线跟svg外层距离
    const x = r1 + (r1 - borderWidth - 10) * Math.cos((currentAngle * Math.PI) / 180);
    const y = r1 + (r1 - borderWidth - 10) * Math.sin((currentAngle * Math.PI) / 180);

    scaleList.push(<circle
        cx={x}
        cy={y}
        r={10}
        fill="#ffffff"
        stroke="#26313D"
        strokeWidth={6}
      />);
    return scaleList;
  };

  const getViewbox = () => [0, 0, width, height].join(' ');

  const radius1 = 120;
  // 周长
  const getPerimeter = 2 * Math.PI * radius1;
  // 缺角周长
  const getLength = 2 * Math.PI * radius1 * 0.75;
  const length = getLength - getPerimeter;
  const [currentLength, setCurrentLength] = useState(0);

  useEffect(() => {
    const percentage = value / (maxValue - minValue);
    const perimeter = 2 * Math.PI * radius1 * 0.75;
    setCurrentLength(perimeter * percentage);
  }, [value]);
  return (
    <svg
      className="heater-disk"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={getViewbox()}
    >
      <circle cx="130" cy="130" r="130" stroke="#EFF3F5" strokeWidth="1" fill="#FBFBFC" />
      <circle cx="130" cy="130" r="106" fill="#26313D" />

      <circle
        cx={130}
        cy={130}
        r={120}
        stroke="#EFF3F5"
        strokeWidth="6"
        fill="none"
        strokeDasharray={length}
        strokeDashoffset={length}
        strokeLinecap="round"
      />
      <circle
        cx={130}
        cy={130}
        r={120}
        stroke="#26313D"
        strokeWidth="6"
        fill="none"
        strokeDasharray={`${currentLength} ${getPerimeter}`}
        strokeDashoffset={length}
        strokeLinecap="round"
      >
      </circle>
      {renderIndicator()}

      <g id="lineList">{lineArray().map(renderLine)}</g>
    </svg>
  );
}
