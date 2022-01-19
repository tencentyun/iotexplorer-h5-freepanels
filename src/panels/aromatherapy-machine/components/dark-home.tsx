import React, { useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SvgIcon } from '@/components/common';
import { Block } from '../../../components/layout';
import { Slider } from 'antd-mobile';
// @ts-ignore
import { onControlDevice } from '@/business';
import { useDeviceData } from '@/hooks/useDeviceData';
import { DeviceContext } from '../deviceContext';
import '../components/dark-home.less';

export function DarkHome() {
  const history = useHistory();
  const [workMode, setWorkMode] = useState('middle');

  const imageSrc = () => {
    return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/aromatherapy_machine/aromatherapy_machine.png';
  };

  const iconColor = (active: number) => {
    if (active === 1) {
      return '#F2F7FE';
    } else {
      return '#848895';
    }
  };

  const workModeLabel: any = {
    large: '大雾量',
    middle: '中雾量',
    small: '小雾量'
  };

  const workModeToValue = (label: string) => {
    if (label === 'large') {
      return 100;
    } else if (label === 'small') {
      return 0;
    } else {
      return 50;
    }
  };
  // 更多
  const handleMore = () => {
    history.push('/more');
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <div
          className={classNames(
            'app-container',
            !deviceData.power_switch ? 'close' : ''
          )}
        >
          {/* 顶部 */}
          <div className="product-image-wrap">
            {/* 控制区 */}
            <div className="product-control">
              <Block
                className={classNames(
                  'control-block',
                  deviceData.spray_switch === 1 ? 'selected' : ''
                )}
                onClick={() => {
                  if (deviceData.power_switch === 0) return;
                  onControlDevice(
                    'spray_switch',
                    Number(!deviceData.spray_switch)
                  );
                }}
              >
                <SvgIcon
                  className="icon-spray"
                  name="icon-spray"
                  color={deviceData.power_switch === 1 ? '#F2F7FE' : '#848895'}
                />
                <p className="label">喷雾开关</p>
              </Block>
              <Block
                className={classNames(
                  'control-block',
                  deviceData.light_switch === 1 ? 'selected' : ''
                )}
                onClick={() => {
                  if (deviceData.power_switch === 0) return;
                  onControlDevice(
                    'light_switch',
                    Number(!deviceData.light_switch)
                  );
                }}
              >
                <SvgIcon
                  className="icon-light"
                  name="icon-lamplight"
                  color={deviceData.power_switch === 1 ? '#F2F7FE' : '#848895'}
                />
                <p className="label">灯光</p>
              </Block>
              <Block
                className="control-block"
                onClick={() => {
                  handleMore();
                }}
              >
                <SvgIcon
                  className="icon-more"
                  name="icon-more-cicle"
                  color={deviceData.power_switch === 1 ? '#F2F7FE' : '#848895'}
                />
                <p className="label">更多</p>
              </Block>
            </div>
            {/* 产品图 */}
            <div className="product-image-right">
              <div className="fumes"></div>
              <img className="product-image" src={imageSrc()}></img>
            </div>
          </div>

          <footer className="footer-block">
            <div className="countdown-slider-wrap">
              <ul className="countdown-slider-tips">
                <li className="item">
                  <span className="label">小雾量</span>
                  {workMode === 'small' ? (
                    deviceData.power_switch === 1 ? (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        gradientId="arrow-down"
                        startColor="#00E6FF"
                        endColor="#00B0F7"
                        x1="0%"
                        y1="50%"
                        x2="96.0833961%"
                        y2="50%"
                      />
                    ) : (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        color="#8A8E9B"
                      />
                    )
                  ) : null}
                </li>
                <li className="item">
                  <span className="label">中雾量</span>
                  {workMode === 'middle' ? (
                    deviceData.power_switch === 1 ? (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        gradientId="arrow-down"
                        startColor="#00E6FF"
                        endColor="#00B0F7"
                        x1="0%"
                        y1="50%"
                        x2="96.0833961%"
                        y2="50%"
                      />
                    ) : (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        color="#8A8E9B"
                      />
                    )
                  ) : null}
                </li>
                <li className="item">
                  <span className="label">大雾量</span>
                  {workMode === 'large' ? (
                    deviceData.power_switch === 1 ? (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        gradientId="arrow-down"
                        startColor="#00E6FF"
                        endColor="#00B0F7"
                        x1="0%"
                        y1="50%"
                        x2="96.0833961%"
                        y2="50%"
                      />
                    ) : (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        color="#8A8E9B"
                      />
                    )
                  ) : null}
                </li>
              </ul>
              <Slider
                className="countdown-slider"
                ticks
                step={50}
                defaultValue={workModeToValue(deviceData.work_mode)}
                disabled={deviceData.power_switch === 1 ? false : true}
                onChange={value => {
                  if (value === 0) {
                    setWorkMode('small');
                  } else if (value === 50) {
                    setWorkMode('middle');
                  } else {
                    setWorkMode('large');
                  }
                  onControlDevice('work_mode', workMode);
                }}
              />
            </div>

            <div
              className={classNames(
                'control-power',
                deviceData.power_switch ? 'open' : ''
              )}
              onClick={() => {
                onControlDevice(
                  'power_switch',
                  Number(!deviceData.power_switch)
                );
              }}
            >
              <SvgIcon
                className="icon-power"
                name="icon-arom-power"
                color={deviceData.power_switch === 1 ? '#FFFFFF' : '#222633'}
              />
            </div>

            <div className="decoration-block">
              <ul className="decoration-bottom">
                <li className="content-item top">
                  <p className="word">
                    {deviceData.count_left ? deviceData.count_left : '00:00:00'}
                  </p>
                  <p className="word text">
                    {deviceData.work_mode
                      ? workModeLabel[deviceData.work_mode]
                      : '中雾量'}
                  </p>
                </li>
                <li className="content-item bottom">
                  <p className="label">倒计时剩余时间</p>
                  <p className="label">工作模式</p>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
