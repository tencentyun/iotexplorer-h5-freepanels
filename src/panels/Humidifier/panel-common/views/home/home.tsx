import React from 'react';
import classNames from 'classnames';
import { ToolsBar } from './components/tools-bar';
import { Detail } from './components/detail/detail';
import { DeviceSateContext } from '../../deviceStateContext';
import HumidifierDashboard from '@components/business/round-dashboard/humidifier-dashboard';
import './home.less';

export function Home() {
  const enumWorkMode: any = {
    natural_evaporation: '自然蒸发',
    heating_evaporation: '加热蒸发',
    ultrasonic: '超声波蒸发',
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article
          className={classNames(
            'home',
            deviceData.power_switch !== 1 && 'power-off',
          )}
        >
          {/* 工作模式*/}
          <h3 className={classNames('title', 'text-align-center')}>
            <strong className={classNames('font_48')}>
              {enumWorkMode[deviceData.work_mode]}
            </strong>
          </h3>
          {/* 仪表盘*/}
          <section className={classNames('dashboard')}>
            <HumidifierDashboard
              width={760}
              height={760}
              value={deviceData.set_humidity || 0}
              valueWater={deviceData.current_level}
              topTitle={enumWorkMode[deviceData.work_mode]}
              dashboardStatus={
                deviceData.power_switch === 1 ? 'initiate' : 'shutdown'
              }
            />
          </section>
          {/* 工具栏*/}
          <ToolsBar />
          {/* 详情区域*/}
          <Detail />
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
