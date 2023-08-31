import React from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';


// const getSwitchNumData = (powerSwitch, num) => {
//   const value = 1 * powerSwitch;
//   const changeData = { power_switch: value };
//   for (let i = 0; i < num; i++) {
//     changeData[`switch_${i + 1}`] = value;
//   }
//   return changeData;
// };

// const getSwitchNumData = (powerSwitch, num) => {
//   return { ['power_witch']: 0 };
// };


export const TimerList = (props) => {
  const { deviceData } = props;
  // let switchNum = props.context.switchNum;

  const labelEnum = {
    power_switch: {
      label: '总开关',
      value: ['关闭', '开启'],
    },
    switch_1: {
      label: deviceData.name_button1 || '开关一',
      value: ['关闭', '开启'],
    },
    switch_2: {
      label: deviceData.name_button2 || '开关二',
      value: ['关闭', '开启'],
    },
    switch_3: {
      label: deviceData.name_button3 || '开关三',
      value: ['关闭', '开启'],
    },
    switch_4: {
      label: deviceData.name_button4 || '开关四',
      value: ['关闭', '开启'],
    },
    switch_5: {
      label: deviceData.name_button5 || '开关五',
      value: ['关闭', '开启'],
    },
  };
  // const defaultValue = getSwitchNumData(0, props.context.switchNum);
  return (
    <CloudTimerList
      {...props}
      labelEnum={labelEnum}
      // 初始 总开关 关闭模式
      defaultValue={{ ['power_switch']: 0 }}
    />
  );
};
