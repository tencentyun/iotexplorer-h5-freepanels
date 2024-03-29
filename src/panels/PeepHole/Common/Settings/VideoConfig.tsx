/*
 * @Description: 录像设置
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { OptionDialog } from '@custom/OptionDialog';

interface OptionProps {
  label: string;
  value: string | number;
}

export function VideoConfig({
  deviceData,
  templateMap,
  doControlDeviceData,
}) {
  useTitle('录像设置');
  // 清晰度
  const [clarityVisible, onToggleClarity] = useState(false);
  // 录像模式
  const [recordModeVisible, onToggleRecordMode] = useState(false);

  const getDesc = (key:string, type: string): string => {
    if (templateMap[key]) {
      const typeObj = templateMap[key];
      return typeObj.define?.mapping?.[type];
    }
    return '';
  };

  const getOptions = (key:string) => {
    if (templateMap[key]) {
      if (templateMap[key].define.type === 'enum') {
        const options: OptionProps[] = [];
        Object.entries(templateMap[key].define.mapping).forEach(([index, value]) => {
          options.push({
            label: value,
            value: index,
          });
        });
        return (options || []).length > 0 ? options : [];
      }
    }
    return [
      { label: '没数据', value: '0' },
    ];
  };

  return (
    <main className={classNames('settings')}>
      <Cell
        className="cell-settings"
        title="SD卡状态"
        value={getDesc('sd_status', deviceData.sd_status) || '--'}
        valueStyle="set"
        isLink={false}
      ></Cell>
      <Cell
        className="cell-settings"
        title="清晰度"
        value={getDesc('clarity', deviceData.clarity)}
        valueStyle="set"
        onClick={() => {
          onToggleClarity(true);
        }}
      >
        <OptionDialog
          visible={clarityVisible}
          title="清晰度"
          defaultValue={[deviceData.clarity]}
          options={getOptions('clarity')}
          onCancel={() => {
            onToggleClarity(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('clarity', Number(value[0]));
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="录像模式"
        value={getDesc('record_mode', deviceData.record_mode ? deviceData.record_mode : 1)}
        valueStyle="set"
        onClick={() => {
          onToggleRecordMode(true);
        }}
      >
        <OptionDialog
          visible={recordModeVisible}
          title="录像模式"
          defaultValue={[deviceData.record_mode ? deviceData.record_mode?.toString() : '1']}
          options={getOptions('record_mode')}
          onCancel={() => {
            onToggleRecordMode(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('record_mode', value[0]);
          }}
        ></OptionDialog>
      </Cell>
    </main>
  );
}
