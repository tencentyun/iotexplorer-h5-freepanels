import React, { useRef, useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
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
  const modeList = getOptions(templateMap, 'working_mode');
  const [modeVisible, setModeVisible] = useState(false)
  const [modeValue, setModeValue] = useState();
  useEffect(() => {
    setModeValue(modeList[working_mode - 1 || 0].value)
  }, [working_mode])
  const actions = [
    [
      '',
      '开关',
      onSwitchChange,
      !!power_switch,
      '',
      'switch'
    ],
    [
      '',
      '模式',
      power_switch && (() => { setModeVisible(true) }),
      !!power_switch,
      '',
      'mode'
    ],
    [
      '',
      '定时器',
      power_switch && push.bind(null, PATH.TIMER_LIST, {isModule: true}),
      isExistTimer,
      '',
      'time'
    ],
  ];
  return (
    <>
      <div className={`action action-off`}>
        {actions.map(([label, name, onClick, isChecked, ele, icon], index) => (
          <div
            key={name}
            className={`action-item  ${isChecked ? 'checked' : ''} action-item-${index + 1
              }`}
            onClick={onClick}
          >
            <div className={`action-ele action-ele-${index}`}>
              <div>{label}</div>
              <Cell title={name} ele={ele} prefixIcon={<Icon name={icon} />} isLink={!ele} eleValue={isChecked} onClick={onClick} />
            </div>
          </div>
        ))}
      </div>
      {/* <CountDown ref={countRef} {...props} /> */}
      <OptionDialog
        visible={modeVisible}
        title="模式"
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
