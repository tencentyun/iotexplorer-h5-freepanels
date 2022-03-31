import React, { useState } from 'react';
import TimerCloud, {
  ITimerDataBind,
  ITimerOptions
} from '@components/business/timerCloud/timer-cloud';
import { List, Radio } from 'antd-mobile';
import { Modal } from '@components/base';
import IconChecked from '@components/base/icon-checked/icon-checked';

const Timer = () => {
  const [data, setData] = useState({ power_switch: 0, mode: '' } as ITimerDataBind);
  const [isShowPowerSwitch, setIsShowPowerSwitch] = useState(false);
  const [isShowMode, setIsShowMode] = useState(false);
  const [selectTheTemperature, theTemperature] = useState(false);
  const [powerSwitchValue, setPowerSwitchValue] = useState(0);

  const optionsTimer: ITimerOptions = {
    power_switch: {
      label: '开关',
      value_enum: ['关', '开']
    },
    mode: {
      label: '模式',
      value_enum: {
        manual: '手动模式',
        smart: '智能模式',
        comfortable: '舒适模式',
        auto: '自动模式',
        eco: 'ECO模式',
        low: '低档模式',
        high: '高档模式',
        middle: '中档模式',
        antifreeze: '防冻模式'
      }
    }
  };
  return (
    <TimerCloud dataBind={data} options={optionsTimer}>
      <List>
        <List.Item
          prefix={'开关'}
          extra={optionsTimer.power_switch.value_enum[data['power_switch']]}
          onClick={() => {
            setIsShowPowerSwitch(true);
          }}
        />
        <List.Item
          prefix={'模式'}
          extra={optionsTimer.mode.value_enum[data['mode']]}
          onClick={() => {
            setIsShowMode(true);
          }}
        />
        {/*<List.Item
          prefix={'温度设置'}
          extra={optionsTimer.mode.value_enum[data['temp_set']]}
          onClick={() => {
            theTemperature(true);
          }}
        />*/}
      </List>
      {/*开关弹窗*/}
      <Modal
        title={'开关'}
        visible={isShowPowerSwitch}
        onClose={() => {
          setIsShowPowerSwitch(false);
        }}
        onConfirm={() => {
          setData(Object.assign(data, { power_switch: powerSwitchValue }));
        }}
      >
        <Radio.Group
          defaultValue={data.power_switch}
          onChange={(val: any) => {
            setPowerSwitchValue(val);
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
      <Modal
        title={'模式'}
        visible={isShowMode}
        onClose={() => {
          setIsShowMode(false);
        }}
      >
        <Radio.Group
          onChange={(val: any) => {
            setData(Object.assign(data, { mode: val }));
          }}
        >
          <List>
            <List.Item
              prefix={'手动模式'}
              extra={
                <Radio
                  value={'manual'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'智能模式'}
              extra={
                <Radio
                  value={'smart'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'舒适模式'}
              extra={
                <Radio
                  value={'comfortable'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'自动模式'}
              extra={
                <Radio
                  value={'auto'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'ECO模式'}
              extra={
                <Radio
                  value={'eco'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'低档模式'}
              extra={
                <Radio
                  value={'low'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'高档模式'}
              extra={
                <Radio
                  value={'high'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'中档模式'}
              extra={
                <Radio
                  value={'middle'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
            <List.Item
              prefix={'防冻模式'}
              extra={
                <Radio
                  value={'antifreeze'}
                  icon={checked => <IconChecked isChecked={checked} />}
                />
              }
            />
          </List>
        </Radio.Group>
      </Modal>
      {/*<Temperature
        isShow={selectTheTemperature}
        onClose={() => {
          theTemperature(false);
        }}
      />*/}
      {/*<button onClick={handleChange}>change11</button>*/}
    </TimerCloud>
  );
};

Timer.propTypes = {};

export default Timer;
