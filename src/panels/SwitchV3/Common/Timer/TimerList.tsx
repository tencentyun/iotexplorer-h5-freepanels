import React from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';
import { t } from '@locales';


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
      label: t('总开关'),
      value: [t('关闭'), t('开启')],
    },
    switch_1: {
      label: deviceData.name_button1 || t('开关一'),
      value: [t('关闭'), t('开启')],
    },
    switch_2: {
      label: deviceData.name_button2 || t('开关二'),
      value: [t('关闭'), t('开启')],
    },
    switch_3: {
      label: deviceData.name_button3 || t('开关三'),
      value: [t('关闭'), t('开启')],
    },
    switch_4: {
      label: deviceData.name_button4 || t('开关四'),
      value: [t('关闭'), t('开启')],
    },
    switch_5: {
      label: deviceData.name_button5 || t('开关五'),
      value: [t('关闭'), t('开启')],
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
