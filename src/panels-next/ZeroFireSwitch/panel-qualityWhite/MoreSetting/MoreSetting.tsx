import React from 'react';
import { List, Picker } from 'antd-mobile';
import './MoreSetting.less';
import { useTitle } from 'ahooks';
import { useSwitchNameMap } from '@src/panels-next/ZeroFireSwitch/hooks/useSwitchNameMap';
import { useDeviceStore } from '@src/panels-next/PanelWrap';
import { useSwitchNum } from '@src/panels-next/ZeroFireSwitch/hooks';

const outageStatusOptions = [
  [
    { label: '关闭', value: 0 },
    { label: '记忆', value: 1 },
  ],
];

const modeSwitchOptions = [
  [
    { label: '开关模式', value: 0 },
    { label: '场景模式', value: 1 },
  ],
];

export function MoreSetting() {
  useTitle('功能设置');
  const { deviceData, controlDeviceData } = useDeviceStore();

  const switchNum = useSwitchNum();
  const { data: switchNameMap = {} } = useSwitchNameMap();

  return (
    <>
      <List header='断电后通电状态'>
        {
          new Array(switchNum).fill('')
            .map((_, index) => {
              const outageStatusProperty = `switch${index + 1}_outage_status`;
              const outageStatusValue = deviceData[outageStatusProperty];
              return (
                <List.Item
                  key={index}
                  extra={outageStatusOptions[0][outageStatusValue]?.label || '-'}
                  clickable
                  onClick={async () => {
                    const res = await Picker.prompt({
                      columns: outageStatusOptions,
                      defaultValue: [outageStatusValue],
                    });
                    const val = res?.[0];
                    if (typeof val === 'number') {
                      controlDeviceData({ [outageStatusProperty]: val });
                    }
                  }}
                >
                  {switchNameMap[`switch_${index + 1}`]}
                </List.Item>
              );
            })
        }
      </List>
      <List header='转无线开关设置'>
        {new Array(switchNum).fill('')
          .map((_, index) => {
            const modeProperty = `mode_switch${index + 1}`;
            const isSceneMode = deviceData[modeProperty] === 1;
            return (
              <List.Item
                extra={modeSwitchOptions[0][deviceData[modeProperty]]?.label || '-'}
                key={index}
                description={isSceneMode && '实体按键不再控制回路通断，仅触发场景'}
                onClick={async () => {
                  const res = await Picker.prompt({
                    columns: modeSwitchOptions,
                    defaultValue: [deviceData[modeProperty]],
                  });
                  const val = res?.[0];
                  if (typeof val === 'number') {
                    controlDeviceData({ [modeProperty]: val });
                  }
                }}
              >
                {switchNameMap[`switch_${index + 1}`]}
              </List.Item>
            );
          })}
      </List>
    </>
  );
}

