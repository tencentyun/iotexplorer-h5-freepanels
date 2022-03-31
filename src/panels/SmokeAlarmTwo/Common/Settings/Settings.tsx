/*
 * @Description: 燃气报警器-设置页面
 */
import React, { useState } from 'react';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { OptionDialog } from '@custom/OptionDialog';
import { TimePicker } from '@custom/TimePicker';

export function Settings({
  deviceData,
  templateMap,
  doControlDeviceData
}) {
  // 音量选择器
  const [alarmVolVisible, onToggleAlarmVol] = useState(false);
  // 报警铃声选择器
  const [alarmRingtoneVisible, onToggleAlarmRingtone] = useState(false);
  // 报警时长选择器
  const [alarmTimeVisible, onToggleAlarmTime] = useState(false);

  const getDesc = (key:string, type: string): string => {
    if (templateMap[key]) {
      const typeObj = templateMap[key];

      return typeObj.define.mapping[type];
    } else {
      return ''
    }
  };

  const volOptions = () => {
    if (templateMap['alarm_vol']) {
      const options = templateMap['alarm_vol'].map((t: any) => ({
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
    if (templateMap['alarm_ringtone']) {
      const options = templateMap['alarm_ringtone'].map((t: any) => ({
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
    <main className="settings">
      <Cell
        className="cell-settings"
        title="设备自检"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.self_checking == 1}
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
        value={getDesc('checking_result', deviceData.checking_result) || ''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="报警音量"
        value={getDesc('alarm_vol', deviceData.alarm_vol)}
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
          options={volOptions()}
          onCancel={()=>{onToggleAlarmVol(false)}}
          onConfirm={(value)=>{
            doControlDeviceData('alarm_vol', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="报警铃声"
        value={getDesc('alarm_ringtone', deviceData.alarm_ringtone)}
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
          options={ringtoneOptions()}
          onCancel={()=>{onToggleAlarmRingtone(false)}}
          onConfirm={(value)=>{
            doControlDeviceData('alarm_ringtone', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="报警时长"
        value={(deviceData.alarm_time || '0') + 's'}
        valueStyle="set"
        size="medium"
        onClick={() => {
          onToggleAlarmTime(true);
        }}
      >
        {/* <TimePicker
          title='报警时长'
          visible={true}
          isPopUp={false}
          value={['60']}
          showSemicolon={false}
          showTwoDigit={false}
          mask={false}
          onCancel={()=>{onToggleAlarmTime(false)}}
          onConfirm={()=>{onToggleAlarmTime(false)}}
          
        /> */}
      </Cell>
      <Cell
        className="cell-settings"
        title="消音"
        size="medium"
        isLink={false}
        value={
          <Switch
            checked={deviceData.muffling == 1}
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
            checked={deviceData.alarm_switch == 1}
            onChange={(value: boolean) => {
              doControlDeviceData('alarm_switch', Number(value));
            }}
          />
        }
      ></Cell>
    </main>
  );
}
