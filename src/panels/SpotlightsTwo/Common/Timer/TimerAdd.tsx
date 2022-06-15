import React, { useState } from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';
const labelEnum = {
  switch_led: {
    label: '开关',
    value: ['关闭', '开启'],
  },
};

export const TimerAdd = (props) => {
  const {
    context: { switch_led = 0 },
    setContext,
  } = props;
  const [visible, setVisible] = useState(false);
  const onAllSwitchChange = (powerSwitch) => {
    setContext({ switch_led: powerSwitch });
  };
  return (
    <>
      <CloudTimerAdd labelEnum={labelEnum} {...props}>
        <List.Item
          prefix={'开关'}
          extra={labelEnum.switch_led.value[switch_led]}
          onClick={() => {
            setVisible(true);
          }}
        />
      </CloudTimerAdd>
      <OptionDialog
        title="开关"
        visible={visible}
        value={[switch_led]}
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
