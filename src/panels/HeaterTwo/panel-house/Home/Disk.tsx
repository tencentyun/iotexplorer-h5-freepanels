/*
 * @Description: 取暖器-表盘
 */
import React, { useEffect, useState } from 'react';
import { Icon } from '@src/components/custom/Icon';

export interface DashboardProps {
  status: boolean;// 启用/停用
  width?: number;
  height?: number;
  startAngle?: number;// 起始角度。采用角度制
  endAngle?: number;// 终止角度
  step?: number;// 间隔角度
  lines?: Array<LineProps>;
  minValue?: number;
  maxValue?: number;
  value?: number;
  scaleLineColor?: string;
  progressColor?: string;
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
    width = 262,
    height = 262,
    startAngle = 130, // 开始角度
    endAngle = 410, // 终止角度
    step = 4, // 间隔角度
    lines = [],
    minValue = 0,
    maxValue = 100,
    value = 0,
    scaleLineColor = 'rgba(216, 216, 216, 0.5)', // 刻度线颜色
    progressColor = '#26313D', // 进度条颜色
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
          const x = r1 + (r1 - 13) * Math.cos((angle * Math.PI) / 180);
          const y = r1 + (r1 - 13) * Math.sin((angle * Math.PI) / 180);
          indicator.setAttribute('cx', x);
          indicator.setAttribute('cy', y);

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
      const color = scaleLineColor;

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

    // 0 刻度线跟svg外层距离
    const x = r1 + (r1 - 13) * Math.cos((currentAngle * Math.PI) / 180);
    const y = r1 + (r1 - 13) * Math.sin((currentAngle * Math.PI) / 180);

    return <circle
      id='indicator'
      cx={x}
      cy={y}
      r={8}
      fill="#ffffff"
      stroke={progressColor}
      strokeWidth={6}
    />;
  };

  const getViewbox = () => [0, 0, width, height].join(' ');

  return (
    <div className="heater-disk-wrap">
      <svg
        className="heater-disk"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={getViewbox()}
      >
       <defs>
        <filter id="filter0" x="0" y="0" width="260" height="260" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_63_9919"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="6.5"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.917875 0 0 0 0 0.928587 0 0 0 0 0.944548 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_9919"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_9919" result="shape"/>
        </filter>
        <filter id="filter1" x="48.1519" y="48.1519" width="163.696" height="163.696" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_63_9919"/>
        </filter>
        <radialGradient id="paint0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(130 130) rotate(90) scale(106 106.294)">
          <stop/>
          <stop offset="1" stopColor="#1E1E1E"/>
        </radialGradient>
        <linearGradient id="paint1" x1="-15.087" y1="77.6604" x2="75.1472" y2="277.176" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBD8A8"/>
          <stop offset="1" stopColor="#A47146"/>
        </linearGradient>
        <radialGradient id="paint2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(129.906 131.64) rotate(90) scale(60.081)">
          <stop/>
          <stop offset="1" stopColor="#080906"/>
        </radialGradient>
      </defs>

        {/* <circle cx="131" cy="131" r="131" stroke="#EFF3F5" strokeWidth="1" fill="#FBFBFC" />
        <circle cx="131" cy="131" r="106" fill="#26313D" /> */}

        <g filter="url(#filter0)">
          <circle cx="130" cy="130" r="106" fill="url(#paint0)"/>
          <circle cx="130" cy="130" r="110" stroke="url(#paint1)" strokeWidth="8"/>
        </g>
        <g filter="url(#filter1)">
          <circle cx="130" cy="130" r="81.8481" fill="#1C1D1C"/>
        </g>
        <circle cx="130" cy="130" r="61.7215" fill="url(#paint2)"/>

        <circle
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
          stroke={progressColor}
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
        <text x="125" y="-3" fontSize={12} fill={progressColor}>20°</text>
        <text x="-20" y="131" fontSize={12} fill={progressColor}>20°</text>
        <text x="265" y="131" fontSize={12} fill={progressColor}>20°</text>
      </svg>
      <div className="disk-circle-content">
        <Icon name="light"></Icon>
        <div className="num">20°C</div>
        <div className="title">当前温度</div>
        <div className="desc">目标温度20°</div>
      </div>
    </div>
  );
}
