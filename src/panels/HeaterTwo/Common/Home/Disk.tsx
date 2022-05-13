/*
 * @Description: 取暖器-表盘
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@src/components/custom/Icon';
export interface DashboardProps {
  status: boolean;// 启用/停用
  unit: string;
  temp: string | number;
  width?: number;
  height?: number;
  startAngle?: number;// 起始角度。采用角度制
  endAngle?: number;// 终止角度
  step?: number;// 间隔角度
  lines?: Array<LineProps>;
  minValue?: number;
  maxValue?: number;
  value?: number;
}

// 刻度线属性
export interface LineProps {
  angle: number;
  className: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity?: number;
}

export function Disk(props: DashboardProps) {
  const {
    status = true,
    unit = 'C',
    temp = 0,
    width = 262,
    height = 262,
    startAngle = 130, // 开始角度
    endAngle = 410, // 终止角度
    step = 4, // 间隔角度
    lines = [],
    minValue = 0,
    maxValue = 100,
    value = 0,
  } = props;
  // 开屏动画定时器
  let interval: NodeJS.Timer;
  const getPerimeter = 2 * Math.PI * 120; // 周长
  const getLength = 2 * Math.PI * 120 * 0.778; // 缺角周长
  const length = getLength - getPerimeter;
  const [currentLength, setCurrentLength] = useState(0);

  useEffect(() => {
    const tickAnimation = () => {
      if (value > 0) {
        const r1 = (width / 2);
        const circle = document.getElementById('circle') as HTMLUnknownElement;
        const indicator = document.getElementById('indicator') as HTMLUnknownElement;
        let startIndex = 0;
        interval = setInterval(() => {
          startIndex += 2;
          const percent = startIndex / (maxValue - minValue);
          circle.setAttribute('stroke-dasharray', `${getLength * percent} ${getPerimeter * (1 - percent)}`);
          const angle = 280 * percent + 130;
          const x: number = r1 + (r1 - 13) * Math.cos((angle * Math.PI) / 180);
          const y: number = r1 + (r1 - 13) * Math.sin((angle * Math.PI) / 180);
          indicator.setAttribute('cx', x.toString());
          indicator.setAttribute('cy', y.toString());

          if (startIndex >= value) {
            clearInterval(interval);
          }
        }, 60);
      }
    };
    tickAnimation();
  }, []);

  useEffect(() => {
    const percentage = value / (maxValue - minValue);
    setCurrentLength(getLength * percentage);
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

  const lineArray = () => {
    // 半径
    const r1 = width / 2;
    // 半径2
    const r2 = r1 - 6;

    // 遍历角度，算出每条刻度线的起始坐标和终止坐标。
    for (let i = startAngle; i <= endAngle; i += step) {
      const color = 'rgba(216, 216, 216, 0.5)';

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
        opacity: status ? 1 : 0.5,
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
      style={{ strokeWidth: 2 }}
      strokeLinecap="round"
    ></line>
  );


  // 绘制指示标
  const renderIndicator: any = () => {
    // 半径
    const r1 = (width / 2);

    // 0 刻度线跟svg外层距离
    const x = r1 + (r1 - 13) * Math.cos((currentAngle * Math.PI) / 180);
    const y = r1 + (r1 - 13) * Math.sin((currentAngle * Math.PI) / 180);

    return <circle
      id='indicator'
      cx={x}
      cy={y}
      r={8}
      strokeWidth={6}
    />;
  };

  const getViewbox = () => [0, 0, width, height].join(' ');

  return (
    <div className={classNames(
      'heater-disk-wrap',
      status ? 'status-active' : 'status-disable',
    )}>
      <svg
        className="heater-disk"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={getViewbox()}
      >
        <radialGradient id="radialGradient" cx="53.3%" cy="53.3%" fx="50%" fy="50%">
          <stop offset="0%" stopColor={'rgba(102, 85, 248, 0.253906)'}></stop>
          <stop offset="100%" stopColor={'rgba(247, 244, 253, 0.148465)'}></stop>
        </radialGradient>
        <circle className="outer-circle" cx="131" cy="131" r="131" strokeWidth="1" />
        <circle className="center-circle" cx="131" cy="131" r="106" />

        <circle
          id='circle-bg'
          cx={131}
          cy={131}
          r={120}
          stroke="#EFF3F5"
          strokeWidth="6"
          fill="none"
          strokeDasharray={getPerimeter}
          strokeDashoffset={length}
          strokeLinecap="round"
          transform="rotate(50, 131, 131)"
        />
        <circle
          id='circle'
          cx={131}
          cy={131}
          r={120}
          stroke={'#26313D'}
          strokeWidth="6"
          fill="none"
          strokeDasharray={`${currentLength} ${getPerimeter}`}
          strokeDashoffset={length}
          strokeLinecap="round"
          transform="rotate(50, 131, 131)"
        >
        </circle>
        {renderIndicator()}

        <g id="lineList">{lineArray().map(renderLine)}</g>
        <text className="text" x="125" y="-3" fontSize={12} fill={'#26313D'}>15°</text>
        <text className="text" x="-20" y="131" fontSize={12} fill={'#26313D'}>20°</text>
        <text className="text" x="265" y="131" fontSize={12} fill={'#26313D'}>25°</text>
      </svg>
      <div className="disk-circle-content">
        <Icon name="light"></Icon>
        <div className="num">{value}°{unit}</div>
        <div className="title">当前温度</div>
        <div className="desc">目标温度{temp}°</div>
      </div>
    </div>
  );
}
