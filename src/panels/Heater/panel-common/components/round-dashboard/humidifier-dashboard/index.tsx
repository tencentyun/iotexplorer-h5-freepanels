import React from 'react';
import { RoundDashboard } from '../components/round-dashboard';
import { getThemeType } from '@libs/theme';
import { SkinProps } from './SkinProps';
import classNames from 'classnames';
import './style.less';

interface dashboardProps {
  width: number;
  height: number;
  value: number;
  dashboardStatus: string;
}

const HumidifierDashboard: React.FC<dashboardProps> = props => {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];

  const { width, height, value, dashboardStatus } = props;

  const skinProps = (CurrentSkinProps as any)[dashboardStatus];

  const { centerCicle } = skinProps;

  console.log(centerCicle);

  // 描述信息 关机/开机
  const renderDesWord = (dashboardStatus: string) => {
    return dashboardStatus === 'shutdown' ? (
      <div className="shutdown">已关机</div>
    ) : themeType === 'colorful' || themeType === 'morandi' ? (
      <div className="initiate">
        <div className="top-title">超声波蒸发</div>
        <div className="number">
          <strong>{value}</strong>
          <span>%</span>
        </div>
        <div className="title">湿度设置</div>
        <div className="des">
          <span>当前水位</span>
          <span>｜</span>
          <span>1 level</span>
        </div>
      </div>
    ) : (
      <div className="initiate">
        <div className="title">湿度设置</div>
        <div className="number">
          <strong>{value}</strong>
          <span>%</span>
        </div>
        <div className="des">
          <span>当前水位</span>
          <span>｜</span>
          <span>1 level</span>
        </div>
      </div>
    );
  };

  console.log(skinProps, '====');

  return (
    <div>
      <div className={classNames('humidifier-dashboard-wrap', themeType)}>
        <RoundDashboard
          step={6}
          isOuterCicle={false}
          businessType="Humidifier"
          {...skinProps}
          {...props}
        />
        {renderDesWord(dashboardStatus)}
      </div>
    </div>
  );
};

export default HumidifierDashboard;
