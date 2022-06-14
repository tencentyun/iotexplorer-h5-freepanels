import React from 'react';
import { Icon } from '@custom/Icon';

const Action = ({
  deviceData: { switch_led },
  history: { PATH, push },
  timer: { isExistTimer },
  doControlDeviceData,
}) => {
  const onSwitchChange = () => {
    doControlDeviceData({ switch_led: switch_led ? 0 : 1 });
  };

  const isSwitchOff = switch_led !== 1;
  const actionCls = isSwitchOff ? 'action-off' : '';

  const actions = [
    [
      '开关',
      switch_led ? 'switch-checked' : 'switch',
      onSwitchChange,
      !!switch_led,
    ],
    [
      '定时',
      isSwitchOff ? 'timing' : 'timing-checked',
      push.bind(null, PATH.TIMER_LIST, { isModule: true }),
      isExistTimer,
    ],
  ];
  return (
    <div className={`action ${actionCls}`}>
      {actions.map(([label, name, onClick, isChecked], index) => (
        <div
          key={name}
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

export default Action;
