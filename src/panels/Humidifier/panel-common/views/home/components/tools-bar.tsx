import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { SvgIcon } from '@components/common/icon';
import { ListPicker } from '@components/business';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { DeviceSateContext } from '../../../deviceStateContext';

import { useDeviceData } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';
import { onControlDevice, formatDeviceData } from '@hooks/useDeviceData';
import './tools-bar.less';

interface DeviceMaps {
  work_mode: [];
  level: [];
}

export function ToolsBar() {
  const themeType = getThemeType();
  const history = useHistory();
  const [state] = useDeviceData(sdk);
  const [color, setColor] = useState('blue');
  // 工作模式弹窗
  const [modeVisible, setModeVisible] = useState(false);
  const [modeValue, setModeValue] = useState(0);
  // 档位弹窗
  const [gearVisible, setGearVisible] = useState(false);
  const [gearValue, setGearValue] = useState('');

  // 从 sdk 读取到的物模型 maps
  const deviceMaps = formatDeviceData((state as any).templateMap) as DeviceMaps;
  const statusName = 'shutdown';

  // 工作模式选项
  const modeOptions = () => {
    if (deviceMaps['work_mode']) {
      const options = deviceMaps['work_mode'].map((t: any) => ({
        label: t.desc,
        value: t.name
      }));
      return options.length > 0 ? options : [];
    }
    return [
      {
        label: '自然蒸发',
        value: 'natural_evaporation'
      },
      {
        label: '加热蒸发',
        value: 'heating_evaporation'
      },
      {
        label: '超声波蒸发',
        value: 'ultrasonic'
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
        label: '1档',
        value: 'level_1'
      },
      {
        label: '2档',
        value: 'level_2'
      },
      {
        label: '3档',
        value: 'level_3'
      },
      {
        label: '4档',
        value: 'level_4'
      },
      {
        label: '5档',
        value: 'level_5'
      },
      {
        label: '6档',
        value: 'level_6'
      },
      {
        label: '7档',
        value: 'level_7'
      },
      {
        label: '8档',
        value: 'level_8'
      },
      {
        label: '9档',
        value: 'level_9'
      },
      {
        label: '10档',
        value: 'level_10'
      }
    ];
  };

  const currentStatus = (powerStatus: number, name: string) => {
    if (powerStatus === 0) {
      // return CurrentSkinProps['shutdown'][name];
    } else {
      // return CurrentSkinProps['initiate'][name];
    }
  };

  const iconColor = (powerStatus: number, key?: string) => {
    if (themeType === 'colorful') {
      if (powerStatus === 1) {
        if (key === 'ultrasonic') {
          return {
            gradientId: 'ultrasonic',
            startColor: '#2CE74F',
            endColor: '#00E1AD',
            x1: '50%',
            y1: '0%',
            x2: '50%',
            y2: '100%'
          };
        } else if (key === 'gear') {
          return {
            gradientId: 'gear',
            startColor: '#527DF4',
            endColor: '#044DFF',
            x1: '11.8644068%',
            y1: '18.182147%',
            x2: '104.602754%',
            y2: '88.2505064%'
          };
        } else {
          return {
            gradientId: 'more',
            startColor: '#FFDB01',
            endColor: '#FFC105',
            x1: '11.8644068%',
            y1: '18.182147%',
            x2: '104.602754%',
            y2: '88.2505064%'
          };
        }
      } else {
        return {
          color: '#B4C3D0'
        };
      }
    } else if (themeType === 'blueWhite') {
      if (powerStatus === 1) {
        return {
          color: '#006FFF'
        };
      } else {
        return {
          color: '#A6AFC2'
        };
      }
    } else if (themeType === 'dark') {
      if (powerStatus === 1) {
        return {
          gradientId: 'icon',
          startColor: '#00F0FF',
          endColor: '#704DF0',
          x1: '11.8644068%',
          y1: '18.182147%',
          x2: '104.602754%',
          y2: '88.2505064%'
        };
      } else {
        return {
          color: '#B5C4D1'
        };
      }
    } else if (themeType === 'morandi') {
      if (powerStatus === 1) {
        return {
          color: '#B5ABA1'
        };
      } else {
        return {
          color: '#909CAB'
        };
      }
    } else {
      if (powerStatus === 1) {
        return {
          color: '#0F0F0F'
        };
      } else {
        return {
          color: '#C9D4DD'
        };
      }
    }
  };

  const enumWorkMode: any = {
    natural_evaporation: '自然蒸发',
    heating_evaporation: '加热蒸发',
    ultrasonic: '超声波蒸发'
  };

  const enumGear: any = {
    level_1: '1档',
    level_2: '2档',
    level_3: '3档',
    level_4: '4档',
    level_5: '5档',
    level_6: '6档',
    level_7: '7档',
    level_8: '8档',
    level_9: '9档',
    level_MO: '10档'
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <section className="tools-bar-wrap">
          <div
            className={classNames(
              'item',
              deviceData.power_switch ? 'active' : ''
            )}
            onClick={() => {
              if (!deviceData.power_switch) return
              setModeVisible(true);
            }}
          >
            <SvgIcon
              className="icon-mode"
              name="icon-humidifier-ultrasonic"
              {...iconColor(deviceData.power_switch, 'ultrasonic')}
            ></SvgIcon>
            <div className="label">超声波</div>
          </div>
          <div
            className={classNames(
              'item',
              deviceData.power_switch ? 'active' : ''
            )}
            onClick={() => {
              if (!deviceData.power_switch) return
              setGearVisible(true);
            }}
          >
            <SvgIcon
              className="icon-gear"
              name="icon-humidifier-gear"
              {...iconColor(deviceData.power_switch, 'gear')}
            ></SvgIcon>
            <div className="label">{deviceData.spray_gears ? enumGear[deviceData.spray_gears] : '档位'}</div>
          </div>
          <div
            className={classNames(
              'item',
              deviceData.power_switch ? 'active' : ''
            )}
            onClick={() => {
              history.push('/more');
            }}
          >
            <SvgIcon
              className="icon-time"
              name="icon-humidifier-more"
              {...iconColor(deviceData.power_switch, 'more')}
            ></SvgIcon>
            <div className="label">更多</div>
          </div>
          <ListPicker
            visible={modeVisible}
            title="工作模式"
            styleType="spaceBetween"
            theme={themeType}
            defaultValue={[deviceData.work_mode]}
            options={modeOptions()}
            layoutType="spaceBetween"
            onCancel={() => setModeVisible(false)}
            onConfirm={value => {
              onControlDevice('work_mode', value[0]);
              setModeVisible(false);
            }}
          />
          <ListPicker
            visible={gearVisible}
            title="喷雾档位"
            styleType="spaceBetween"
            theme={themeType}
            defaultValue={[deviceData.spray_gears]}
            options={gearOptions()}
            layoutType="spaceBetween"
            onCancel={() => setGearVisible(false)}
            onConfirm={value => {
              onControlDevice('spray_gears', value[0]);
              setGearVisible(false);
              setGearValue(value[0]);
            }}
          />
        </section>
      )}
    </DeviceSateContext.Consumer>
  );
}
