import React from 'react';
import { ListTimer as CloudTimerList } from '@custom/TimerCloud';
import { t } from '@locales';
const labelEnum = {
  power_switch: {
    label: t('关闭'),
    value: [t('关闭'), t('开启')],
  },
};

const getSwitchNumData = (powerSwitch) => {
  const value = 1 * powerSwitch;
  const changeData = { power_switch: value };
  return changeData;
};

export const TimerList = (props) => {
  const defaultValue = getSwitchNumData(0);
  return (
    <CloudTimerList
      {...props}
      labelEnum={labelEnum}
      defaultValue={defaultValue}
    />
  );
};
