import React, { useState } from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';

const labelEnum = {
  power_switch: {
    label: '总开关',
    value: ['关闭', '开启'],
  },
};

export const TimerAdd = (props) => {
  const {
    context: { power_switch = 0, switchNum = 4 },
    setContext,
    // history: { PATH, push }
  } = props;
  const [visible, setVisible] = useState(false);
  const getSwitchNumData = (powerSwitch, num) => {
    const value = 5 * powerSwitch;
    const changeData = { power_switch: powerSwitch };
    for (let i = 0; i < num; i++) {
      changeData[`switch_${i + 1}`] = value;
    }
    return changeData;
  };

  const onAllSwitchChange = (powerSwitch) => {
    const data = getSwitchNumData(1 * powerSwitch, switchNum);
    setContext(data);
  };

  return (
    <>
      <CloudTimerAdd labelEnum={labelEnum} {...props}>
        <List.Item
          prefix={'总开关'}
          extra={labelEnum.power_switch.value[power_switch]}
          onClick={() => {
            // push(PATH.TIMER_ACTION_SWITCH)
            setVisible(true);
          }}
        />
      </CloudTimerAdd>
      <OptionDialog
        title="总开关"
        visible={visible}
        value={[power_switch]}
        onCancel={() => setVisible(false)}
        onConfirm={(val: any) => {
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
