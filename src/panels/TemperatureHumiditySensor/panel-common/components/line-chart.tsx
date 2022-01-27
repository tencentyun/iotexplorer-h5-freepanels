import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import viewportConfig from '../../../../../webpack/pxToViewport.config';

interface ItemProps {
  x: string;
  y: number;
}

interface lineChartProps {
  id: string;
  data: Array<ItemProps>;
  isShowX?: boolean; // 是否显示x轴
  axisWordColor?: string; // x轴文字颜色
  type?: string; // 折线or面积图
  lineColor?: string; // 折线颜色
  isSolid?: boolean; // 拐点实心？空心
  pointFill?: string; // 空心拐点颜色
  pointColor?: string; // 拐点颜色
  wordColor?: string; // 文字颜色
  areaColor?: string; // 面积图颜色
  bottom: number; // 底边距离
  unit: string; // 单位
}

const pxToView = (px: number): string | number => {
  if (px === 0) {
    return px;
  }
  const viewportWidth = viewportConfig.viewportWidth;
  const vw = px * (document.documentElement.clientWidth / viewportWidth);
  return vw.toFixed(viewportConfig.unitPrecision || 3);
};

export function LineChart(props: lineChartProps) {
  const margin = {
    top: pxToView(53) as number,
    right: pxToView(58) as number,
    bottom: pxToView(props.bottom) as number,
    left: pxToView(58) as number
  };

  const WIDTH = pxToView(750) as number;
  const HEIGHT = pxToView(180) as number;

  const chartWidth = WIDTH - margin.left - margin.right;
  const chartHeight = HEIGHT - margin.top - margin.bottom;

  const data = props.data;

  const [value, setValue] = useState(() => {
    if (!data || data.length === 0) {
      return [];
    } else {
      return data.map(d => ({ ...d, y: 0 }));
    }
  });
  const svgRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) return;

    const t = d3
      .select('#' + props.id)
      .transition()
      .duration(1000);

    t.tween('height', () => {
      const interpolates = data.map((d, i) => {
        const start = (value[i] && value[i].y) || 0;
        return d3.interpolateNumber(start, d.y);
      });
      return (t: any) => {
        const newData = data.map((d, i) => {
          return { ...d, y: interpolates[i](t) };
        });
        setValue(newData);
      };
    });
  }, props.data);

  const xScale =
    d3
      .scalePoint()
      .domain(data.map(d => d.x))
      .range([0, chartWidth])
      .padding(0)
      .round(true) || 0;

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map(d => d.y)) || 0])
    .range([chartHeight, 0])
    .nice();

  const line: any = d3
    .line()
    .x((d: any) => xScale(d.x) || 0)
    .y((d: any) => yScale(d.y) || 0)
    .curve(d3.curveLinear);

  const area: any = d3
    .area()
    .x((d: any) => xScale(d.x) || 0)
    .y1((d: any) => yScale(d.y) || 0)
    .y0((d: any) => yScale(0) || 0);

  const getViewbox = () => {
    // px2vw(props.width) as string
    return [0, 0, WIDTH, HEIGHT].join(' ');
  };

  const dStyle = () => {
    if (props.type === 'line') {
      return line(value);
    } else {
      return area(value);
    }
  };

  return (
    <svg
      id={props.id}
      width={WIDTH}
      height={HEIGHT}
      ref={svgRef}
      viewBox={getViewbox()}
    >
      <linearGradient id="area-normal" x1={0} x2={0} y1={0} y2={1}>
        <stop offset="0%" stopColor="#B5C4D1" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#B5C4D1" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="point-colorful"
        x1="61.5645064%"
        y1="-28.7259615%"
        x2="61.5645064%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#527DF4" />
        <stop offset="100%" stopColor="#044DFF" />
      </linearGradient>
      <linearGradient id="area-colorful" x1={0} x2={0} y1={0} y2={1}>
        <stop offset="0%" stopColor="#FFD102" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#FFD102" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="area-morandi" x1={0} x2={0} y1={0} y2={1}>
        <stop offset="0%" stopColor="#B5ABA1" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#B5ABA1" stopOpacity={0} />
      </linearGradient>
      {/* x轴 */}
      {props.isShowX ? (
        <g
          className="x-axis"
          transform={`translate(${margin.left},${HEIGHT - margin.bottom})`}
        >
          {/* 轴标签*/}
          <g className="tick">
            {data.map((d, i) => {
              const x = xScale(d.x);

              return (
                <g key={i}>
                  {/* 轴标签文本 */}
                  <text
                    x={x}
                    y={20}
                    fontSize={pxToView(36) as number}
                    fill={props.axisWordColor}
                    textAnchor={'middle'}
                  >
                    {d.x}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      ) : null}

      {/* 折线 */}
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <path
          d={line(value)}
          stroke={props.lineColor}
          fill="none"
          strokeWidth={3}
        />
        <path
          d={dStyle()}
          stroke={props.type === 'line' ? props.lineColor : 'none'}
          fill={props.type === 'line' ? 'none' : props.areaColor}
        />
        {value.map((d, i) => {
          const x = xScale(d.x);
          const y = yScale(d.y);

          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={pxToView(12.5) as number}
                fill={props.isSolid ? props.pointColor : props.pointFill}
                stroke={props.pointColor}
                strokeWidth={props.isSolid ? '0' : (pxToView(5) as number)}
              ></circle>
              <text
                x={x}
                y={y - 12}
                fontSize={pxToView(36) as number}
                fill={props.wordColor}
                textAnchor={'middle'}
              >
                {data[i].y}
                {props.unit ? props.unit : ''}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
