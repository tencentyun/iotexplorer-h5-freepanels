import React from 'react';
import { Icon } from '@custom/Icon';

const Action = ({
  className,
  deviceData: { power_switch },
  history: { PATH, push },
  timer: { isExistTimer },
}) => {
  const isSwitchOff = power_switch !== 1;
  const actionCls = isSwitchOff ? 'action-off' : '';

  const actions = [
    [
      '定时',
      isSwitchOff ? 'timing' : 'timing-checked',
      push.bind(null, PATH.TIMER_LIST, { isModule: true }),
      isExistTimer,
    ],
  ];
  return (
    <div className={`action ${actionCls} ${className}`}>
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
