import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { SvgIcon } from '@/components/common/icon';
import { ListPicker } from '@/components/business';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

import { useDeviceData } from '@/hooks/useDeviceData';
import { getThemeType, formatDeviceData, onControlDevice } from '@/business';
import './tools-bar.less';

const themeType = getThemeType();

interface DeviceMaps {
  mode: [];
  fan_speed_enum: [];
}

export function ToolsBar() {
  const history = useHistory();
  const [state] = useDeviceData(sdk);
  // 工作模式弹窗
  const [modeVisible, setModeVisible] = useState(false);
  const [modeValue, setModeValue] = useState('');
  // 档位弹窗
  const [gearVisible, setGearVisible] = useState(false);
  const [gearValue, setGearValue] = useState('');

  // 从 sdk 读取到的物模型 maps
  const deviceMaps = formatDeviceData((state as any).templateMap) as DeviceMaps;
  const statusName = 'shutdown';

  // 工作模式选项
  const modeOptions = () => {
    if (deviceMaps['mode']) {
      const options = deviceMaps['mode'].map((t: any) => ({
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
        label: '制冷',
        value: 'cold'
      },
      {
        label: '制热',
        value: 'hot'
      },
      {
        label: '除湿',
        value: 'arefaction'
      },
      {
        label: '送风',
        value: 'wind'
      },
      {
        label: 'ECO',
        value: 'eco'
      },
      {
        label: '地暖',
        value: 'floor_heat'
      },
      {
        label: '地暖及制热',
        value: 'floor_eat_and_heat'
      }
    ];
  };

  // 档位选项
  const gearOptions = () => {
    if (deviceMaps['fan_speed_enum']) {
      const options = deviceMaps['fan_speed_enum'].map((t: any) => ({
        label: t.desc,
        value: t.name
      }));
      return options.length > 0 ? options : [];
    }
    return [
      {
        label: '睡眠',
        value: 'sleep'
      },
      {
        label: '健康',
        value: 'health'
      },
      {
        label: '自然',
        value: 'natural'
      },
      {
        label: '强力',
        value: 'strong'
      },
      {
        label: '自动',
        value: 'auto'
      },
      {
        label: '低风',
        value: 'low'
      },
      {
        label: '中风',
        value: 'middle'
      },
      {
        label: '高风',
        value: 'high'
      },
      {
        label: '静音',
        value: 'mute'
      }
    ];
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
    auto: '自动',
    cold: '制冷',
    hot: '制热',
    arefaction: '除湿',
    wind: '送风',
    eco: 'ECO',
    floor_heat: '地暖',
    floor_eat_and_heat: '地暖及制热'
  };

  const enumGear: any = {
    sleep: '睡眠',
    health: '健康',
    natural: '自然',
    strong: '强力',
    auto: '自动',
    low: '低风',
    middle: '中风',
    high: '高风',
    mute: '静音'
  };

  return (
    <section className="tools-bar-wrap">
      <div
        className={classNames(
          'item',
          sdk.deviceData.power_switch ? 'active' : ''
        )}
        onClick={() => {
          setModeVisible(true);
        }}
      >
        <SvgIcon
          className="icon-mode"
          name="icon-work_mode"
          {...iconColor(sdk.deviceData.power_switch, 'ultrasonic')}
        ></SvgIcon>
        <div className="label">{sdk.deviceData.mode ? enumWorkMode[sdk.deviceData.mode] : '自动模式'}</div>
      </div>
      <div
        className={classNames(
          'item',
          sdk.deviceData.power_switch ? 'active' : ''
        )}
        onClick={() => {
          setGearVisible(true);
        }}
      >
        <SvgIcon
          className="icon-gear"
          name="icon-gear"
          {...iconColor(sdk.deviceData.power_switch, 'gear')}
        ></SvgIcon>
        <div className="label">{sdk.deviceData.fan_speed_enum ? enumGear[sdk.deviceData.fan_speed_enum] : '风速'}</div>
      </div>
      <div
        className={classNames(
          'item',
          sdk.deviceData.power_switch ? 'active' : ''
        )}
        onClick={() => {
          history.push('/more');
        }}
      >
        <SvgIcon
          className="icon-time"
          name="icon-humidifier-more"
          {...iconColor(sdk.deviceData.power_switch, 'more')}
        ></SvgIcon>
        <div className="label">更多</div>
      </div>
      <ListPicker
        visible={modeVisible}
        title="模式"
        styleType="spaceBetween"
        theme={themeType}
        defaultValue={[sdk.deviceData.work_mode]}
        options={modeOptions()}
        onCancel={() => setModeVisible(false)}
        onConfirm={value => {
          onControlDevice('mode', value[0]);
          setModeVisible(false);
          setModeValue(value[0]);
        }}
      />
      <ListPicker
        visible={gearVisible}
        title="风速"
        styleType="spaceBetween"
        theme={themeType}
        defaultValue={[sdk.deviceData.gear]}
        options={gearOptions()}
        onCancel={() => setGearVisible(false)}
        onConfirm={value => {
          onControlDevice('fan_speed_enum', value[0]);
          setGearVisible(false);
          setGearValue(value[0]);
        }}
      />
    </section>
  );
}
