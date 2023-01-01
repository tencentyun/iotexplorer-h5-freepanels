import React, { useRef, useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions } from '@utils';

const Action = (props) => {
  const {
    templateMap,
    deviceData: { power_switch, working_mode },
    history: { PATH, push },
    timer: { isExistTimer },
    doControlDeviceData,
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
      '开关',
      'switch',
      onSwitchChange,
      !!power_switch,
    ],
    [
      '补光模式',
      'mode',
      () => { setModeVisible(true) },
      !!power_switch
    ],
    [
      '定时',
      'time',
      push.bind(null, PATH.TIMER_LIST, { isModule: true }),
      isExistTimer,
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
    </>
  );
};

export default Action;
