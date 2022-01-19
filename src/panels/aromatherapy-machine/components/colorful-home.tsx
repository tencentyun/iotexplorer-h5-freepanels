import React, { useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SvgIcon } from '@/components/common';
import { Block } from '@/components/layout';
import { useDeviceData } from '@/hooks/useDeviceData';
import { onControlDevice } from '@/business';
import { DeviceContext } from '../deviceContext';
import { CurrentSkinProps } from '../skinProps';
import '../components/colorful-home.less';

export function ColorfulHome() {
  const history = useHistory();
  const [currentMode, setCurrentMode] = useState('middle');

  const imageSrc = () => {
    return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/aromatherapy_machine/aromatherapy_machine.png';
  };

  const iconColor = (active: number, key: string) => {
    if (active === 1) {
      if (key === 'spray') {
        return CurrentSkinProps.spray;
      } else {
        return CurrentSkinProps.light;
      }
    } else {
      return { color: '#B5C4D1' };
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
          <div className="decoration-block">
            <ul className="decoration-bottom">
              <li
                className="content-item"
                onClick={() => {
                  onControlDevice(
                    'power_switch',
                    Number(!deviceData.power_switch)
                  );
                }}
              >
                <div
                  className={classNames(
                    deviceData.power_switch === 1
                      ? 'icon-power-active'
                      : 'icon-power'
                  )}
                ></div>
              </li>
              <li
                className="content-item"
                onClick={() => {
                  if (deviceData.power_switch === 0) return;
                  onControlDevice(
                    'spray_switch',
                    Number(!deviceData.spray_switch)
                  );
                }}
              >
                <SvgIcon
                  className="icon-more"
                  name="icon-spray"
                  {...iconColor(deviceData.spray_switch, 'spray')}
                />
              </li>
              <li
                className="content-item"
                onClick={() => {
                  if (deviceData.power_switch === 0) return;
                  onControlDevice(
                    'light_switch',
                    Number(!deviceData.light_switch)
                  );
                }}
              >
                <SvgIcon
                  className="icon-more"
                  name="icon-lamplight"
                  {...iconColor(deviceData.light_switch, 'light')}
                />
              </li>
              <li
                className="content-item"
                onClick={() => {
                  handleMore();
                }}
              >
                <SvgIcon
                  className="icon-more"
                  name="icon-more-cicle"
                  {...CurrentSkinProps.more}
                />
              </li>
            </ul>
          </div>
          {/* 产品图 */}
          <div className="product-image-wrap">
            <div className="product-image-left">
              <div className="fumes"></div>
              <img className="product-image" src={imageSrc()}></img>
              <div className="shadow"></div>
            </div>
            <div className="countdown-slider-wrap">
              <ul
                className={classNames(
                  'countdown-slider-tips',
                  deviceData.power_switch === 0 ? 'default' : ''
                )}
              >
                <li
                  className={classNames(
                    currentMode === 'large' ? 'selected' : ''
                  )}
                  onClick={() => {
                    if (deviceData.power_switch === 0) return;
                    setCurrentMode('large');
                    onControlDevice('work_mode', 'large');
                  }}
                >
                  <span className="label">大雾量</span>
                  {currentMode === 'large' ? (
                    <SvgIcon
                      className="icon-arrow-down"
                      name="icon-arrow-down"
                    />
                  ) : null}
                </li>
                <li
                  className={classNames(
                    currentMode === 'middle' || currentMode === 'large'
                      ? 'selected'
                      : ''
                  )}
                  onClick={() => {
                    if (deviceData.power_switch === 0) return;
                    setCurrentMode('middle');
                    onControlDevice('work_mode', 'middle');
                  }}
                >
                  <span className="label">中雾量</span>
                  {currentMode === 'middle' ? (
                    <SvgIcon
                      className="icon-arrow-down"
                      name="icon-arrow-down"
                    />
                  ) : null}
                </li>
                <li
                  className="selected"
                  onClick={() => {
                    if (deviceData.power_switch === 0) return;
                    setCurrentMode('small');
                    onControlDevice('work_mode', 'small');
                  }}
                >
                  <span className="label">小雾量</span>
                  {currentMode === 'small' ? (
                    <SvgIcon
                      className="icon-arrow-down"
                      name="icon-arrow-down"
                    />
                  ) : null}
                </li>
              </ul>
            </div>
          </div>

          {/* 控制区 */}
          <div className="product-control">
            <Block
              className={classNames(
                'control-block',
                deviceData.power_switch === 1 ? 'blue' : ''
              )}
            >
              <div className="top">
                <p className="label">
                  倒计时
                  <br />
                  剩余时间
                </p>
                <SvgIcon
                  className="icon"
                  name="icon-clock"
                  color={deviceData.power_switch === 1 ? '#ffffff' : '#B4C3D0'}
                />
              </div>
              <p className="word">
                {deviceData.count_left ? deviceData.count_left : '00:00:00'}
              </p>
            </Block>
            <Block
              className={classNames(
                'control-block',
                deviceData.power_switch === 1 ? 'yellow' : ''
              )}
            >
              <div className="top">
                <p className="label">工作模式</p>
                <SvgIcon
                  className="icon"
                  name="icon-more"
                  color={deviceData.power_switch === 1 ? '#ffffff' : '#B4C3D0'}
                />
              </div>
              <p className="word text">
                {deviceData.work_mode
                  ? workModeLabel[deviceData.work_mode]
                  : '中雾量'}
              </p>
            </Block>
          </div>
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
