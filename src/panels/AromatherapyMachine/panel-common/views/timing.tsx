/*
 * @Description: 定时，之后修缮
 */

import React, { useState } from 'react';
import TimerCloud, {
  ITimerDataBind,
  ITimerOptions
} from '@components/business/timerCloud/timer-cloud';
import { DeviceContext } from '../deviceContext';
import { Modal } from '@components/base';
import { List, Radio } from 'antd-mobile';
import IconChecked from '@components/base/icon-checked/icon-checked';
import './timing.less';

export function Timing() {
  const [data, setData] = useState({
    power_switch: 0,
    spray_switch: 0,
    work_mode: 'middle'
  } as ITimerDataBind);

  const [isShowPowerSwitch, setIsShowPowerSwitch] = useState(false);
  const [isShowSpraySwitch, setIsShowSpraySwitch] = useState(false);
  const [isShowWorkMode, setIsShowWorkMode] = useState(false);

  const optionsTimer: ITimerOptions = {
    power_switch: {
      label: '总开关',
      value_enum: ['关', '开']
    },
    spray_switch: {
      label: '喷雾开关',
      value_enum: ['喷雾关闭', '喷雾开启']
    },
    work_mode: {
      label: '工作模式',
      value_enum: {
        large: '大雾量',
        middle: '中雾量',
        small: '小雾量'
      }
    }
  };
  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
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
              prefix={'喷雾开关'}
              extra={optionsTimer.spray_switch.value_enum[data['spray_switch']]}
              onClick={() => {
                setIsShowSpraySwitch(true);
              }}
            />
            <List.Item
              prefix={'工作模式'}
              extra={optionsTimer.work_mode.value_enum[data['work_mode']]}
              onClick={() => {
                setIsShowWorkMode(true);
              }}
            />
          </List>

          {/*开关弹窗*/}
          <Modal
            title={'开关'}
            visible={isShowPowerSwitch}
            onClose={() => {
              setIsShowPowerSwitch(false);
            }}
          >
            <Radio.Group
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
          {/*喷雾弹窗*/}
          <Modal
            title={'喷雾开关'}
            visible={isShowSpraySwitch}
            onClose={() => {
              setIsShowSpraySwitch(false);
            }}
          >
            <Radio.Group
              onChange={(val: any) => {
                setData(Object.assign(data, { spray_switch: val }));
              }}
            >
              <List>
                <List.Item
                  prefix={'喷雾开启'}
                  extra={
                    <Radio
                      value={1}
                      icon={checked => <IconChecked isChecked={checked} />}
                    />
                  }
                />
                <List.Item
                  prefix={'喷雾关闭'}
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
          {/*工作模式弹窗*/}
          <Modal
            title={'工作模式'}
            visible={isShowWorkMode}
            onClose={() => {
              setIsShowWorkMode(false);
            }}
          >
            <Radio.Group
              onChange={(val: any) => {
                setData(Object.assign(data, { work_mode: val }));
              }}
            >
              <List>
                <List.Item
                  prefix={'小雾量'}
                  extra={
                    <Radio
                      value={'small'}
                      icon={checked => <IconChecked isChecked={checked} />}
                    />
                  }
                />
                <List.Item
                  prefix={'中雾量'}
                  extra={
                    <Radio
                      value={'middle'}
                      icon={checked => <IconChecked isChecked={checked} />}
                    />
                  }
                />
                <List.Item
                  prefix={'大雾量'}
                  extra={
                    <Radio
                      value={'large'}
                      icon={checked => <IconChecked isChecked={checked} />}
                    />
                  }
                />
              </List>
            </Radio.Group>
          </Modal>
        </TimerCloud>
      )}
    </DeviceContext.Consumer>
  );
}
