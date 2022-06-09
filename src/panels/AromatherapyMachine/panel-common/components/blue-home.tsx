import React, { useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import { Slider } from 'antd-mobile';
import { onControlDevice } from '@hooks/useDeviceData';
import { DeviceContext } from '../deviceContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import '../components/blue-home.less';

export function BlueHome() {
  const history = useHistory();
  const [currentMode, setCurrentMode] = useState('middle');

  const imageSrc = () => 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/aromatherapy_machine/aromatherapy_machine.png';

  const iconColor = (active: number) => {
    if (active === 1) {
      return '#2885FE';
    }
    return '#B5C4D1';
  };

  const workModeLabel: any = {
    large: '大雾量',
    middle: '中雾量',
    small: '小雾量',
  };

  const workModeToValue = (label: string) => {
    if (label === 'large') {
      return 100;
    } if (label === 'small') {
      return 0;
    }
    return 50;
  };
  // 更多
  const handleMore = () => {
    history.push('/more');
  };

  const handleBaseSetting = () => {
    sdk.goDeviceDetailPage();
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <div
          className={classNames(
            'app-container',
            !deviceData.power_switch ? 'close' : '',
          )}
        >
          <div className="settings" onClick={handleBaseSetting}>
            <div className="icon-more"></div>
          </div>
          {/* 产品图 */}
          <div className="product-image-wrap">
            <div className="fumes"></div>
            <img className="product-image" src={imageSrc()}></img>
            <div className="shadow"></div>
          </div>

          {/* 控制区 */}
          <div className="product-control-wrap">
            <div className="product-control">
              <Block className="control-block">
                <div className="top">
                  <p className="label">
                    倒计时
                    <br />
                    剩余时间
                  </p>
                  <div
                    className={classNames(
                      'icon',
                      deviceData.power_switch === 1
                        ? 'icon-clock-active'
                        : 'icon-clock',
                    )}
                  ></div>
                </div>
                <p className="word">
                  {deviceData.count_left ? deviceData.count_left : '00:00:00'}
                </p>
              </Block>
              <Block className="control-block">
                <div className="top">
                  <p className="label">工作模式</p>
                  <SvgIcon
                    className="icon"
                    name="icon-more"
                    color={
                      deviceData.power_switch === 1 ? '#2885FE' : '#A4ADC0'
                    }
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

          <div className="countdown-slider-wrap">
            <ul className="countdown-slider-tips">
              <li className="item">
                <span className="label">小雾量</span>
                {currentMode === 'small' && <span className="icon-cicle" />}
              </li>
              <li className="item">
                <span className="label">中雾量</span>
                {currentMode === 'middle' && <span className="icon-cicle" />}
              </li>
              <li className="item">
                <span className="label">大雾量</span>
                {currentMode === 'large' && <span className="icon-cicle" />}
              </li>
            </ul>
            <Slider
              className="countdown-slider"
              step={50}
              defaultValue={workModeToValue(deviceData.work_mode)}
              disabled={deviceData.power_switch !== 1}
              onChange={(value) => {
                if (value === 0) {
                  setCurrentMode('small');
                } else if (value === 50) {
                  setCurrentMode('middle');
                } else {
                  setCurrentMode('large');
                }
                onControlDevice('work_mode', currentMode);
              }}
            />
          </div>

          <div className="decoration-block">
            <ul className="decoration-bottom">
              <li
                className="content-item"
                onClick={() => {
                  onControlDevice(
                    'power_switch',
                    Number(!deviceData.power_switch),
                  );
                }}
              >
                <div
                  className={classNames(deviceData.power_switch === 1
                    ? 'icon-power-active'
                    : 'icon-power')}
                ></div>
              </li>
              <li
                className="content-item "
                onClick={() => {
                  if (!deviceData.power_switch) return;
                  onControlDevice(
                    'spray_switch',
                    Number(!deviceData.spray_switch),
                  );
                }}
              >
                <SvgIcon
                  className="icon-spray"
                  name="icon-spray"
                  color={iconColor(deviceData.spray_switch)}
                />
              </li>
              <li
                className="content-item"
                onClick={() => {
                  if (!deviceData.power_switch) return;
                  onControlDevice(
                    'light_switch',
                    Number(!deviceData.light_switch),
                  );
                }}
              >
                <SvgIcon
                  className="icon-light"
                  name="icon-lamplight"
                  color={iconColor(deviceData.light_switch)}
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
                  color="#B5C4D1"
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
