import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import TimerCloud, {
  ITimerDataBind,
  ITimerOptions
} from '@components/business/timerCloud/timer-cloud';
import { List, Radio } from 'antd-mobile';
import { Modal } from '@components/base';
import IconChecked from '@components/base/icon-checked/icon-checked';

const Timer = () => {
  const getSwitchNumData = (powerSwitch ) => {
    const value = 1 * powerSwitch;
    const changeData = { power_switch : value };
    if (sdk.deviceData.timer_dev == 'switch_1'){
      console.log("timer_dev"+sdk.deviceData.timer_dev);
      changeData['switch_1'] = value;
    }else if(sdk.deviceData.timer_dev == 'switch_2'){
      changeData['switch_2'] = value;
      console.log("timer_dev"+sdk.deviceData.timer_dev);
    }

    return changeData;
  };
  const [data, setData] = useState(getSwitchNumData(0) as ITimerDataBind);
  const [isShowPowerSwitch, setIsShowPowerSwitch] = useState(false);

  const optionsTimer: ITimerOptions = {
    power_switch: {
      label: '开关',
      value_enum: ['关', '开']
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
          defaultValue={data.power_switch}
          onChange={(val: any) => {
            setData(Object.assign(data, getSwitchNumData(val)));
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
      {/*<button onClick={handleChange}>change11</button>*/}
    </TimerCloud>
  );
};

Timer.propTypes = {};

export default Timer;
