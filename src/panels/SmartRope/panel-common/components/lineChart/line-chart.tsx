import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import viewportConfig from '../../../../../scripts/config/pxToViewport.config';

interface ItemProps {
  x: string;
  y: number;
}

interface lineChartProps {
  data: Array<ItemProps>;
  lineColor?: string; // 折线颜色
  pointColor?: string; // 拐点颜色
  wordColor?: string; // 文字颜色
}

const pxToView = (px: number): string | number => {
  if (px === 0) {
    return px;
  }
  const viewportWidth = viewportConfig.viewportWidth;
  const vw = px * (document.documentElement.clientWidth / viewportWidth);
  return vw.toFixed(viewportConfig.unitPrecision || 3);
};

const margin = {
  top: pxToView(50) as number,
  right: pxToView(48) as number,
  bottom: pxToView(90) as number,
  left: pxToView(48) as number
};

const WIDTH = pxToView(834) as number;
const HEIGHT = pxToView(650) as number;

export function LineChart(props: lineChartProps) {
  const chartWidth = WIDTH - margin.left - margin.right;
  const chartHeight = HEIGHT - margin.top - margin.bottom;

  const data = props.data;

  const [value, setValue] = useState(() => data.map(d => ({ ...d, y: 0 })));
  const svgRef = useRef(null);

  useEffect(() => {
    const t = d3.transition().duration(1000);

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
  }, []);

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

  const line = d3
    .line()
    .x((d: any) => xScale(d.x) || 0)
    .y((d: any) => yScale(d.y) || 0)
    .curve(d3.curveLinear);

  const getViewbox = () => {
    // px2vw(props.width) as string
    return [0, 0, WIDTH, HEIGHT].join(' ');
  };

  const getYAxisWordStyle = () => {
    return '';
  };

  return (
    <svg width={WIDTH} height={HEIGHT} ref={svgRef} viewBox={getViewbox()}>
      {/* x轴 */}
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
                  fill={props.wordColor}
                  textAnchor={'middle'}
                >
                  {d.x}
                </text>
              </g>
            );
          })}
        </g>
      </g>

      {/* y轴 */}
      <g
        className="y-axis"
        transform={`translate(${margin.left},${margin.top})`}
      >
        <g className="tick">
          {yScale.ticks(1).map((d, i) => {
            const y = yScale(d);

            return (
              <g key={i} transform={`translate(0, ${y})`}>
                <line
                  x1={0}
                  x2={chartWidth}
                  y1={0}
                  y2={0}
                  stroke={'#EDEEF2'}
                  strokeWidth={pxToView(3) as number}
                />
                <text
                  x={-pxToView(25) as number}
                  y={-pxToView(25) as number}
                  fontSize={pxToView(36) as number}
                  fill="#B5C4D1"
                  textAnchor={'end'}
                >
                  {d}
                </text>
              </g>
            );
          })}
        </g>
      </g>

      {/* 折线 */}
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <path
          d={line(value)}
          stroke={props.lineColor}
          fill="none"
          strokeWidth={3}
        />
        <path d={line(value)} stroke={props.lineColor} fill="none" />
        {value.map((d, i) => {
          const x = xScale(d.x);
          const y = yScale(d.y);

          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={pxToView(12.5) as number}
                fill={props.pointColor}
              ></circle>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
