import React from 'react';
import classNames from 'classnames';
import { RingDashboard } from '../components/ring-dashboard';
import { RoundDashboard } from '../components/round-dashboard';
import { CircleDial } from '../components/circle-dial';
import { getThemeType } from '@libs/theme';
import { SkinProps } from './SkinProps';

import './style.less';

interface dashboardProps {
  value: number;
  dashboardStatus: string;
}

const ThermostatDashboard: React.FC<dashboardProps> = props => {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];

  const { value, dashboardStatus } = props;

  const skinProps = (CurrentSkinProps as any)[dashboardStatus];

  // 描述信息 关机/开机
  const renderDesWord = (dashboardStatus: string) => {
    return (
      <div className="dashboard-content">
        {dashboardStatus === 'shutdown' ? (
          <div className="word font_48">已关机</div>
        ) : (
          <div className="triangle"></div>
        )}
        <div
          className={classNames(
            'number',
            dashboardStatus === 'shutdown' ? '' : 'pt'
          )}
        >
          {value}°C
        </div>
        <div className="title font_48">当前温度</div>
        <div className="small-number font_48">{value}°C</div>
      </div>
    );
  };

  return (
    <div className={classNames('thermostat-dashboard-wrap', themeType)}>
      {themeType === 'normal' ? (
        <RingDashboard
          width={714}
          height={714}
          step={2}
          isOuterCicle={true}
          scaleIsGradient={false}
          businessType="thermostat"
          {...skinProps}
          {...props}
        />
      ) : null}
      {themeType === 'blueWhite' || themeType === 'dark' ? (
        <CircleDial
          width={714}
          height={714}
          step={3}
          businessType="thermostat"
          {...skinProps}
          {...props}
        />
      ) : null}
      {themeType === 'colorful' || themeType === 'morandi' ? (
        <RoundDashboard
          width={856}
          height={856}
          radius={428}
          step={6}
          isOuterCicle={false}
          businessType="thermostat"
          {...skinProps}
          {...props}
        />
      ) : null}

      {renderDesWord(dashboardStatus)}
    </div>
  );
};

export default ThermostatDashboard;
