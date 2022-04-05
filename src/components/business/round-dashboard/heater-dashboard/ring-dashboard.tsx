/**
 * 环状仪表盘
 */
import React, { useEffect, useState } from 'react';
import './style.less';

export interface DashboardProps {
  width: number;
  height: number;
  borderWidth: number;
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
  scaleLine: ScaleLine;
  indicatorStyle?: Indicator;
  currentColor?: string;
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

export function RingDashboard(props: DashboardProps) {
  const {
    width = 790,
    height = 790,
    borderWidth = 38,
    value = 30,
    minValue = 0,
    maxValue = 100,
    startAngle = 90,
    endAngle = 360,
    currentColor = '',
  } = props;
  const radius = (width / 2) - borderWidth;
  // 周长
  const getPerimeter =  2 * Math.PI * radius;
  // 缺角周长
  const getLength = 2 * Math.PI * radius * 0.75;
  const length = getLength - getPerimeter;
  const [currentLength, setCurrentLength] = useState(0);
  useEffect(() => {
    const percentage = value / (maxValue - minValue);
    const perimeter = 2 * Math.PI * radius * 0.75;
    setCurrentLength(perimeter * percentage);
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

  // 圆形刻度
  const renderRoundScale: any = () => {
    // 半径
    const r1 = width / 2;

    const scaleList: any[] = [];
    for (let i = startAngle; i <= endAngle; i += 14) {
      let color = '#C9D4DD';

      if (i <= currentAngle) {
        color = currentColor;
      } else {
        color = '#C9D4DD';
      }
      // 0 刻度线跟svg外层距离
      const x = r1 + (r1 - 96) * Math.cos((i * Math.PI) / 180);
      const y = r1 + (r1 - 96) * Math.sin((i * Math.PI) / 180);

      scaleList.push(<circle key={i} cx={x} cy={y} r="6" fill={color} strokeWidth="0" />);
    }

    return scaleList;
  };

  const renderIndicator: any = () => {
    // 半径
    const r1 = width / 2;

    const scaleList: any[] = [];
    // 0 刻度线跟svg外层距离
    const x = r1 + (r1 - borderWidth) * Math.cos((currentAngle * Math.PI) / 180);
    const y = r1 + (r1 - borderWidth) * Math.sin((currentAngle * Math.PI) / 180);

    scaleList.push(<circle
        cx={x}
        cy={y}
        r={borderWidth - 10}
        fill="#ffffff"
        stroke={currentColor}
        strokeWidth={19}
      />);
    return scaleList;
  };

  return (
    <svg
      className="ring-dashboard"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 760 760"
    >
      <circle
        cx={width / 2}
        cy={height / 2}
        r={radius}
        stroke="#C9D4DD"
        strokeWidth={borderWidth}
        fill="none"
        strokeDasharray={`${getLength} ${getPerimeter}`}
        strokeDashoffset={length}
        strokeLinecap="round"
      />
      <circle
        cx={width / 2}
        cy={height / 2}
        r={radius}
        stroke={currentColor}
        strokeWidth={borderWidth}
        fill="none"
        strokeDasharray={`${currentLength} ${getPerimeter}`}
        strokeDashoffset={length}
        strokeLinecap="round"
      >
      </circle>
      {renderRoundScale()}
      {renderIndicator()}
    </svg>
  );
}
