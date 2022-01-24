/*
 * @Description: 定时，之后修缮
 */

import React, { useState } from 'react';
import TimerCloud, {
  ITimerDataBind,
  ITimerOptions
} from '@components/business/timerCloud/timer-cloud';
import { DeviceSateContext } from '../deviceStateContext';
import { Modal } from '@components/base';
import { List, Radio } from 'antd-mobile';
import IconChecked from '@components/base/icon-checked/icon-checked';
import './timing.less';

export function Timing() {
  const [data, setData] = useState({
    power_switch: 0
  } as ITimerDataBind);

  const [isShowPowerSwitch, setIsShowPowerSwitch] = useState(false);

  const optionsTimer: ITimerOptions = {
    power_switch: {
      label: '总开关',
      value_enum: ['关', '开']
    }
  };
  return (
    <DeviceSateContext.Consumer>
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
        </TimerCloud>
      )}
    </DeviceSateContext.Consumer>
  );
}
