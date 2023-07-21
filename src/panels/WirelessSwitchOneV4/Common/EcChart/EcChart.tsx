import React from 'react';
import { BarChart } from './BarChart';

export const EcChart = ({ xArr, yArr }) => (
    <div className="wireless-switch-chart">
      <BarChart xData={xArr} yData={yArr} />
    </div>
);
