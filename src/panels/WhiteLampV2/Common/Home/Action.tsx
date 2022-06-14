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

  const actions = [
    ['开关', switch_led ? 'switch-checked' : 'switch', onSwitchChange, !!switch_led],
    ['定时', isExistTimer ? 'timing-checked' : 'timing', push.bind(null, PATH.TIMER_LIST), isExistTimer],
  ];
  return (
    <div className="action">
      {actions.map(([label, name, onClick, isChecked], index) => (
        <div
          key={name}
          onClick={onClick}
          className={`action-item  ${isChecked ? 'checked' : ''} action-item-${index + 1}`}
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
