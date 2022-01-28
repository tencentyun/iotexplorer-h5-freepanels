/*
 * @Description: 烟雾报警器设置
 */

import React, { useState } from 'react';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { ListPicker, ValuePicker } from '@components/business';
// 模版数据
import { DeviceContext } from '../deviceContext';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useDeviceData } from '@hooks/useDeviceData';
// 接口，处理属性更改
import { getThemeType } from '@libs/theme';
import { formatDeviceData, onControlDevice } from '@hooks/useDeviceData';
import { toggleBooleanByNumber, mapsToOptions } from '@libs/utillib';

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
  // 报警时长选择器
  const [alarmTimeVisible, onToggleAlarmTime] = useState(false);

  const getDesc = (key:string, type: string): string => {
    if (state.templateMap[key]) {
      const typeObj = state.templateMap[key];

      return typeObj.define.mapping[type];
    } else {
      return ''
    }
  };

  const volOptions = () => {
    if (deviceMaps['alarm_vol']) {
      const options = deviceMaps['alarm_vol'].map((t: any) => ({
        label: t.desc,
        value: t.name
      }));
      return options.length > 0 ? options : [];
    }
    return [
      {label: "low", value: "0"},
      {label: "middle", value: "1"},
      {label: "high", value: "2"},
      {label: "mute", value: "3"}
    ];
  };

  const ringtoneOptions = () => {
    if (deviceMaps['alarm_ringtone']) {
      const options = deviceMaps['alarm_ringtone'].map((t: any) => ({
        label: t.desc,
        value: t.name
      }));
      return options.length > 0 ? options : [];
    }
    return [
      {label: "ringtone1", value: "1"},
      {label: "ringtone2", value: "2"}
    ];
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="alarm-setting">
          <Block className="setting-block">
            <Cell
              title="设备自检"
              valueStyle={'gray'}
              size="medium"
              isLink={false}
              value={
                <Switch
                  name="mode"
                  theme={themeType}
                  checked={
                    deviceData['self_checking']
                      ? toggleBooleanByNumber(deviceData['self_checking'])
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('self_checking', Number(val));
                  }}
                />
              }
            ></Cell>
            <Cell
              title="设备自检结果"
              value={getDesc('checking_result', deviceData['checking_result']) || '无'}
              valueStyle={'gray'}
              size="medium"
              isLink={false}
            ></Cell>
            <Cell
              title="报警音量"
              value={getDesc('alarm_vol', deviceData['alarm_vol'])}
              valueStyle={'gray'}
              size="medium"
              onClick={() => {
                onToggleAlarmVol(true);
              }}
            >
              <ListPicker
                visible={alarmVolVisible}
                title="报警音量"
                defaultValue={[(deviceData['alarm_vol']||0).toString()]}
                options={volOptions()}
                layoutType="spaceBetween"
                onCancel={() => onToggleAlarmVol(false)}
                onConfirm={value => {
                  onControlDevice('alarm_vol', value[0]);
                  onToggleAlarmVol(false);
                }}
              />
            </Cell>
            <Cell
              title="报警铃声"
              value={getDesc('alarm_ringtone', deviceData['alarm_ringtone'])}
              valueStyle={'gray'}
              size="medium"
              onClick={() => {
                onToggleAlarmRingtone(true);
              }}
            >
              <ListPicker
                visible={alarmRingtoneVisible}
                title="报警铃声"
                defaultValue={[(deviceData['alarm_ringtone']||0).toString()]}
                options={ringtoneOptions()}
                layoutType="spaceBetween"
                onCancel={() => onToggleAlarmRingtone(false)}
                onConfirm={value => {
                  onControlDevice('alarm_ringtone', value[0]);
                  onToggleAlarmRingtone(false);
                }}
              />
            </Cell>
            <Cell
              title="报警时长"
              value={(deviceData['alarm_time'] || '0') + 's'}
              valueStyle={'gray'}
              size="medium"
              onClick={() => {
                onToggleAlarmTime(true);
              }}
            >
              <ValuePicker
                visible={alarmTimeVisible}
                value={[(deviceData['alarm_time']||0).toString()]}
                title="报警时长"
                columns={[mapsToOptions('alarm_time', deviceMaps)]}
                onCancel={() => onToggleAlarmTime(false)}
                onConfirm={value => {
                  onControlDevice('alarm_time', +(value[0] || '0'));
                  onToggleAlarmTime(false);
                }}
              />
            </Cell>
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
                    deviceData['muffling']
                      ? toggleBooleanByNumber(deviceData['muffling'])
                      : false
                  }
                  onChange={(val: boolean) => {
                    onControlDevice('muffling', Number(val));
                  }}
                />
              }
            ></Cell>
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
                    deviceData['muffling']
                      ? toggleBooleanByNumber(deviceData['muffling'])
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
