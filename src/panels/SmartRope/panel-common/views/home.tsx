/**
 * 首页
 */
import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Block } from '@components/layout';
import { Battery, Bluetooth } from '@components/business';
import { TrainingMode } from '../components/traningMode';
import { TrainingData } from '../components/trainingData';
import { getThemeType } from '@libs/theme';
import { ThemeType } from '@libs/global';
import { SkinProps } from '../skinProps';
import './home.less';

export function Home() {
  const theme: ThemeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[theme];

  const renderHeader = () => {
    switch (theme) {
      case 'normal':
        return (
          <header>
            {/* 蓝牙模块 */}
            <Bluetooth />
            {/* 电源模块 */}
            <Battery
              isShowPercent={false}
              isShowTip={false}
              value={sdk.deviceData.battery_state}
              {...CurrentSkinProps.homeBattery}
            />
          </header>
        );
      case 'blueWhite':
        return (
          <header>
            {/* 蓝牙模块 */}
            <Bluetooth />
            {/* 电源模块 */}
            <Battery
              isShowPercent={false}
              isShowTip={false}
              value={sdk.deviceData.battery_state || 50}
              {...CurrentSkinProps.homeBattery}
            />
          </header>
        );
      case 'dark':
        return (
          <header>
            {/* 电源模块 */}
            <Battery
              isShowPercent={false}
              isShowTip={false}
              value={sdk.deviceData.battery_state}
              {...CurrentSkinProps.homeBattery}
            />
            {/* 蓝牙模块 */}
            <Bluetooth />
          </header>
        );
      case 'colorful':
        return (
          <header>
            {/* 蓝牙模块 */}
            <Bluetooth />
            {/* 电源模块 */}
            <Battery
              isShowPercent={false}
              isShowTip={false}
              value={sdk.deviceData.battery_state}
              {...CurrentSkinProps.homeBattery}
            />
          </header>
        );
      case 'morandi':
        return (
          <header>
            {/* 蓝牙模块 */}
            <Bluetooth />
            {/* 电源模块 */}
            <Battery
              isShowPercent={false}
              isShowTip={false}
              value={sdk.deviceData.battery_state}
              {...CurrentSkinProps.homeBattery}
            />
          </header>
        );
    }
  };


  return (
    <main className="home-container">
      {(theme === 'blueWhite' || theme === 'dark' || theme === 'colorful')

        && <div className="home-middle">
          {/* 蓝牙、电池电量 */}
          {renderHeader()}

          <section className="home-body">
            <div className="body-image">
              <div className="image-map"></div>
            </div>

            <Block className="daily-target-float">
              <p>今日目标</p>
              <span>
                {(sdk.deviceData.current_count / sdk.deviceData.target_count) * 100 || 0}<i>%</i>
              </span>
            </Block>
          </section>
        </div>
      }

      {(theme === 'normal' || theme === 'morandi')
        && <>
          {/* 蓝牙、电池电量 */}
          {renderHeader()}

          <section className="home-body">
            <div className="body-image">
              <div className="image-map"></div>
            </div>

            <Block className="daily-target-float">
              <p>今日目标</p>
              <span>
                {(sdk.deviceData.current_count / sdk.deviceData.target_count) * 100 || 0}<i>%</i>
              </span>
            </Block>

            {/* 底部数据统计部分 */}
            {theme === 'normal' && <TrainingData
              title="今日数据"
              totalCount={sdk.deviceData.current_count || 0}
              titalTime={sdk.deviceData.current_time || 0}
              totalCalories={sdk.deviceData.current_calories || 0}
            />}

            <div className="footer">
              <TrainingMode layoutMode={CurrentSkinProps.layoutMode} />
            </div>

          </section>
        </>
      }

      {/* 文字说明 */}
      {theme !== 'normal'
        && <div className="tips">
          <p>暂无数据</p>
          <p>现在开始运动吧</p>
        </div>
      }

      {(theme === 'blueWhite' || theme === 'dark' || theme === 'colorful')
        && <div className="footer">
          <TrainingMode layoutMode={CurrentSkinProps.layoutMode} />
        </div>
      }
    </main>
  );
}
