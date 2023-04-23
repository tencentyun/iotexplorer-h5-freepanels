import React, { useRef, useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions } from '@utils';
import { CountDown } from '../../Common/CountDown';
const Action = (props) => {
  const {
    templateMap,
    deviceData: { power_switch, working_mode },
    history: { PATH, push },
    timer: { isExistTimer },
    doControlDeviceData,
    setCountDown
  } = { ...props };
  const onSwitchChange = () => {
    doControlDeviceData({ power_switch: power_switch ? 0 : 1 });
  };

  const countRef = useRef(null);

  const modeList = getOptions(templateMap, 'working_mode');
  const [modeVisible, setModeVisible] = useState(false)
  const [modeValue, setModeValue] = useState();
  useEffect(() => {
    setModeValue(modeList[working_mode - 1 || 0].value)
  }, [working_mode])

  const actions = [
    [
      '定时',
      'time',
      power_switch && push.bind(null, PATH.TIMER_LIST, { isModule: true }),
      isExistTimer,
    ],
    [
      '倒计时',
      'countdown',
      power_switch && (() => { countRef.current.onOpen(); }),
      !!power_switch
    ],

    // [
    //   '开关',
    //   'switch',
    //   onSwitchChange,
    //   !!power_switch,
    // ],
    [
      '模式',
      'mode',
      power_switch && (() => { setModeVisible(true) }),
      !!power_switch
    ],


    // [
    //   '定时',
    //   isSwitchOff ? 'timing' : 'timing-checked',
    //   push.bind(null, PATH.TIMER_COUNTDOWN, { isModule: true }),
    //   isExistTimer,
    // ],
  ];

  return (
    <>
      <div className={`action`}>
        {actions.map(([label, name, onClick, isChecked], index) => (
          <div
            key={index}
            className={`action-item  action-item-${index + 1}`}
            onClick={onClick}
          >
            <div className={`action-ele action-ele-${index}`}>
              <Icon name={name} />
              <div>{label}</div>
            </div>
          </div>
        ))}
      </div>
      <OptionDialog
        visible={modeVisible}
        title="补光"
        value={[modeValue]}
        options={modeList}
        onCancel={() => {
          setModeVisible(false);
        }}
        onConfirm={(value) => {
          setModeValue(parseInt(value[0]) - 1);
          doControlDeviceData('working_mode', parseInt(value[0]));
        }}
      ></OptionDialog>
      <CountDown ref={countRef} {...props} onChange={(count_down) => {
        setCountDown && setCountDown(count_down)
      }} />
    </>
  );
};

export default Action;
