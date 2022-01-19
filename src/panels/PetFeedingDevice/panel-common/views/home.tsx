import React from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Switch } from '@components/base';
import { Battery, NumberSlider } from '@components/business';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import { RingDashboard } from '../components/ring-dashboard';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { CurrentSkinProps } from '../skinProps';
import { DeviceContext } from '../deviceContext';
import dayjs from 'dayjs';
import './home.less';

const themeType = getThemeType();

export function Home() {
  const history = useHistory();
  let numberFeed = 3;

  const feedStateLabel: any = {
    standby: '准备中',
    feeding: '喂食中',
    done: '结束'
  };

  const formatTime = (time: string | number) => {
    const date = dayjs(Number(time));
    return date.format('YYYY.MM.DD HH:mm');
  };

  const currentColor = (status: number | string, key: string) => {
    if (themeType === 'morandi') {
      if (status == 1) {
        return CurrentSkinProps[key];
      } else {
        return { color: '#B5C4D1' };
      }
    } else {
      return CurrentSkinProps[key];
    }
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <div className="pet-device-view">
          <div className="header-wrap">
            {themeType !== 'morandi' ? (
              <header>
                <div className="power-switch">
                  <Switch
                    name="power"
                    checked={Boolean(deviceData.power_switch)}
                    theme={themeType}
                    onChange={() => {
                      onControlDevice(
                        'power_switch',
                        Number(!deviceData.power_switch)
                      );
                    }}
                  />
                </div>
                <Battery
                  value={deviceData.battery_percentage}
                  isShowTip={false}
                  isShowPercent={false}
                  {...CurrentSkinProps.battery}
                />
              </header>
            ) : (
              <header>
                <Battery
                  value={deviceData.battery_percentage}
                  isShowTip={false}
                  isShowPercent={false}
                  {...CurrentSkinProps.battery}
                />
              </header>
            )}

            <div className="view-container">
              {themeType !== 'dark' ? (
                <div className="device-info">
                  <h2 className="device-status font_line_3">
                    {deviceData.feed_state
                      ? feedStateLabel[deviceData.feed_state]
                      : '待机中'}
                  </h2>
                  <p className="font_line_2">余粮剩余{50}%</p>
                  <img
                    className="device-img"
                    src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/pet/pen.png"
                  />
                </div>
              ) : (
                <RingDashboard
                  className="device-dashbord"
                  width={764}
                  height={764}
                  radius={380}
                  value={50}
                >
                  <div className="device-info">
                    <div className="next-plan-desc font_line_2">
                      <p>下次喂食时间</p>
                      <p>
                        {deviceData.meet_plan
                          ? formatTime(deviceData.meet_plan?.time)
                          : '暂无数据'}
                      </p>
                    </div>
                    <img
                      className="device-img"
                      src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/pet/pen.png"
                    />
                    <h2 className="device-status">
                      {deviceData.feed_state
                        ? feedStateLabel[deviceData.feed_state]
                        : '待机中'}
                    </h2>
                    <p className="food-status">余粮剩余{50}%</p>
                  </div>
                </RingDashboard>
              )}

              {themeType !== 'dark' && themeType !== 'morandi' ? (
                <div className="next-plan-desc font_line_2">
                  <p>
                    下次喂食:{' '}
                    {deviceData.meet_plan
                      ? formatTime(deviceData.meet_plan?.time)
                      : '暂无数据'}
                  </p>
                  <p>
                    喂食
                    {deviceData.meet_plan ? deviceData.meet_plan?.portion : '0'}
                    份
                  </p>
                </div>
              ) : null}

              {/* 导航按钮 */}
              <div className="page-route-list">
                <Block
                  className="button-block"
                  onClick={() => history.push('/plan')}
                >
                  {themeType !== 'morandi' && (
                    <div className="button-icon icon-record"></div>
                  )}
                  {themeType === 'morandi' && (
                    <div
                      className={classNames(
                        'button-icon',
                        deviceData.power_switch === 1
                          ? 'icon-record'
                          : 'icon-record-default'
                      )}
                    ></div>
                  )}
                  <p className="button-name">喂食计划</p>
                </Block>
                <Block
                  className="button-block"
                  onClick={() => history.push('/record')}
                >
                  <SvgIcon
                    className="button-icon"
                    name="icon-feeding-records"
                    {...currentColor(deviceData.power_switch, 'record')}
                  />
                  <p className="button-name">喂食记录</p>
                </Block>
                <Block
                  className="button-block"
                  onClick={() => history.push('/setting')}
                >
                  <SvgIcon
                    className="button-icon"
                    name="icon-setting"
                    {...currentColor(deviceData.power_switch, 'settings')}
                  />
                  <p className="button-name">设置</p>
                </Block>
              </div>
            </div>
          </div>

          {themeType === 'dark' && (
            <footer>
              <p className="font_line_3 submit-label">喂食份数</p>
              <div className="number-selector">
                <NumberSlider
                  min={1}
                  max={12}
                  defaultValue={deviceData.manual_feed}
                  theme={themeType}
                  disabled={Boolean(deviceData.power_switch)}
                  onChange={(index: number) => {
                    numberFeed = index;
                  }}
                />
              </div>

              <div className="submit-area">
                <div
                  className="submit-button"
                  onClick={() => {
                    if (!deviceData.power_switch) return;
                    onControlDevice('manual_feed', numberFeed);
                  }}
                >
                  快速喂食
                </div>
              </div>
            </footer>
          )}
          {themeType === 'colorful' && (
            <footer>
              <div className="number-selector">
                <NumberSlider
                  min={1}
                  max={12}
                  defaultValue={deviceData.manual_feed}
                  theme={themeType}
                  disabled={Boolean(deviceData.power_switch)}
                  onChange={(index: number) => {
                    numberFeed = index;
                  }}
                />
                <p className="font_line_3 submit-label">喂食份数</p>
              </div>

              <div className="submit-area">
                <div
                  className="submit-button"
                  onClick={() => {
                    if (!deviceData.power_switch) return;
                    onControlDevice('manual_feed', numberFeed);
                  }}
                >
                  快速喂食
                </div>
              </div>
            </footer>
          )}
          {themeType !== 'dark' && themeType !== 'colorful' && (
            <footer>
              <div className="number-selector">
                <NumberSlider
                  min={1}
                  max={12}
                  defaultValue={deviceData.manual_feed}
                  theme={themeType}
                  disabled={Boolean(deviceData.power_switch)}
                  onChange={(index: number) => {
                    numberFeed = index;
                  }}
                />
              </div>

              <div className="submit-area">
                <p className="font_line_3 submit-label">喂食份数</p>
                <div
                  className={classNames(
                    'submit-button',
                    deviceData.power_switch === 1 ? 'submit-active' : ''
                  )}
                  onClick={() => {
                    if (!deviceData.power_switch) return;
                    onControlDevice('manual_feed', numberFeed);
                  }}
                >
                  快速喂食
                </div>
              </div>
            </footer>
          )}
          {themeType === 'morandi' ? (
            <div className="morandi-power-wrap">
              <div
                className="power-switch"
                onClick={() => {
                  onControlDevice(
                    'power_switch',
                    Number(!deviceData.power_switch)
                  );
                }}
              >
                总开关
              </div>
              <div className="next-plan-desc">
                <p>
                  下次喂食:{' '}
                  {deviceData.meet_plan
                    ? formatTime(deviceData.meet_plan?.time)
                    : '暂无数据'}
                </p>
                <p>
                  喂食
                  {deviceData.meet_plan ? deviceData.meet_plan?.portion : '0'}份
                </p>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
