import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

export const LineChart = (props) => {
  const { xData = [], yData = [] } = { ...props };
  const getOption = () => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: 20,
        bottom: 100,
        left: 60,
        right: 40
      },
      xAxis: {
        type: 'category',
        data: xData,
        axisTick: {
          show: true
        },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: true
        },
        axisLine: {
          show: true
        },
        splitLine: { show: false }
      },
      series: [{
        data: yData,
        type: 'line'
      }]
    }
  }

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ReactEcharts
      width={viewportWidth}
      height={viewportHeight}
      echarts={echarts}
      option={getOption()}
    />
  );
};
