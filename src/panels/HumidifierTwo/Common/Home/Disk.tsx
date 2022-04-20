/*
 * @Description: 加湿器-表盘
 */
import React, { useEffect } from 'react';

export interface DashboardProps {
  status: boolean;// 启用/停用
  width: number;
  height: number;
  startAngle?: number;// 起始角度。采用角度制
  endAngle?: number;// 终止角度
  step?: number;// 间隔角度
  lines?: Array<LineProps>;
  minValue?: number;
  maxValue?: number;
  value?: number;
  scaleLineColor?: string;
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

export function Disk(props: DashboardProps) {
  const {
    status = true,
    width = 300,
    height = 300,
    startAngle = 130, // 开始角度
    endAngle = 410, // 终止角度
    step = 4, // 间隔角度
    lines = [],
    minValue = 0,
    maxValue = 100,
    value = 50,
    scaleLineColor = '#26313D', // 刻度线颜色
  } = props;

  useEffect(() => {
    const tickAnimation = () => {
      let interval: any;
      let i = 0;
      const activeLineList = document.getElementsByClassName('line');
      interval = setInterval(() => {
        const list = activeLineList[i].classList;
        if (list.contains('activeLine')) {
          activeLineList[i].setAttribute('style', `stroke: ${scaleLineColor};stroke-width: 2`);
        } else {
          activeLineList[i].setAttribute('style', `stroke: ${scaleLineColor};stroke-width: 2`);
        }
        i++;
        if (i === activeLineList.length) {
          clearInterval(interval);
        }
      }, 60);
    };
    // tickAnimation();
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
    const r2 = r1 - 9;

    // 遍历角度，算出每条刻度线的起始坐标和终止坐标。
    for (let i = startAngle; i <= endAngle; i += step) {
      const color = scaleLineColor;
      const n = (i - startAngle) / step;

      const x = r1 + (r1 - 20) * Math.cos((i * Math.PI) / 180);
      const y = r1 + (r1 - 20) * Math.sin((i * Math.PI) / 180);

      const x2 = r1 + (r2 - 20) * Math.cos((i * Math.PI) / 180);
      const y2 = r1 + (r2 - 20) * Math.sin((i * Math.PI) / 180);

      lines.push({
        angle: i,
        className: i <= currentAngle ? 'line activeLine' : 'line defaultLine',
        x1: x,
        y1: y,
        x2,
        y2,
        color,
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
        style={{ stroke: item.color, strokeWidth: 2 }}
        strokeLinecap="round"
      ></line>
  );

  // 绘制指示标
  const renderIndicator: any = () => {
    // 半径
    const r1 = (width / 2);

    // 刻度线跟svg外层距离
    const x = r1 + (r1 - 55) * Math.cos((currentAngle * Math.PI) / 180);
    const y = r1 + (r1 - 55) * Math.sin((currentAngle * Math.PI) / 180);

    return <circle
      cx={x}
      cy={y}
      r={14}
      fill="#ffffff"
      stroke="#26313D"
      strokeWidth={8}
    />;
  };

  const getViewBox = () => [0, 0, width, height].join(' ');

  return (
    <div className="humidifier-disk-wrap">
      <svg
        className="humidifier-disk"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={getViewBox()}
      >
        <circle cx="150" cy="150" r="150" stroke="#EFF3F5" strokeWidth="1.2" fill="#FBFBFC" />
        <circle cx="150" cy="150" r="106" fill="#26313D"></circle>

        {renderIndicator()}

        <g id="lineList">{lineArray().map(renderLine)}</g>
      </svg>
      <div className="disk-circle-content">
        <div className="title">湿度设置</div>
        <div className="num">20<span>%</span></div>
        <div className="desc">当前水位 | 1 level</div>
      </div>
    </div>
  );
}
