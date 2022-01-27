/*
 * @Description: 温控器首页
 */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import { ListPicker } from '@components/business';
import ThermostatDashboard from '@components/business/round-dashboard/thermostat';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';

import { DeviceContext } from '../deviceContext';
import { getThemeType } from '@libs/theme';
import { formatDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { SkinProps } from '../skinProps';
import './home.less';

interface DeviceMaps {
  spray_mode: [];
  level: [];
}

export function Home() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const history = useHistory();
  const [state] = useDeviceData(sdk);
  // 从 sdk 读取到的物模型 maps
  const deviceMaps = formatDeviceData((state as any).templateMap) as DeviceMaps;
  const statusName = 'shutdown';

  const [tempValue, setTempValue] = useState(0);

  // 工作模式选择器
  const [modeVisible, onToggleMode] = useState(false);
  // 档位选择器
  const [gearVisible, onToggleGear] = useState(false);

  useEffect(() => {
    if (!deviceMaps['temp_unit_convert']) {
      setTempValue(deviceMaps['set_fahrenheit'].start||0);
    } else {
      setTempValue(deviceMaps['set_temp'].start ||0);
    }
  }, []);
  // 工作模式选项
  const modeOptions = () => {
    if (deviceMaps['spray_mode']) {
      const options = deviceMaps['spray_mode'].map((t: any) => ({
        label: t.desc,
        value: t.name
      }));
      return options.length > 0 ? options : [];
    }
    return [
      {
        label: '制冷',
        value: 'cold'
      },
      {
        label: '制热',
        value: 'hot'
      },
      {
        label: '出风',
        value: 'wind'
      },
      {
        label: '舒适',
        value: 'comfortable'
      },
      {
        label: '节能',
        value: 'energy'
      },
      {
        label: '自动',
        value: 'auto'
      },
      {
        label: '节日',
        value: 'holiday'
      },
      {
        label: '手动',
        value: 'manual'
      },
      {
        label: 'ECO',
        value: 'eco'
      },
      {
        label: '睡眠',
        value: 'sleep'
      },
      {
        label: '除湿',
        value: 'dry'
      },
      {
        label: '程控',
        value: 'program'
      },
      {
        label: '地暖',
        value: 'floorheat'
      },
      {
        label: '辅热',
        value: 'auxiliary'
      }
    ];
  };

  // 档位选项
  const gearOptions = () => {
    if (deviceMaps['level']) {
      const options = deviceMaps['level'].map((t: any) => ({
        label: t.desc,
        value: t.name
      }));
      return options.length > 0 ? options : [];
    }
    return [
      {
        label: '自动',
        value: 'auto'
      },
      {
        label: '低档',
        value: 'low'
      },
      {
        label: '中档',
        value: 'middle'
      },
      {
        label: '高档',
        value: 'high'
      }
    ];
  };

  const currentStatus = (powerStatus: number, name: string) => {
    if (powerStatus === 0) {
      return CurrentSkinProps['shutdown'][name];
    } else {
      return CurrentSkinProps['initiate'][name];
    }
  };

  // 设置跳转
  const handleSetting = () => {
    history.push('/settings');
  };

  const iconColor = (powerStatus: number) => {
    console.log(powerStatus);
    if (themeType === 'colorful') {
      if (powerStatus === 1) {
        return '#667994';
      } else {
        return '#B4C3D0';
      }
    } else if (themeType === 'blueWhite') {
      if (powerStatus === 1) {
        return '#FFFFFF';
      } else {
        return '#FFFFFF';
      }
    } else if (themeType === 'dark') {
      if (powerStatus === 1) {
        return '#B5C4D1';
      } else {
        return '#B5C4D1';
      }
    } else if (themeType === 'morandi') {
      if (powerStatus === 1) {
        return '#B6ACA3';
      } else {
        return '#909CAB';
      }
    } else {
      if (powerStatus === 1) {
        return '#0F0F0F';
      } else {
        return '#B5C4D1';
      }
    }
  };

  const enumWorkMode: any = {
    cold: '制冷',
    hot: '制热',
    wind: '出风',
    comfortable: '舒适',
    energy: '节能',
    auto: '自动',
    holiday: '节日',
    manual: '手动',
    eco: 'ECO',
    sleep: '睡眠',
    dry: '除湿',
    program: '程控',
    floorheat: '地暖',
    auxiliary: '辅热'
  };

  const enumGear: any = {
    auto: '自动',
    low: '低档',
    middle: '中档',
    high: '高档'
  };

  const renderContentArea = (mode: string, level: string, status: number) => {
    return (
      <ul className={classNames('content-area', {'content-area-active': status} )}>
        <li className="content-item">
          <p className="word">{mode ? enumWorkMode[mode] : '暂无数据'}</p>
          <p className="label">工作模式</p>
        </li>
        <li className="split"></li>
        <li className="content-item">
          <p className="word">{level ? enumGear[level] : '暂无数据'}</p>
          <p className="label">档位</p>
        </li>
      </ul>
    );
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="thermostat-wrap">
          {themeType === 'colorful'
            ? renderContentArea(deviceData.spray_mode, deviceData.level, deviceData.power_switch)
            : null}

          <div className="morandi-header">
            <div className="dial">
              <ThermostatDashboard
                value={
                  deviceData.temp_unit_convert == 0
                    ? deviceData.current_temp
                      ? deviceData.current_temp
                      : 0
                    : deviceData.current_fahrenheit
                    ? deviceData.current_fahrenheit
                    : 0
                }
                dashboardStatus={
                  deviceData.power_switch == 1 ? 'initiate' : 'shutdown'
                }
              />
            </div>

            {/* 内容区 */}
            {themeType === 'morandi'
              ? renderContentArea(deviceData.spray_mode, deviceData.level, deviceData.power_switch)
              : null}
          </div>

          {/* 电源控制区 */}
          {themeType !== 'normal' ? (
            <div className="control-area">
              <div
                className={classNames('setting-button')}
                onClick={() => {
                  if (deviceData.power_switch == 0) return
                  let value = deviceData[deviceData.temp_unit_convert == 0 ? 'set_temp' : 'set_fahrenheit'] ? deviceData[deviceData.temp_unit_convert === 0 ? 'set_temp' : 'set_fahrenheit'] - 1 : 1;
                  let key = deviceData.temp_unit_convert == 0 ? 'set_temp' : 'set_fahrenheit';
                  onControlDevice(key, value);
                }}>
                <SvgIcon className="control-icon" name="icon-ther-minus" color={iconColor(deviceData.power_switch)} />
              </div>
              <div
                className={classNames(
                  'control-power',
                  deviceData.power_switch == 1 ? 'power-open' : ''
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
                />
              </div>
              <div
                className={classNames('setting-button')}
                onClick={() => {
                  if (deviceData.power_switch == 0) return
                  let value = deviceData[deviceData.temp_unit_convert == 0 ? 'set_temp' : 'set_fahrenheit'] ? deviceData[deviceData.temp_unit_convert === 0 ? 'set_temp' : 'set_fahrenheit'] + 1 : 1;
                  let key = deviceData.temp_unit_convert === 0 ? 'set_temp' : 'set_fahrenheit';
                  onControlDevice(key, value);
                }}>
                <SvgIcon className="control-icon icon-ther-add" name="icon-ther-add" color={iconColor(deviceData.power_switch)} />
              </div>
            </div>
          ) : null}

          {themeType === 'blueWhite' || themeType === 'dark'
            ? renderContentArea(deviceData.spray_mode, deviceData.level, deviceData.power_switch)
            : null}

          {/* 设置区 */}
          <div className="settings-area">
            <Block
              className="button-block"
              onClick={() => {
                onToggleMode(true);
              }}
            >
              <SvgIcon
                className="button-icon"
                name="icon-ther-mode"
                {...currentStatus(deviceData.power_switch, 'mode')}
              />
              <p className="button-name">工作模式</p>
              <ListPicker
                visible={modeVisible}
                title="工作模式"
                styleType="spaceBetween"
                theme={themeType}
                defaultValue={[deviceData['spray_mode']]}
                options={modeOptions()}
                layoutType='spaceBetween'
                onCancel={() => onToggleMode(false)}
                onConfirm={value => {
                  onControlDevice('spray_mode', value[0]);
                  onToggleMode(false);
                }}
              />
            </Block>
            <Block
              className="button-block"
              onClick={() => {
                onToggleGear(true);
              }}
            >
              <div className={classNames(
                'button-icon', 
                !deviceData.power_switch? 'icon-gear-default': 'icon-gear-active'
              )}></div>
              <p className="button-name">档位</p>
              <ListPicker
                visible={gearVisible}
                title="档位"
                styleType="spaceBetween"
                theme={themeType}
                defaultValue={[deviceData['level']]}
                options={gearOptions()}
                layoutType='spaceBetween'
                onCancel={() => onToggleGear(false)}
                onConfirm={value => {
                  onControlDevice('level', value[0]);
                  onToggleGear(false);
                }}
              />
            </Block>
            <Block className="button-block" onClick={handleSetting}>
              <SvgIcon
                className="button-icon"
                name="icon-setting"
                {...currentStatus(deviceData.power_switch, 'settings')}
              />
              <p className="button-name">设置</p>
            </Block>
          </div>

          {themeType === 'normal' ? (
            <div className="normal-bottom">
              <div className="control-area">
                <div
                  className={classNames('setting-button')}
                  onClick={() => {
                    if (deviceData.power_switch == 0) return;
                      setTempValue(tempValue - 1);
                      deviceData.temp_unit_convert == 0 ? onControlDevice('current_temp', tempValue) : onControlDevice('current_fahrenheit', tempValue)
                  }}
                >
                  <SvgIcon
                    className="control-icon icon-ther-minus"
                    name="icon-ther-minus"
                    color={iconColor(deviceData.power_switch)}
                  />
                </div>
                <div
                  className={classNames(
                    'control-power',
                    deviceData.power_switch == 1 ? 'power-open' : ''
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
                    {...CurrentSkinProps.power}
                  />
                </div>
                <div
                  className={classNames('setting-button')}
                  onClick={() => {
                    if (deviceData.power_switch == 0) return;
                      setTempValue(tempValue + 1);
                      deviceData.temp_unit_convert == 0 ? onControlDevice('current_temp', tempValue) : onControlDevice('current_fahrenheit', tempValue)
                  }}
                >
                  <SvgIcon
                    className="control-icon icon-ther-add"
                    name="icon-ther-add"
                    color={iconColor(deviceData.power_switch)}
                  />
                </div>
              </div>
              {renderContentArea(deviceData.spray_mode, deviceData.level, deviceData.power_switch)}
            </div>
          ) : null}
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
