import React, { useState } from 'react';
import { RoundDashboard } from '../components/round-dashboard';
import { SvgIcon } from '@/components/common/icon';
import { CurrentSkinProps } from './SkinProps';

import classNames from 'classnames';
import './style.less';

import { getThemeType } from '@/business';
const themeType = getThemeType();

interface dashboardProps {
  value: number;
  dashboardStatus: string;
}
const HeaterDashboard: React.FC<dashboardProps> = props => {
  const { value, dashboardStatus } = props;

  const skinProps = (CurrentSkinProps as any)[dashboardStatus];

  const [number, setNumber] = useState(value);

  const handleClick = () => {
    setNumber(number + 1);
  };

  // 描述信息 关机/开机
  const renderDesWord = (dashboardStatus: string) => {
    return dashboardStatus === 'shutdown' ? (
      <div className="shutdown">已关机</div>
    ) : (
      <div className="initiate">
        <SvgIcon name="icon-lock-close" color="red" width={75} height={84} />
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
      <RoundDashboard
        width={714}
        height={714}
        step={2}
        isOuterCicle={true}
        scaleIsGradient={false}
        businessType="Heater"
        {...skinProps}
        {...props}
      />
      {renderDesWord(dashboardStatus)}
    </div>
  );
};

export default HeaterDashboard;
