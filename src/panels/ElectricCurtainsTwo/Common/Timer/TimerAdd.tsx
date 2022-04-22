import React, { useState } from 'react';
import { TimerAdd as CloudTimerAdd } from '@custom/TimerCloud';
import { List } from 'antd-mobile';
import { OptionDialog } from '@custom/OptionDialog';
import { LightBright } from '@custom/LightBright';

export const TimerAdd = (props) => {
  const {
    context: { percent_control = 0, power_switch = 0 },
    setContext,
  } = props;
  const [visible, setVisible] = useState(false);
  const [percentVisible, setPercentVisible] = useState(false);
  const [value, setValue] = useState(percent_control);

  // TODO 目前没有电源开关模型字段
  return (
    <div>
      <CloudTimerAdd {...props}>
        <List.Item
          prefix="电源开关"
          extra={power_switch ? '开启' : '关闭'}
          onClick={() => {
            setVisible(true);
          }}
        />
        <List.Item
          prefix="百分比设置"
          extra={`${percent_control}%`}
          onClick={() => {
            setPercentVisible(true);
          }}
        />
      </CloudTimerAdd>

      <OptionDialog
        title="电源开关"
        visible={visible}
        value={[power_switch]}
        onCancel={() => setVisible(false)}
        onConfirm={power_switch => setContext({ power_switch: power_switch[0] })
        }
        options={[
          { label: '开启', value: 1 },
          { label: '关闭', value: 0 },
        ]}
      />

      <OptionDialog
        title="百分比控制"
        visible={percentVisible}
        onCancel={() => setPercentVisible(false)}
        onConfirm={() => setContext({ percent_control: value })}
        options={[]}
      >
        <div className="timer-process">
          <div className="p-title">百分比{value}%</div>
          <LightBright
            value={value}
            onChange={v => setValue(Math.round(v))}
            isMask={false}
          />
        </div>
      </OptionDialog>
    </div>
  );
};
