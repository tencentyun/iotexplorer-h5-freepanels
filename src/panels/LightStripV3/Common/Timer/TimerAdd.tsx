import React, { useState } from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';
const labelEnum = {
  power_switch: {
    label: '开关',
    value: ['关闭', '开启'],
  },
  colourMode: {
    label:'模式',
    value: {
      0: '彩光',
      1: '白光',
      4: '场景'
    }
  }
};

export const TimerAdd = (props) => {
  const {
    context: { power_switch = 0, colourMode = 1 },
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
          prefix={'模式'}
          extra={labelEnum.colourMode.value[colourMode]}
          onClick={() => {
            setModeVisible(true);
          }}
        />

      </CloudTimerAdd>
      <OptionDialog
        title="模式"
        visible={modeVisible}
        value={[colourMode]}
        onCancel={() => setModeVisible(false)}
        onConfirm={(val) => {
          setContext({colourMode: val})
          // onAllSwitchChange(val?.[0] * 1);
        }}
        options={[
          { label: '白光', value: 1 },
          { label: '彩光', value: 0 },
          { label: '场景', value: 4 },
        ]}
      />
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
    </>
  );
};
