/**
 * 环状仪表盘
 */
import React, { useEffect } from 'react';
import './round-dashboard.less';

export interface DashboardProps {
  width: number;
  height: number;
  radius?: number;
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
    radius = 380,
    startAngle = 135,
    // 终止角度
    endAngle = 405,
    // 间隔角度
    step = 6,
    minValue = 0,
    maxValue = 100,
    value = 20,
    indicator = {
      x: 0,
      y: 0,
      radius: 36,
      color: '#0F0F0F',
    },
    businessType = '',
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

  const options = {
    size: 714,
    stroke: 40,
    arc: true,
    angle: endAngle - startAngle,
    sectorColor: '#789',
    circleColor: '#DDD',
    fillCircle: true,
    center: 0,
    radius: 0,
  };

  // Reset stroke to 0 if drawing full sector
  options.stroke = options.arc ? options.stroke : 0;

  // Circle dimenstions
  options.center = options.size / 2;
  options.radius = options.stroke
    ? options.center - options.stroke / 2
    : options.center;

  const getArc = (angle: number) => {
    const x = options.center + options.radius * Math.cos(radians(angle));
    const y = options.center + options.radius * Math.sin(radians(angle));

    return (
      `A${options.radius},${options.radius} 1 0 1 ${x},${y}`
    );
  };

  const radians = (degrees: number) => (degrees / 180) * Math.PI;

  const getSector = (returnD = false) => {
    const noptions = options;

    // Colors
    const sectorFill = noptions.arc ? 'none' : noptions.sectorColor;
    const sectorStroke = noptions.arc ? noptions.sectorColor : 'none';

    // Arc angles
    const firstAngle = noptions.angle > 180 ? 90 : noptions.angle - 90;
    const secondAngle = -270 + noptions.angle - 180;

    // Arcs
    const firstArc = getArc(firstAngle);
    const secondArc = noptions.angle > 180 ? getArc(secondAngle) : '';

    // start -> starting line
    // end -> will path be closed or not
    let end = '';
    let start = null;

    if (options.arc) {
      start = `M${options.center},${options.stroke / 2}`;
    } else {
      start = `M${options.center},${options.center} L${options.center},${
        options.stroke / 2
      }`;
      end = 'z';
    }

    const d = `${start} ${firstArc} ${secondArc} ${end}`;

    if (returnD) {
      return d;
    }

    return (
      <path
        className="Sektor-sector"
        strokeWidth="40"
        fill={sectorFill}
        stroke="#0F0F0F"
        d={d}
        strokeLinecap="round"
        transform="rotate(-135, 357, 357)"
      />
    );
  };

  // 圆形刻度
  const renderRoundScale = () => {
    // 半径
    const r1 = width / 2;

    const scaleList = [];
    for (let i = startAngle; i <= endAngle; i += 14) {
      let color = '#9CAAB5';

      if (i <= currentAngle) {
        color = '#0E0E0E';
      } else {
        color = '#9CAAB5';
      }
      // 0 刻度线跟svg外层距离
      const x = r1 + (r1 - 83) * Math.cos((i * Math.PI) / 180);
      const y = r1 + (r1 - 83) * Math.sin((i * Math.PI) / 180);

      scaleList.push(<circle key={i} cx={x} cy={y} r="6" fill={color} strokeWidth="0" />);
    }

    return scaleList;
  };

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

  const length = () => {
    const per = value / (maxValue - minValue);
    const r = radius - 109;
    console.log(per);
    return `${Math.PI * r * ((360 - 90) / 180) * per},${Math.PI * 2 * r}`;
  };
  const renderIndicator = () => {
    const pathBorder = 10; // 指针轨迹border值
    const r = radius - pathBorder / 2 - 40;
    const angle = 90; // 起点角度
    const startX = (1 - Math.sin((angle / 360) * Math.PI)) * r + 40;
    const startY = (1 + Math.cos((angle / 360) * Math.PI)) * r + 40;
    let endX; let endY; let dpath;
    // 起点确定，终点坐标轴四象限决定终点计算
    const angleDiff = value * (270 / 50);
    if (value <= 50) {
      // 小于等于50%
      const newAngle = 90 + angleDiff;
      endX = (1 - Math.sin((newAngle / 360) * Math.PI)) * r + 25;
      endY = (1 + Math.cos((newAngle / 360) * Math.PI)) * r + 25;
      dpath = ellipse2path(r, startX, startY, endX, endY, newAngle, 0);
    } else {
      // 大于50%
      const newAngle = 630 - angleDiff;
      endX = (1 + Math.sin((newAngle / 360) * Math.PI)) * r + 25;
      endY = (1 + Math.cos((newAngle / 360) * Math.PI)) * r + 25;
      dpath = ellipse2path(r, startX, startY, endX, endY, newAngle, 1);
    }

    const number = (currentAngle - startAngle) / step;
    return (
      <>
        <path
          d={dpath}
          stroke="none"
          strokeWidth="18px"
          fill="none"
          id="myPath"
        />
        <circle
          r={indicator.radius}
          stroke="#000000"
          strokeWidth="18px"
          fill={'#ffffff'}
        >
          <animateMotion begin="0s" dur={`${1}s`} fill="freeze" repeatCount="1">
            <mpath xlinkHref="#myPath" />
          </animateMotion>
        </circle>
      </>
    );
  };

  // // 绘制指示标
  // const renderIndicator = () => {
  //   // 指示器的x,y坐标 根据圆上的点的坐标公式
  //   // x=centerX + radius*cos(angle) y =centerX + radius*sin(angle)
  //   // 38指示球距离圆形边的距离
  //   indicator.x = (radius + (radius - 38) * Math.cos(currentAngle * Math.PI / 180));
  //   indicator.y = (radius + (radius - 38) * Math.sin(currentAngle * Math.PI / 180));

  //   return (
  //     <>
  //       <circle
  //         cx={indicator.x}
  //         cy={indicator.y}
  //         r={indicator.radius}
  //         fill={"#F4F8FB"}
  //         stroke="#0F0F0F"
  //         strokeWidth="18"

  //       >
  //         <animateMotion
  //           begin="0s"
  //           dur="2s"
  //           fill="freeze"
  //           repeatCount="1"
  //         >
  //         </animateMotion>
  //       </circle>
  //     </>
  //   )
  // }

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
      {getSector()}
      {renderRoundScale()}
      {renderIndicator()}
    </svg>
  );
}
