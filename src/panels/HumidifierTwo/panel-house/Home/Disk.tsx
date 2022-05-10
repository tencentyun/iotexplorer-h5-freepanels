/*
 * @Description: 加湿器-表盘
 */
import React, { useEffect } from 'react';
import classNames from 'classnames';

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
    width = 308,
    height = 308,
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

  useEffect(() => {
    const tickAnimation = () => {
      if (value > 0) {
        const r1 = (width / 2);
        const indicator = document.getElementById('indicator') as HTMLUnknownElement;
        let startIndex = 0;
        interval = setInterval(() => {
          startIndex += 2;
          const percent = startIndex / (maxValue - minValue);
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
      const color = '#E3D3C6';

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

    // 0 刻度线跟svg外层距离
    const x = r1 + (r1 - 44) * Math.cos((currentAngle * Math.PI) / 180);
    const y = r1 + (r1 - 44) * Math.sin((currentAngle * Math.PI) / 180);

    return <circle
      id='indicator'
      cx={x}
      cy={y}
      r={8}
      fill={'url(#paint4)'}
      stroke={'#E7BE86'}
      strokeWidth={4}
    />;
  };

  const getViewbox = () => [0, 0, width, height].join(' ');

  return (
    <div className={classNames(
      'humidifier-disk-wrap',
      status ? 'status-active' : 'status-disable',
    )}>
      <svg
        className="heater-disk"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={getViewbox()}
      >
        <defs>
          <filter id="filter0" x="24" y="24" width="260" height="260" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_63_10055"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="6.5"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.917875 0 0 0 0 0.928587 0 0 0 0 0.944548 0 0 0 1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_10055"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_63_10055" result="shape"/>
          </filter>
          <filter id="filter1" x="72.1519" y="72.1519" width="163.696" height="163.696" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_63_10055"/>
          </filter>
          <radialGradient id="paint0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(154 154) rotate(90) scale(106 106.294)">
            <stop/>
            <stop offset="1" stopColor="#1E1E1E"/>
          </radialGradient>
          <linearGradient id="paint1" x1="8.91302" y1="101.66" x2="99.1472" y2="301.176" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBD8A8"/>
            <stop offset="1" stopColor="#A47146"/>
          </linearGradient>
          <radialGradient id="paint2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(153.906 155.64) rotate(90) scale(60.081)">
            <stop/>
            <stop offset="1" stopColor="#080906"/>
          </radialGradient>
          <radialGradient id="paint3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(91.3376 65.0429) rotate(89.1595) scale(81.3907 130.608)">
            <stop stopColor="white" stopOpacity="0.236014"/>
            <stop offset="0.456184" stopColor="white" stopOpacity="0.173978"/>
            <stop offset="1" stopColor="white" stopOpacity="0.01"/>
            <stop offset="1" stopColor="white" stopOpacity="0.01"/>
          </radialGradient>
          <radialGradient id="paint4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48 127) rotate(90) scale(6 6.01663)">
            <stop/>
            <stop offset="1" stopColor="#1E1E1E"/>
          </radialGradient>
          <radialGradient id="paint5" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(153.906 155.64) rotate(90) scale(60.081)">
            <stop/>
            <stop offset="1" stopColor="#080906"/>
          </radialGradient>
        </defs>

        <circle opacity="0.352655" cx="154" cy="154" r="154" fill="#FCF8F6"/>
        <circle cx="154" cy="154" r="142" fill="white" stroke="#A47146" strokeOpacity="0.29835"/>
        <g filter="url(#filter0)">
          <circle cx="154" cy="154" r="106" fill="url(#paint0)"/>
          <circle cx="154" cy="154" r="110" stroke="url(#paint1)" strokeWidth="8"/>
        </g>
        <g filter="url(#filter1)">
          <circle cx="154" cy="154" r="81.8481" fill="#1C1D1C"/>
        </g>
        <circle cx="154" cy="154" r="61.7215" fill="url(#paint2)"/>

        <mask id="mask0" maskUnits="userSpaceOnUse" x="47" y="48" width="212" height="212">
          <circle cx="153" cy="154" r="106" fill="white"/>
        </mask>
        <g mask="url(#mask0)">
          <ellipse cx="91.2785" cy="63.4302" rx="139.544" ry="117.405" transform="rotate(-27 91.2785 63.4302)" fill="url(#paint3)"/>
        </g>

        {renderIndicator()}

        <g id="lineList">{lineArray().map(renderLine)}</g>
      </svg>
      <div className="disk-circle-content">
        {status
          ? <>
              <div className="title">湿度设置</div>
              <div className="num">{value}<span>%</span></div>
              <div className="desc">当前水位 | 1 level</div>
            </>
          : <div className="close">已关机</div>
        }
      </div>
    </div>
  );
}
