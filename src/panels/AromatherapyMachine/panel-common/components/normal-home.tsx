import React, { useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { ScrollView } from '@components/base';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import { Slider } from 'antd-mobile';
import { onControlDevice } from '@hooks/useDeviceData';
import { DeviceContext } from '../deviceContext';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';
import '../components/normal-home.less';

export function NormalHome() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const history = useHistory();
  const [currentMode, setCurrentMode] = useState('middle');

  const imageSrc = () => {
    return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/aromatherapy_machine/aromatherapy_machine.png';
  };
  const iconColor = (powerStatus: number, active: number) => {
    if (powerStatus === 1) {
      if (active === 1) {
        return '#FFFFFF';
      } else {
        return '#0F0F0F';
      }
    } else {
      return '#B5C4D1';
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
            deviceData.power_switch === 0 ? 'close' : ''
          )}
        >
          <ScrollView height="100vh" scrollY>
            <div className="inner">
              {/* 产品图 */}
              <div className="product-image-wrap">
                <div className="fumes"></div>
                <img className="product-image" src={imageSrc()}></img>
                <div className="shadow"></div>
              </div>
              {/* 更多按钮 */}
              <div className="more" onClick={handleMore}>
                <SvgIcon
                  className="icon-more"
                  name="icon-more-cicle"
                  {...CurrentSkinProps.more}
                />
              </div>

              {/* 控制区 */}
              <div className="control-area">
                <div className="product-control">
                  <Block
                    className={classNames(
                      'setting-button',
                      (deviceData.power_switch === 1 && deviceData.spray_switch === 1) ? 'selected' : 'unselected'
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
                      className="control-icon icon-spray"
                      name="icon-spray"
                      color={iconColor(
                        deviceData.power_switch,
                        deviceData.spray_switch
                      )}
                    />
                    <p className="control-label">喷雾开关</p>
                  </Block>
                  <div
                    className={classNames(
                      'control-power',
                      (deviceData.power_switch == 1 && deviceData.power_switch === 1) ? 'power-open' : ''
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
                      name="icon-power"
                      {...CurrentSkinProps.switch}
                    />
                  </div>
                  <Block
                    className={classNames(
                      'setting-button',
                      (deviceData.power_switch === 1 && deviceData.light_switch === 1) ? 'selected' : 'unselected'
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
                      className="control-icon icon-light"
                      name="icon-lamplight"
                      color={iconColor(
                        deviceData.power_switch,
                        deviceData.light_switch
                      )}
                    />
                    <p className="control-label">灯光</p>
                  </Block>
                </div>
              </div>
            </div>

            <div className="decoration-block">
              <div className="decoration-top">
                <ul className="countdown-slider-tips">
                  <li className="item">
                    <span className="label">小雾量</span>
                    {currentMode === 'small' ? (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        color={
                          deviceData.power_switch === 1 ? '#0F0F0F' : '#B5C4D1'
                        }
                      />
                    ) : null}
                  </li>
                  <li className="item">
                    <span className="label">中雾量</span>
                    {currentMode === 'middle' ? (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        color={
                          deviceData.power_switch === 1 ? '#0F0F0F' : '#B5C4D1'
                        }
                      />
                    ) : null}
                  </li>
                  <li className="item">
                    <span className="label">大雾量</span>
                    {currentMode === 'large' ? (
                      <SvgIcon
                        className="icon-arrow-down"
                        name="icon-arrow-down"
                        color={
                          deviceData.power_switch === 1 ? '#0F0F0F' : '#B5C4D1'
                        }
                      />
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
                    let data = 'small';
                    if (value === 0) {
                      data = 'small';
                    } else if (value === 50) {
                      data = 'middle';
                    } else {
                      data = 'large';
                    }
                    setCurrentMode(data);
                    onControlDevice('work_mode', data);
                  }}
                />
              </div>

              <ul className="decoration-bottom">
                <li className="content-item">
                  <p className="word">
                    {deviceData.count_left ? deviceData.count_left : '00:00:00'}
                  </p>
                  <p className="label">倒计时剩余时间</p>
                </li>
                <li className="content-item">
                  <p className="word text">
                    {deviceData.work_mode
                      ? workModeLabel[deviceData.work_mode]
                      : '中雾量'}
                  </p>
                  <p className="label">工作模式</p>
                </li>
              </ul>
            </div>
          </ScrollView>
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
