/*
 * @Description: 加湿器-设置页面
 */
import React, { useState } from 'react';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { OptionDialog } from '@custom/OptionDialog';
import { TimePicker } from '@custom/TimePicker';

export function Settings({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { PATH, push },
}) {
  const getDesc = (key:string, type: string): string => {
    if (templateMap[key]) {
      const typeObj = templateMap[key];

      return typeObj.define.mapping[type];
    }
    return '';
  };

  const volOptions = () => {
    if (templateMap.alarm_vol) {
      const options = templateMap.alarm_vol.map((t: any) => ({
        label: t.desc,
        value: t.name,
      }));
      return options.length > 0 ? options : [];
    }
    return [
      { label: 'low', value: '0' },
      { label: 'middle', value: '1' },
      { label: 'high', value: '2' },
      { label: 'mute', value: '3' },
    ];
  };

  const ringtoneOptions = () => {
    if (templateMap.alarm_ringtone) {
      const options = templateMap.alarm_ringtone.map((t: any) => ({
        label: t.desc,
        value: t.name,
      }));
      return options.length > 0 ? options : [];
    }
    return [
      { label: 'ringtone1', value: '1' },
      { label: 'ringtone2', value: '2' },
    ];
  };

  return (
    <main className="settings">
      <Cell
        className="cell-settings"
        title="耗电"
        size="medium"
      ></Cell>
      <Cell
        className="cell-settings"
        title="当前温度"
        size="medium"
        value={getDesc('checking_result', deviceData.checking_result) || ''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="上下摆风挡位"
        size="medium"
        value={getDesc('checking_result', deviceData.checking_result) || ''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="左右摆风挡位"
        size="medium"
        value={getDesc('checking_result', deviceData.checking_result) || ''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="温标切换"
        size="medium"
        value={getDesc('checking_result', deviceData.checking_result) || ''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="房间信息"
        size="medium"
        isLink={false}
        value={getDesc('checking_result', deviceData.checking_result) || ''}
        valueStyle="set"
      ></Cell>
      <Cell
        className="cell-settings"
        title="3D扫风"
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
        title="烘干"
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
        title="换气模式"
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
        title="负离子"
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
        title="自清洁"
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
        title="加热"
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
        title="自动"
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
        title="ECO模式"
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
        title="换气模式"
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
        title="负离子"
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
        title="负离子"
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
        title="云端定时"
        size="medium"
        // value={getDesc('checking_result', deviceData.checking_result) || ''}
        valueStyle="set"
        onClick={() => {
          push(PATH.TIMER_LIST);
        }}
      ></Cell>
    </main>
  );
}
