import React, { useState } from 'react';
import TimerCloud, {
  ITimerDataBind,
  ITimerOptions,
} from '@components/business/timerCloud/timer-cloud';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { List, Radio } from 'antd-mobile';
import { Modal } from '@components/base';
import IconChecked from '@components/base/icon-checked/icon-checked';
import Percentage from '../home/home-normal/percentage/percentage';

const Timer = () => {
  const [data, setData] = useState({ power_switch: 0, percent_control: 0 } as ITimerDataBind);
  const [isShowPowerSwitch, setIsShowPowerSwitch] = useState(false);
  const [selectThePercentage, thePercentage] = useState(false);

  const optionsTimer: ITimerOptions = {
    power_switch: {
      label: '开关',
      value_enum: ['关', '开'],
    },
  };

  const beginControlPercent = () => {
    console.log(data);
    thePercentage(true);
  };
  return (
    <TimerCloud dataBind={data} options={optionsTimer}>
      <List>
        <List.Item
          prefix={'开关'}
          extra={optionsTimer.power_switch.value_enum[data.power_switch]}
          onClick={() => {
            setIsShowPowerSwitch(true);
          }}
        />
        <List.Item
          prefix={'百分比控制'}
          extra={data.percent_control}
          onClick={beginControlPercent}
        />
      </List>
      {/* 开关弹窗*/}
      <Modal
        title={'开关'}
        visible={isShowPowerSwitch}
        onClose={() => {
          setIsShowPowerSwitch(false);
        }}
      >
        <Radio.Group
          defaultValue={data.power_switch}
          onChange={(val: any) => {
            setData(Object.assign(data, { power_switch: val }));
          }}
        >
          <List>
            <List.Item
              prefix={'打开'}
              extra={
                <Radio
                  value={1}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'关闭'}
              extra={
                <Radio
                  value={0}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
          </List>
        </Radio.Group>
      </Modal>
      <Percentage
        cur_percent={data.percent_control}
        isShow={selectThePercentage}
        onClose={() => {
          thePercentage(false);
        }}
        onCommit = {(val) => {
          setData(Object.assign(data, { percent_control: val }));
          thePercentage(false);
        }}
      />
      {/* <button onClick={handleChange}>change11</button>*/}
    </TimerCloud>
  );
};

Timer.propTypes = {};

export default Timer;
