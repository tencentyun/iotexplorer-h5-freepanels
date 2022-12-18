import React from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';

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
      '总控开关',
      isSwitchOff ? '关闭' : '开启',
      onSwitchChange,
      !!switch_led,
      'switch'
    ],
    [
      '时间',
      '定时器',
      push.bind(null, PATH.TIMER_COUNTDOWN, { isModule: true }),
      isExistTimer,
      ''
    ],
  ];
  return (
    <div className={`action action-off`}>
      {actions.map(([label, name, onClick, isChecked, ele], index) => (
        <div
          key={name}
          className={`action-item  ${isChecked ? 'checked' : ''} action-item-${
            index + 1
          }`}
          onClick={onClick}
        >
          <div className={`action-ele action-ele-${index}`}>
            <div>{label}</div>
            <Cell title={name} ele={ele} isLink={!ele} eleValue={isChecked} onClick={onClick} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Action;
