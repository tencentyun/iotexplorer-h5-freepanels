/*
 * @Description: 燃气报警器-设置页面
 */
import React, { useState } from 'react';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { OptionDialog } from '@custom/OptionDialog';
import { ValuePicker } from '@custom/ValuePicker';
import { getOptions, getDesc, mapsToOptions } from '@utils';

export function Settings({
  deviceData,
  templateMap,
  doControlDeviceData,
}) {
  // 音量选择器
  const [alarmVolVisible, onToggleAlarmVol] = useState(false);
  // 报警铃声选择器
  const [alarmRingtoneVisible, onToggleAlarmRingtone] = useState(false);
  // 报警时长选择器
  const [alarmTimeVisible, onToggleAlarmTime] = useState(false);

  return (
    <main className="settings-wrap">
      <Cell
        className="cell-settings"
        title="设备自检"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.self_checking === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('self_checking', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="设备自检结果"
        size="medium"
        isLink={false}
        value={getDesc(templateMap, 'checking_result', deviceData.checking_result) || ''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="报警音量"
        value={getDesc(templateMap, 'alarm_vol', deviceData.alarm_vol)}
        valueStyle="set"
        size="medium"
        onClick={() => {
          onToggleAlarmVol(true);
        }}
      >
        <OptionDialog
          visible={alarmVolVisible}
          title="报警音量"
          defaultValue={[deviceData.alarm_vol]}
          options={getOptions(templateMap, 'alarm_vol')}
          onCancel={() => {
            onToggleAlarmVol(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('alarm_vol', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="报警铃声"
        value={getDesc(templateMap, 'alarm_ringtone', deviceData.alarm_ringtone)}
        valueStyle="set"
        size="medium"
        onClick={() => {
          onToggleAlarmRingtone(true);
        }}
      >
        <OptionDialog
          visible={alarmRingtoneVisible}
          title="报警铃声"
          defaultValue={[deviceData.alarm_ringtone]}
          options={getOptions(templateMap, 'alarm_ringtone')}
          onCancel={() => {
            onToggleAlarmRingtone(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('alarm_ringtone', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="报警时长"
        value={`${deviceData.alarm_time || '0'}s`}
        valueStyle="set"
        size="medium"
        onClick={() => {
          onToggleAlarmTime(true);
        }}
      >
        <ValuePicker
          title='报警时长'
          visible={alarmTimeVisible}
          optionsValue={mapsToOptions(templateMap, 'alarm_time')}
          value={[deviceData.alarm_time ? deviceData.alarm_time.toString() : '1']}
          onCancel={() => onToggleAlarmTime(false)}
          onConfirm={(value) => {
            doControlDeviceData('alarm_time', +(value[0] || '1'));
            onToggleAlarmTime(false);
          }}
        />
      </Cell>
      <Cell
        className="cell-settings"
        title="消音"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.muffling === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('muffling', Number(value));
            }}
          />
        }
      ></Cell>
      <Cell
        className="cell-settings"
        title="报警开关"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.alarm_switch === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('alarm_switch', Number(value));
            }}
          />
        }
      ></Cell>
    </main>
  );
}
