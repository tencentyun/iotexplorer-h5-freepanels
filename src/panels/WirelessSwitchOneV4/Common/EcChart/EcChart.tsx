import React from 'react';
import { BarChart } from './BarChart';

const xData = ['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05', '2023-06-06', '2023-06-07'];
const yData = [820, 932, 901, 934, 1290, 1330, 1320];
export const EcChart = (props) => {
  const { times = [] } = { ...props };
  return (
    <div className="wireless-switch-chart">
      <BarChart xData={xData} yData={yData} />
    </div>
  );
}
