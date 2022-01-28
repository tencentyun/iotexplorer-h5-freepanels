import React, { useState } from 'react';
import classNames from 'classnames';
import { RoundDashboard } from '../components/round-dashboard';
import { RingDashboard } from '../components/ring-dashboard';
import { ScaleDial } from '../components/scale-dial';
import { CircleDial } from '../components/circle-dial';
import { SvgIcon } from '@components/common/icon';
import { getThemeType } from '@libs/theme';
import { SkinProps } from './skinProps';
import './style.less';

interface dashboardProps {
  value: number;
  dashboardStatus: string;
}

const HeaterDashboard: React.FC<dashboardProps> = props => {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const { value, dashboardStatus } = props;

  const skinProps = (CurrentSkinProps as any)[dashboardStatus];

  const [number, setNumber] = useState(value);

  const handleClick = () => {
    setNumber(number + 1);
  };

  // 描述信息 关机/开机
  const renderDesWord = (dashboardStatus: string) => {
    return (
      <div className={classNames(dashboardStatus)}>
        <SvgIcon
          className="warmth"
          name="icon-heater-warmth"
          {...skinProps.warmth}
        />
        <div className="number">
          <strong>{number}</strong>
          <span>°C</span>
        </div>
        <div className="title">当前温度</div>
      </div>
    );
  };

  return (
    <div className={classNames('heater-dashboard-wrap', themeType)}>
      {themeType === 'normal' ? (
        <RingDashboard
          width={714}
          height={714}
          step={2}
          isOuterCicle={true}
          scaleIsGradient={false}
          businessType="Heater"
          {...skinProps}
          {...props}
        />
      ) : null}
      {themeType === 'blueWhite' || themeType === 'dark' ? (
        <CircleDial
          width={714}
          height={714}
          step={3}
          businessType="Heater"
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
          {...skinProps}
          {...props}
        />
      ) : null}

      {renderDesWord(dashboardStatus)}
    </div>
  );
};

export default HeaterDashboard;