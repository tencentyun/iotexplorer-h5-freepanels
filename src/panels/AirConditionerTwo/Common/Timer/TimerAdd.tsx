import React, { useState } from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';

const labelEnum = {
  power_switch: {
    label: '开关',
    value: ['关闭', '开启'],
  },
  mode: {
    label: '开关',
    value: [{
      cold: '制冷',
    }, {
      cold: '制冷',
    }, {
      cold: '制冷',
    }, {
      cold: '制冷',
    }, {
      cold: '制冷',
    }],
  },
};

export const TimerAdd = (props) => {
  const {
    context: { power_switch, mode, temp_set, fan_speed_enum },
    setContext,
  } = props;
  const [visible, setVisible] = useState(false);
  const [modeVisible, setModeVisible] = useState(false);
  const [gearVisible, setGearVisible] = useState(false);

  return (
    <>
      <CloudTimerAdd {...props}>
        <List.Item
          prefix="开关"
          extra={power_switch || ''}
          onClick={() => {
            setVisible(true);
          }}
        />
        <List.Item
          prefix="模式"
          extra={mode || ''}
          onClick={() => {
            setVisible(true);
          }}
        />
        <List.Item
          prefix="温度设置"
          extra={temp_set || 0}
          onClick={() => {
            setVisible(true);
          }}
        />
        <List.Item
          prefix="风速"
          extra={fan_speed_enum || ''}
          onClick={() => {
            setVisible(true);
          }}
        />
      </CloudTimerAdd>
      <OptionDialog
        visible={modeVisible}
        title="模式"
        defaultValue={[mode]}
        options={[]}
        onCancel={() => {
          setModeVisible(false);
        }}
        onConfirm={mode => setContext({ mode: mode[0] })}
      ></OptionDialog>
      <OptionDialog
        visible={gearVisible}
        title="风速"
        defaultValue={[fan_speed_enum]}
        options={[]}
        onCancel={() => {
          setGearVisible(false);
        }}
        onConfirm={fan_speed_enum => setContext({ fan_speed_enum: fan_speed_enum[0] })}
      ></OptionDialog>
    </>
  );
};
