/*
 * @Description: 设置
 */

import React, { useState }  from 'react';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { DeviceContext } from '../deviceContext';
// 接口，处理属性更改
import { getThemeType } from '@libs/theme';
import { toggleBooleanByNumber } from '@libs/utillib';
import { ListPicker, ValuePicker } from '@components/business';
import { formatDeviceData, onControlDevice, useDeviceData } from '@hooks/useDeviceData';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
interface DeviceMaps {
  alarm_vol: [];
  alarm_ringtone: [];
}

export function Settings() {
  const themeType = getThemeType();
  const [state] = useDeviceData(sdk);
  // 从 sdk 读取到的物模型 maps
  const deviceMaps = formatDeviceData((state as any).templateMap) as DeviceMaps;

  // 音量选择器
  const [alarmVolVisible, onToggleAlarmVol] = useState(false);
  // 报警铃声选择器
  const [alarmRingtoneVisible, onToggleAlarmRingtone] = useState(false);

  const getDesc = (key:string, type: string): string => {
    if (state.templateMap[key]) {
      const typeObj = state.templateMap[key];

      return typeObj.define.mapping[type];
    }
    return '';
  };

  const volOptions = () => {
    if (deviceMaps.alarm_vol) {
      const options = deviceMaps.alarm_vol.map((t: any) => ({
        label: t.desc,
        value: t.name,
      }));
      return options.length > 0 ? options : [];
    }
    return [
      { label: 'low', value: 'low' },
      { label: 'middle', value: 'middle' },
      { label: 'high', value: 'high' },
      { label: 'mute', value: 'mute' },
    ];
  };

  const ringtoneOptions = () => {
    if (deviceMaps.alarm_ringtone) {
      const options = deviceMaps.alarm_ringtone.map((t: any) => ({
        label: t.desc,
        value: t.name,
      }));
      return options.length > 0 ? options : [];
    }
    return [
      { label: 'ringtone_1', value: 'ringtone_1' },
      { label: 'ringtone_2', value: 'ringtone_2' },
      { label: 'ringtone_3', value: 'ringtone_3' },
      { label: 'ringtone_4', value: 'ringtone_4' },
      { label: 'ringtone_5', value: 'ringtone_5' },
    ];
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="sensor-setting">
          <Block className="setting-block">
          <Cell
              title="报警音量"
              value={getDesc('alarm_vol', deviceData.alarm_vol)}
              valueStyle={'gray'}
              size="medium"
              onClick={() => {
                onToggleAlarmVol(true);
              }}
            >
              <ListPicker
                theme={themeType}
                visible={alarmVolVisible}
                title="报警音量"
                defaultValue={[deviceData.alarm_vol]}
                options={volOptions()}
                layoutType="spaceBetween"
                onCancel={() => onToggleAlarmVol(false)}
                onConfirm={(value) => {
                  onControlDevice('alarm_vol', value[0]);
                  onToggleAlarmVol(false);
                }}
              />
            </Cell>
            <Cell
              title="报警铃声"
              value={getDesc('alarm_ringtone', deviceData.alarm_ringtone)}
              valueStyle={'gray'}
              size="medium"
              onClick={() => {
                onToggleAlarmRingtone(true);
              }}
            >
              <ListPicker
                theme={themeType}
                visible={alarmRingtoneVisible}
                title="报警铃声"
                defaultValue={[deviceData.alarm_ringtone]}
                options={ringtoneOptions()}
                layoutType="spaceBetween"
                onCancel={() => onToggleAlarmRingtone(false)}
                onConfirm={(value) => {
                  onControlDevice('alarm_ringtone', value[0]);
                  onToggleAlarmRingtone(false);
                }}
              />
            </Cell>
           
            <Cell
              title="报警开关"
              valueStyle={'gray'}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="mode"
                  theme={themeType}
                  checked={
                    deviceData.alarm_switch
                      ? toggleBooleanByNumber(deviceData.alarm_switch)
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('alarm_switch', Number(val));
                  }}
                />
              }
            ></Cell>
            <Cell
              title="消音"
              valueStyle={'gray'}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="mode"
                  theme={themeType}
                  checked={
                    deviceData.muffling
                      ? toggleBooleanByNumber(deviceData.muffling)
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('muffling', Number(val));
                  }}
                />
              }
            ></Cell>
          </Block>
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
