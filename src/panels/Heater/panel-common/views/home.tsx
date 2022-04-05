import React from 'react';
import HeaterDashboard from '@components/business/round-dashboard/heater-dashboard';
import { TopNav } from '../components/top-nav';
import { ContentArea } from '../components/content-area';
import { ControlArea } from '../components/control-area';
import { ToolsBar } from '../components/tools-bar';
import { DeviceContext } from '../deviceContext';
import { getThemeType } from '@libs/theme';
import './home.less';

export function Home() {
  const themeType = getThemeType();

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="home-container">
          {/* 童锁 */}
          <div className="morandi-header">
            <TopNav status={deviceData.child_lock || 0} powerStatus={deviceData.power_switch || 0}/>
          </div>
          {themeType === 'normal' ? (
            <>
              <HeaterDashboard
                value={
                  deviceData.unit_convert
                    ? deviceData.current_c_temp
                      ? deviceData.current_c_temp
                      : 0
                    : deviceData.current_f_temp
                      ? deviceData.current_f_temp
                      : 0
                }
                dashboardStatus={
                  deviceData.power_switch ? 'initiate' : 'shutdown'
                }
              />
              {/* 电源控制区域 */}
              <ControlArea status={1} />
              <ToolsBar />
              {/* 内容区域 */}
              <ContentArea />
            </>
          ) : null}

          {themeType === 'blueWhite' ? (
            <>
              <HeaterDashboard
                value={
                  deviceData.unit_convert
                    ? deviceData.current_c_temp
                      ? deviceData.current_c_temp
                      : 0
                    : deviceData.current_f_temp
                      ? deviceData.current_f_temp
                      : 0
                }
                dashboardStatus={
                  deviceData.power_switch ? 'initiate' : 'shutdown'
                }
              />
              {/* 电源控制区域 */}
              <ControlArea status={1} />
              <ToolsBar />
              {/* 内容区域 */}
              <ContentArea />
            </>
          ) : null}

          {themeType === 'dark' ? (
            <>
              <HeaterDashboard
                value={
                  deviceData.unit_convert
                    ? deviceData.current_c_temp
                      ? deviceData.current_c_temp
                      : 0
                    : deviceData.current_f_temp
                      ? deviceData.current_f_temp
                      : 0
                }
                dashboardStatus={
                  deviceData.power_switch ? 'initiate' : 'shutdown'
                }
              />
              {/* 电源控制区域 */}
              <ControlArea status={1} />
              {/* 内容区域 */}
              <ContentArea />
              <ToolsBar />
            </>
          ) : null}

          {themeType === 'colorful' ? (
            <>
              <HeaterDashboard
                value={
                  deviceData.unit_convert
                    ? deviceData.current_c_temp
                      ? deviceData.current_c_temp
                      : 0
                    : deviceData.current_f_temp
                      ? deviceData.current_f_temp
                      : 0
                }
                dashboardStatus={
                  deviceData.power_switch ? 'initiate' : 'shutdown'
                }
              />
              {/* 电源控制区域 */}
              <ControlArea status={1} />
              {/* 内容区域 */}
              <ContentArea />
              <ToolsBar />
            </>
          ) : null}

          {themeType === 'morandi' ? (
            <>
              <div className="morandi-middle">
                <div className="dashboard-wrap">
                  <HeaterDashboard
                    value={
                      deviceData.unit_convert
                        ? deviceData.current_c_temp
                          ? deviceData.current_c_temp
                          : 0
                        : deviceData.current_f_temp
                          ? deviceData.current_f_temp
                          : 0
                    }
                    dashboardStatus={
                      deviceData.power_switch ? 'initiate' : 'shutdown'
                    }
                  />
                </div>
                {/* 电源控制区域 */}
                <ControlArea status={1} />
                {/* 内容区域 */}
                <ContentArea />
              </div>
              <ToolsBar />
            </>
          ) : null}
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
