import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { ScrollView } from '../../../../components/base';
import { SvgIcon } from '@components/common';
import { onControlDevice } from '@hooks/useDeviceData';
import { DeviceContext } from '../deviceContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import '../components/morandi-home.less';

export function MorandiHome() {
  const history = useHistory();
  const [workMode, setWorkMode] = useState('middle');

  useEffect(() => {
    setWorkMode(sdk.deviceData.work_mode);
  }, []);

  const imageSrc = () => {
    return 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/aromatherapy_machine/aromatherapy_machine.png';
  };

  const workModeLabel: any = {
    large: '大雾量',
    middle: '中雾量',
    small: '小雾量'
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
          <ScrollView height="100vh" scrollY>
            <div className="inner">
              {/* 产品图 */}
              <div className="product-image-wrap">
                <div className="cicle"></div>
                <div className="fumes"></div>
                <img className="product-image" src={imageSrc()}></img>
                <div className="shadow"></div>
              </div>
              {/* 更多按钮 */}
              <div className="more" onClick={handleMore}>
                <SvgIcon
                  className="icon-more"
                  name="icon-more-cicle"
                  color="#576273"
                />
              </div>

              {/* 控制区 */}
              <div className="control-area-wrap">
                <div className="control-area">
                  <div
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
                      className="control-icon"
                      name="icon-spray"
                      color={
                        deviceData.spray_switch === 1 ? '#B5ABA1' : '#576273'
                      }
                    />
                    <p className="label">喷雾开关</p>
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
                      color="#FFFFFF"
                    />
                  </div>

                  <div
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
                      className="control-icon"
                      name="icon-lamplight"
                      color={
                        deviceData.light_switch === 1 ? '#B5ABA1' : '#576273'
                      }
                    />
                    <p className="label">灯光开关</p>
                  </div>
                </div>
              </div>

              <div className="decoration-block">
                <div className="countdown-slider-wrap">
                  <ul className="countdown-slider-tips">
                    <li className="item">
                      <span className="label">小雾量</span>
                      {workMode === 'small' && <span className="icon-cicle" />}
                    </li>
                    <li className="item">
                      <span className="label">中雾量</span>
                      {workMode === 'middle' && <span className="icon-cicle" />}
                    </li>
                    <li className="item">
                      <span className="label">小雾量</span>
                      {workMode === 'large' && <span className="icon-cicle" />}
                    </li>
                  </ul>
                  <div
                    className={classNames(
                      deviceData.power_switch === 1
                        ? 'slider-mask'
                        : 'slider-mask-close'
                    )}
                  >
                    <span
                      onClick={() => {
                        if (deviceData.power_switch !== 1) return;
                        setWorkMode('small');
                        onControlDevice('work_mode', workMode);
                      }}
                    ></span>
                    <span
                      style={{ opacity: workMode === 'small' ? 0 : 1 }}
                    ></span>
                    <span
                      style={{ opacity: workMode === 'small' ? 0 : 1 }}
                    ></span>
                    <span
                      style={{ opacity: workMode === 'small' ? 0 : 1 }}
                      onClick={() => {
                        if (deviceData.power_switch !== 1) return;
                        setWorkMode('middle');
                        onControlDevice('work_mode', workMode);
                      }}
                    ></span>
                    <span
                      style={{ opacity: workMode === 'large' ? 1 : 0 }}
                    ></span>
                    <span
                      style={{ opacity: workMode === 'large' ? 1 : 0 }}
                    ></span>
                    <span
                      style={{ opacity: workMode === 'large' ? 1 : 0 }}
                      onClick={() => {
                        if (deviceData.power_switch !== 1) return;
                        setWorkMode('large');
                        onControlDevice('work_mode', workMode);
                      }}
                    ></span>
                  </div>
                </div>

                <ul className="decoration-bottom">
                  <li className="content-item">
                    <p className="word">
                      {deviceData.count_left
                        ? deviceData.count_left
                        : '00:00:00'}
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
            </div>
          </ScrollView>
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
