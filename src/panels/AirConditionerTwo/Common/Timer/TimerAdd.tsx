import React, { useState } from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';

const labelEnum = {
  power_switch: {
    label: '开关',
    value: ['关闭', '开启'],
  },
};

export const TimerAdd = (props) => {
  const {
    context: { power_switch = 0 },
    history: { PATH, push },
  } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <CloudTimerAdd labelEnum={labelEnum}  {...props}>
        <List.Item
          prefix={'开关'}
          extra={labelEnum.power_switch.value[power_switch]}
          onClick={() => push(PATH.TIMER_ACTION_SWITCH)}
        />
        <List.Item
          prefix={'总开关'}
          extra={labelEnum.power_switch.value[power_switch]}
          onClick={() => push(PATH.TIMER_ACTION_SWITCH)}
        />
      </CloudTimerAdd>
      <OptionDialog
        title="喂食份数"
        visible={visible}
        // value={[manual_feed]}
        onCancel={() => setVisible(false)}
        // onConfirm={manual_feed => setContext({ manual_feed: manual_feed[0] })}
        options={[
          { label: '1', value: 1 },
          { label: '2', value: 2 },
          { label: '3', value: 3 },
          { label: '4', value: 4 },
          { label: '5', value: 5 },
          { label: '6', value: 6 },
          { label: '7', value: 7 },
          { label: '8', value: 8 },
          { label: '9', value: 9 },
          { label: '10', value: 10 },
          { label: '11', value: 11 },
          { label: '12', value: 12 },
        ]}
      ></OptionDialog>
    </>
  );
};
