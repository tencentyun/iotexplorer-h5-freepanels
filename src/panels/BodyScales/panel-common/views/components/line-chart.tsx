import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import viewportConfig from '../../../../../../webpack/pxToViewport.config';
import { getThemeType } from '@libs/theme';

const data = [
  {
    x: '11:00',
    y: 60
  },
  {
    x: '12:00',
    y: 55
  },
  {
    x: '13:00',
    y: 64
  },
  {
    x: '14:00',
    y: 45
  },
  {
    x: '15:00',
    y: 40
  },
  {
    x: '16:00',
    y: 40
  }
];

interface lineChartProps {
  tpye?: String;
  size: String;
  width: number;
  height: number;
}
// const WIDTH = px2vw(834) as number;
// const HEIGHT = px2vw(500) as number;
const pxToView = (px: number): string | number => {
  if (px === 0) {
    return px;
  }
  const viewportWidth = viewportConfig.viewportWidth;
  const vw = px * (document.documentElement.clientWidth / viewportWidth);
  return vw.toFixed(viewportConfig.unitPrecision || 3);
};

const margin = {
  top: pxToView(20) as number,
  right: pxToView(13) as number,
  bottom: pxToView(60) as number,
  left: pxToView(13) as number
};

const themeType = getThemeType();
export function LineChart(props: lineChartProps) {
  const [width] = useState(props.width);
  const [height] = useState(props.height);
  const WIDTH = pxToView(width) as number;
  const HEIGHT = pxToView(height) as number;

  const chartWidth = WIDTH - margin.left - margin.right;
  const chartHeight = HEIGHT - margin.top - margin.bottom;

  const [value, setValue] = useState(() => data.map(d => ({ ...d, y: 0 })));
  const [size] = useState(props.size);
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

  const area = d3
    .area()
    .x((d: any) => xScale(d.x) || 0)
    .y1((d: any) => yScale(d.y) || 0)
    .y0((d: any) => yScale(0) || 0);

  const getViewbox = () => {
    // px2vw(props.width) as string
    return [0, 0, WIDTH, HEIGHT].join(' ');
  };

  const getYAxisWordStyle = () => {
    return '';
  };

  const dStyle = () => {
    if (props.tpye === 'line') {
      return line(value);
    } else {
      return area(value);
    }
  };

  return (
    <svg width={WIDTH} height={HEIGHT} ref={svgRef} viewBox={getViewbox()}>
      <linearGradient id="linear-gradient" x1={0} x2={1} y1={0} y2={0}>
        <stop offset="0%" stopColor="#16a3ff" />
        <stop offset="100%" stopColor="#6ddead" />
      </linearGradient>
      <linearGradient id="linear-gradient-normal" x1={0} x2={0} y1={1} y2={0}>
        <stop offset="0%" stopColor="rgba(216,216,216,0.00)" />
        <stop offset="100%" stopColor="#B5C4D1" />
      </linearGradient>
      <linearGradient
        id="linear-gradient-blue-white"
        x1={0}
        x2={0}
        y1={1}
        y2={0}
      >
        <stop offset="0%" stopColor="rgba(216,216,216,0.00)" />
        <stop offset="100%" stopColor="#5097FC" />
      </linearGradient>
      <linearGradient id="linear-gradient-dark" x1={0} x2={0} y1={1} y2={0}>
        <stop offset="0%" stopColor="#5A6CF3" />
        <stop offset="100%" stopColor="#00F0FF" />
      </linearGradient>
      <linearGradient id="linear-gradient-colorful" x1={0} x2={0} y1={1} y2={0}>
        <stop offset="0%" stopColor="rgba(216,216,216,0.00)" />
        <stop offset="100%" stopColor="#FFEE17" />
      </linearGradient>
      <linearGradient id="linear-gradient-morandi" x1={0} x2={0} y1={1} y2={0}>
        <stop offset="0%" stopColor="rgba(216,216,216,0.00)" />
        <stop offset="100%" stopColor="#B5ABA1" />
      </linearGradient>
      {/* x轴 */}
      {size === 'medium' ? (
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
                  {themeType === 'dark' ?
                    <text x={x} y={20} fontSize={12} textAnchor={'middle'} fill={'#ffffff'}>
                      {d.x}
                    </text>
                    :
                    <text x={x} y={20} fontSize={12} textAnchor={'middle'}>
                      {d.x}
                    </text>
                    }
                </g>
              );
            })}
          </g>
        </g>
      ) : (
        ''
      )}

      {/* y轴 */}
      {/*<g
        className="y-axis"
        transform={`translate(${margin.left},${margin.top})`}
      >
         <line x1={0} y1={0} x2={0} y2={chartHeight} stroke="#EDEEF2" />

        <g className="tick">
          {yScale.ticks(1).map((d, i) => {
            let y = yScale(d);

            return (
              <g key={i} transform={`translate(0, ${y})`}>
                <line x1={0} x2={chartWidth} y1={0} y2={0} stroke={"#EDEEF2"} strokeWidth={pxToView(3) as number} />
                <text
                  x={pxToView(11) as number}
                  y={-pxToView(25) as number}
                  fontSize={pxToView(36) as number}
                  fill="#B5C4D1"
                  textAnchor={"end"}
                >
                  {d}
                </text>
              </g>
            );
          })}
        </g>
      </g>*/}

      {/* 折线 */}
      {themeType === 'normal' ? (
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path
            d={line(value)}
            stroke={'#B5C4D1'}
            fill="none"
            strokeWidth={3}
          />
          <path
            d={area(value)}
            stroke="none"
            fill="url(#linear-gradient-normal)"
          />
          {size === 'medium'
            ? value.map((d, i) => {
                const x = xScale(d.x);
                const y = yScale(d.y);

                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={pxToView(12.5) as number}
                      fill={'#ffffff'}
                      stroke="#0F0F0F"
                      strokeWidth="5"
                    ></circle>
                  </g>
                );
              })
            : ''}
        </g>
      ) : themeType === 'blueWhite' ? (
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path
            d={line(value)}
            stroke={'#006AFC'}
            fill="none"
            strokeWidth={3}
          />
          <path
            d={area(value)}
            stroke="none"
            fill="url(#linear-gradient-blue-white)"
          />
          {size === 'medium'
            ? value.map((d, i) => {
                const x = xScale(d.x);
                const y = yScale(d.y);

                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={pxToView(12.5) as number}
                      fill={'#006AFC'}
                      stroke="#ffffff"
                      strokeWidth="5"
                    ></circle>
                  </g>
                );
              })
            : ''}
        </g>
      ) : themeType === 'dark' ? (
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path
            d={line(value)}
            stroke={'#04EAFF'}
            fill="none"
            strokeWidth={3}
          />
          <path
            d={area(value)}
            stroke="none"
            fill="url(#linear-gradient-dark)"
          />
          {size === 'medium'
            ? value.map((d, i) => {
                const x = xScale(d.x);
                const y = yScale(d.y);

                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={pxToView(12.5) as number}
                      fill={'#04EAFF'}
                      stroke="#ffffff"
                      strokeWidth="5"
                    ></circle>
                  </g>
                );
              })
            : ''}
        </g>
      ) : themeType === 'colorful' ? (
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path
            d={line(value)}
            stroke={'#FFEE17'}
            fill="none"
            strokeWidth={3}
          />
          <path
            d={area(value)}
            stroke="none"
            fill="url(#linear-gradient-colorful)"
          />
          {size === 'medium'
            ? value.map((d, i) => {
                const x = xScale(d.x);
                const y = yScale(d.y);

                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={pxToView(12.5) as number}
                      fill={'#FFEE17'}
                      stroke="#ffffff"
                      strokeWidth="5"
                    ></circle>
                  </g>
                );
              })
            : ''}
        </g>
      ) : (
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <path
            d={line(value)}
            stroke={'#B5ABA1'}
            fill="none"
            strokeWidth={3}
          />
          <path
            d={area(value)}
            stroke="none"
            fill="url(#linear-gradient-morandi)"
          />
          {size === 'medium'
            ? value.map((d, i) => {
                const x = xScale(d.x);
                const y = yScale(d.y);

                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={pxToView(12.5) as number}
                      fill={'#B5ABA1'}
                      stroke="#ffffff"
                      strokeWidth="5"
                    ></circle>
                  </g>
                );
              })
            : ''}
        </g>
      )}
    </svg>
  );
}
