import React, { useState } from 'react';
import classNames from 'classnames';
import { RoundDashboard } from '../components/round-dashboard';
import { RingDashboard } from './ring-dashboard';
import { ScaleDial } from '../components/scale-dial';
import { CircleDial } from '../components/circle-dial';
import { SvgIcon } from '@components/common/icon';
import { getThemeType } from '@libs/theme';
import { SkinProps } from './skin-props';
import './style.less';

interface dashboardProps {
  value: number;
  dashboardStatus: string;
  unit: string;
  min: number;
  max: number;
  fahrenheitStatus: boolean;
}

const HeaterDashboard: React.FC<dashboardProps> = (props) => {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const { value, dashboardStatus, unit, min, max, fahrenheitStatus } = props;

  const skinProps = (CurrentSkinProps as any)[dashboardStatus];

  // 描述信息 关机/开机
  const renderDesWord = (dashboardStatus: string) => (
      <div className={classNames(dashboardStatus)}>
        <SvgIcon
          className="warmth"
          name="icon-heater-warmth"
          {...skinProps.warmth}
        />
        <div className="number">
          <strong>{fahrenheitStatus ? value + 32 : value}</strong>
          <span>{unit}</span>
        </div>
        <div className="title">温度调节</div>
      </div>
  );

  return (
    <div className={classNames('heater-dashboard-wrap', themeType)}>
      {themeType === 'normal' ? (
        <RingDashboard
          width={760}
          height={760}
          step={3}
          isOuterCicle={true}
          scaleIsGradient={false}
          businessType="Heater"
          minValue={min}
          maxValue={max}
          {...skinProps}
          {...props}
          currentColor={dashboardStatus === 'shutdown' ? '#C9D4DD' : '#0F0F0F'}
        />
      ) : null}
      {themeType === 'blueWhite' || themeType === 'dark' ? (
        <CircleDial
          width={714}
          height={714}
          step={3}
          businessType="Heater"
          minValue={min}
          maxValue={max}
          {...skinProps}
          {...props}
        />
      ) : null}
      {themeType === 'colorful' || themeType === 'morandi' ? (
        <ScaleDial
          width={750}
          height={750}
          step={3}
          businessType="Heater"
          minValue={min}
          maxValue={max}
          {...skinProps}
          {...props}
        />
      ) : null}

      {renderDesWord(dashboardStatus)}
    </div>
  );
};

export default HeaterDashboard;
