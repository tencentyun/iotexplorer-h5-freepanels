import React, { useRef } from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import { CountDown } from '../../Common/CountDown';

const Action = (props) => {
  const {
    deviceData: { switch_led, count_down },
    history: { PATH, push },
    timer: { isExistTimer },
    doControlDeviceData,
  } = { ...props };
  const onSwitchChange = () => {
    doControlDeviceData({ switch_led: switch_led ? 0 : 1 });
  };

  const countRef = useRef(null);

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
      !!count_down ? push.bind(null, PATH.TIMER_COUNTDOWNPAGE, { isModule: true }) : () => { countRef.current.onOpen() },
      isExistTimer,
      ''
    ],
  ];
  return (
    <>
      <div className={`action action-off`}>
        {actions.map(([label, name, onClick, isChecked, ele], index) => (
          <div
            key={name}
            className={`action-item  ${isChecked ? 'checked' : ''} action-item-${index + 1
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
      <CountDown ref={countRef} {...props} />
    </>
  );
};

export default Action;
