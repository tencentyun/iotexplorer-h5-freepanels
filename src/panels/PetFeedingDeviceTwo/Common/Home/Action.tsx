import React from 'react';
import { Icon } from '@custom/Icon';

export const Action = ({
  deviceData: { power_switch },
  history: { PATH, push },
  timer: { isExistTimer },
  doControlDeviceData,
}) => {
  const onSwitchChange = () => {
    doControlDeviceData({ power_switch: power_switch ? 0 : 1 });
  };

  const isSwitchOff = power_switch !== 1;
  const actionCls = isSwitchOff ? 'action-off' : '';

  const actions = [
    [
      '喂食计划',
      isSwitchOff ? 'timing' : 'timing-checked',
      push.bind(null, PATH.TIMER_LIST, { isModule: true }),
      isExistTimer,
    ],
    [
      power_switch ? '关闭' : '开启',
      power_switch ? 'switch-checked' : 'switch',
      onSwitchChange,
      !!power_switch,
    ],
    [
      '设置',
      power_switch ? 'setting-checked' : 'setting',
      () => push(PATH.SETTING),
      !!power_switch,
    ],
  ];

  return (
    <div className={`action ${actionCls}`}>
      {actions.map(([label, name, onClick, isChecked], index) => (
        <div
          key={index}
          onClick={onClick}
          className={`action-item  ${isChecked ? 'checked' : ''} action-item-${
            index + 1
          }`}
        >
          <div className={`action-ele action-ele-${index}`}>
            <Icon name={name} />
            <div>{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
