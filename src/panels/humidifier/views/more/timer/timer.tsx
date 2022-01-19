/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-18 14:00:38
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useState } from 'react';
import TimerCloud, {
  ITimerDataBind,
  ITimerOptions
} from '@/components/business/timerCloud/timer-cloud';
import { List, Radio } from 'antd-mobile';
import { DeviceSateContext } from '@/products/humidifier/deviceStateContext';
import WorkMode, {
  enumWorkMode
} from '@/products/humidifier/views/home/components/tools-bar/work-mode/work-mode';
import { Modal } from '@/components/base';
import IconChecked from '@/components/base/icon-checked/icon-checked';
import './timer.less';

const Timer = () => {
  const [data, setData] = useState({
    work_mode: '',
    power_switch: 0
  } as ITimerDataBind);
  const [isShowWorkMode, setIsShowWorkMode] = useState(false);
  const [tempWorkMode, setTempWorkMode] = useState('');
  const [isShowPowerSwitch, setIsShowPowerSwitch] = useState(false);

  const optionsTimer: ITimerOptions = {
    power_switch: {
      label: '开关',
      value_enum: ['关', '开']
    },
    work_mode: {
      label: '工作模式',
      value_enum: {
        natural_evaporation: '自然蒸发',
        heating_evaporation: '加热蒸发',
        ultrasonic: '超声波蒸发'
      }
    }
  };
  return (
    <DeviceSateContext.Consumer>
      {() => (
        <>
          <TimerCloud dataBind={data} options={optionsTimer}>
            <List>
              <List.Item
                prefix={'开关'}
                extra={
                  optionsTimer.power_switch.value_enum[data['power_switch']]
                }
                onClick={() => {
                  setIsShowPowerSwitch(true);
                }}
              />
              <List.Item
                prefix={'工作模式'}
                extra={enumWorkMode[data['work_mode']]}
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
            {/*工作模样弹窗*/}
            <Modal
              title={'工作模式'}
              visible={isShowWorkMode}
              onClose={() => {
                setIsShowWorkMode(false);
              }}
              onConfirm={() => {
                setIsShowWorkMode(false);
                setData(Object.assign(data, { work_mode: tempWorkMode }));
              }}
            >
              <WorkMode
                onChange={(val: any) => {
                  setTempWorkMode(val);
                }}
              />
            </Modal>
          </TimerCloud>
        </>
      )}
    </DeviceSateContext.Consumer>
  );
};

Timer.propTypes = {};

export default Timer;
