import React from 'react';
import classNames from 'classnames';
import { RoundDashboard } from '../components/round-dashboard';
import { getThemeType } from '@libs/theme';
import { SkinProps } from './SkinProps';
import './style.less';

interface dashboardProps {
  width?: number;
  height?: number;
  value: number;
  defaultValue?: number | undefined;
  valueWater: number; // 水位
  topTitle?: string;
  dashboardStatus: string;
}

const HumidifierDashboard: React.FC<dashboardProps> = (props) => {
  const {
    width,
    height,
    value,
    defaultValue,
    dashboardStatus,
    valueWater = 0,
    topTitle = ' ',
  } = props;

  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];

  const skinProps = (CurrentSkinProps as any)[dashboardStatus];

  const { centerCicle } = skinProps;

  console.log(centerCicle);

  // 描述信息 关机/开机
  const renderDesWord = (dashboardStatus: string) => (dashboardStatus === 'shutdown' ? (
      <div className="shutdown">已关机</div>
  ) : themeType === 'colorful' || themeType === 'morandi' ? (
      <div className="initiate">
        <div className="number">
          <strong>{value}</strong>
          <span>%</span>
        </div>
        <div className="title">湿度设置</div>
        <div className="des">
          <span>当前水位</span>
          <span>｜</span>
          <span>{valueWater} level</span>
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
          <span>{valueWater} level</span>
        </div>
      </div>
  ));

  return (
    <div>
      <div className={classNames('humidifier-dashboard-wrap', `humidifier-dashboard-${themeType}`)}>
        <RoundDashboard
          step={6}
          defaultValue={defaultValue}
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
