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
    label: '模式',
    value: ['离家模式', '循环模式', '入睡', '唤醒'],
  },
};

export const TimerAdd = (props) => {
  const {
    context: { power_switch = 0, mode },
    setContext,
  } = props;
  const [visible, setVisible] = useState(false);
  const [modeVisible, setModeVisible] = useState(false);
  const onAllSwitchChange = (powerSwitch) => {
    setContext({ power_switch: powerSwitch });
  };
  return (
    <>
      <CloudTimerAdd labelEnum={labelEnum} {...props}>
        <List.Item
          prefix={'开关'}
          extra={labelEnum.power_switch.value[power_switch]}
          onClick={() => {
            setVisible(true);
          }}
        />
        <List.Item
          prefix={'工作模式'}
          extra={labelEnum.mode.value[mode]}
          onClick={() => {
            setModeVisible(true);
          }}
        />
      </CloudTimerAdd>
      <OptionDialog
        title="开关"
        visible={visible}
        value={[power_switch]}
        onCancel={() => setVisible(false)}
        onConfirm={(val) => {
          onAllSwitchChange(val?.[0] * 1);
        }}
        options={[
          { label: '开启', value: 1 },
          { label: '关闭', value: 0 },
        ]}
      ></OptionDialog>
      <OptionDialog
        title="工作模式"
        visible={modeVisible}
        value={[mode]}
        onCancel={() => setModeVisible(false)}
        onConfirm={(val) => {
          setContext({ mode: val?.[0] });
        }}
        options={[
          { label: '离家模式', value: 0 },
          { label: '循环模式', value: 1 },
          { label: '入睡', value: 2 },
          { label: '唤醒', value: 3 },
        ]}
      ></OptionDialog>
    </>
  );
};
