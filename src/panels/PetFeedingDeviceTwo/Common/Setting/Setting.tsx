import React, { useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { OptionDialog } from '@custom/OptionDialog';

interface OptionProps {
  label: string;
  value: string | number;
}

export function Setting({
  deviceData,
  templateMap,
  doControlDeviceData,
}) {
  useTitle('设置');
  // 单位转换
  const [unitSwitchVisible, setUnitSwitch] = useState(false);
  const { unit_switch } = deviceData;

  const getDesc = (key: string, type: string): string => {
    if (templateMap[key]) {
      const typeObj = templateMap[key];

      return typeObj.define.mapping[type];
    }
    return '';
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
    <main className="settings">
      <Cell
        className=""
        title="单位转换"
        value={getDesc('unit_switch', unit_switch)}
        valueStyle="set"
        onClick={() => {
          setUnitSwitch(true);
        }}
      >
        <OptionDialog
          visible={unitSwitchVisible}
          title="抓拍模式"
          defaultValue={[unit_switch]}
          options={getOptions('unit_switch')}
          onCancel={() => {
            setUnitSwitch(false);
          }}
          onConfirm={(value) => {
            doControlDeviceData('unit_switch', value[0]);
          }}
        ></OptionDialog>
      </Cell>
    </main>
  );
}
