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
} from '@components/business/timerCloud/timer-cloud';
import { List, Radio } from 'antd-mobile';
import { DeviceSateContext } from '../../deviceStateContext';
import WorkMode, {
  enumWorkMode
} from '../home/components/tools-bar/work-mode/work-mode';
import { Modal } from '@components/base';
import IconChecked from '@components/base/icon-checked/icon-checked';
import Gear, {
  enumGear
} from '../home/components/tools-bar/gear/gear';
import UINumberSlider from '@components/common/number-slider/ui-number-slider';
import './timer.less';

const Timer = () => {
  const [data, setData] = useState({
    work_mode: 'auto',
    power_switch: 0,
    temp_set: 0,
    fan_speed_enum: 'sleep'
  } as ITimerDataBind);
  const [isShowWorkMode, setIsShowWorkMode] = useState(false);
  const [tempWorkMode, setTempWorkMode] = useState('');
  const [isShowPowerSwitch, setIsShowPowerSwitch] = useState(false);
  const [isShowTempSet, setIsShowTempSet] = useState(false);
  const [isFanSpeedEnum, setIsFanSpeedEnum] = useState(false);
  const [powerSwitchValue, setPowerSwitchValue] = useState(0);

  const optionsTimer: ITimerOptions = {
    power_switch: {
      label: '开关',
      value_enum: ['关', '开']
    },
    work_mode: {
      label: '工作模式',
      value_enum: {
        auto: '自动',
        cold: '制冷',
        hot: '制热',
        arefaction: '除湿',
        wind: '送风',
        eco: 'ECO',
        floor_heat: '地暖',
        floor_eat_and_heat: '地暖及制热'
      }
    },
    temp_set: {
      label: '温度设置'
    },
    temp_set_f: {
      label: '温度设置'
    },
    fan_speed_enum: {
      label: '风速',
      value_enum: {
        sleep: '睡眠',
        health: '健康',
        natural: '自然',
        strong: '强力',
        auto: '自动',
        low: '低风',
        middle: '中风',
        high: '高风',
        mute: '静音'
      }
    }
  };
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
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
              <List.Item
                prefix={'温度设置'}
                extra={
                  data[
                    deviceData.temp_unit_convert === 'fahrenheit'
                      ? 'temp_set_f'
                      : 'temp_set'
                  ]
                }
                onClick={() => {
                  setIsShowTempSet(true);
                }}
              />
              <List.Item
                prefix={'风速'}
                extra={enumGear[data['fan_speed_enum']]}
                onClick={() => {
                  setIsFanSpeedEnum(true);
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
                defaultValue={data.work_mode}
                onChange={(val: any) => {
                  setTempWorkMode(val);
                }}
              />
            </Modal>
            <Modal
              title={'温度设置'}
              visible={isShowTempSet}
              onClose={() => {
                setIsShowTempSet(false);
              }}
            >
              <List>
                <List.Item className={'timer-temp-set-slider'}>
                  <UINumberSlider
                    defaultValue={data.temp_set}
                    onAfterChange={(val: any) => {
                      console.log(val);
                      if (deviceData.temp_unit_convert === 'fahrenheit') {
                        setData(Object.assign(data, { temp_set_f: val }));
                      } else {
                        setData(Object.assign(data, { temp_set: val }));
                      }
                    }}
                    min={0}
                    max={
                      deviceData.temp_unit_convert === 'fahrenheit' ? 100 : 50
                    }
                  />
                </List.Item>
              </List>
            </Modal>
            <Modal
              title={'风速'}
              visible={isFanSpeedEnum}
              onClose={() => {
                setIsFanSpeedEnum(false);
              }}
            >
              <Gear
                defaultValue={data.fan_speed_enum}
                onChange={val => {
                  setData(Object.assign(data, { fan_speed_enum: val }));
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
