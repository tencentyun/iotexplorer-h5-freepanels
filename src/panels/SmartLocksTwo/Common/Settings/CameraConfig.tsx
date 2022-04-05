/*
 * @Description: 摄像头设置
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';
import { OptionDialog } from '@custom/OptionDialog';

interface OptionProps {
  label: string;
  value: string | number;
}

export function CameraConfig({ deviceData, templateMap, doControlDeviceData }) {
  useTitle('摄像头设置');
  // 红外夜视
  const [basicNightvisionVisible, onToggleBasicNightvision] = useState(false);
  // 灵敏度
  const [sensitivityVisible, onToggleSensitivity] = useState(false);

  const getDesc = (key: string, type: string): string => {
    if (templateMap[key]) {
      const typeObj = templateMap[key];

      return typeObj.define.mapping[type];
    }
    return '暂无';
  };

  const getOptions = (key: string) => {
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
    return [{ label: '没数据', value: '0' }];
  };

  return (
    <main className={classNames('settings')}>
      <Cell
        className="cell-settings"
        title="红外夜视"
        value={getDesc('basic_nightvision', deviceData.basic_nightvision ? deviceData.basic_nightvision : 1)}
        valueStyle="set"
        onClick={() => {
          onToggleBasicNightvision(true);
        }}
      >
        <OptionDialog
          visible={basicNightvisionVisible}
          title="红外夜视"
          defaultValue={[deviceData.basic_nightvision ? deviceData.basic_nightvision?.toString() : '1']}
          options={getOptions('basic_nightvision')}
          onCancel={() => {
            onToggleBasicNightvision(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('basic_nightvision', value[0]);
          }}
        ></OptionDialog>
      </Cell>
      <Cell
        className="cell-settings"
        title="人体移动侦测"
        isLink={false}
        value={
          <Switch
            checked={deviceData.stay_alarm_mode === 1}
            onChange={(value: boolean) => {
              doControlDeviceData('stay_alarm_mode', Number(value));
            }}
          />
        }
      >
      </Cell>
      {deviceData.stay_alarm_mode === 1
        ? <Cell
          className="cell-settings-secondary"
          title="灵敏度"
          value={getDesc('sensitivity', deviceData.sensitivity ? deviceData.sensitivity : 1)}
          valueStyle="set"
          onClick={() => {
            onToggleSensitivity(true);
          }}
        >
          <OptionDialog
            visible={sensitivityVisible}
            title="灵敏度"
            defaultValue={[deviceData.sensitivity ? deviceData.sensitivity?.toString() : '1']}
            options={getOptions('sensitivity')}
            onCancel={() => {
              onToggleSensitivity(false);
            }}
            onConfirm={(value) => {
              doControlDeviceData('sensitivity', value[0]);
            }}
          ></OptionDialog>
        </Cell> : null
      }
    </main>
  );
}
