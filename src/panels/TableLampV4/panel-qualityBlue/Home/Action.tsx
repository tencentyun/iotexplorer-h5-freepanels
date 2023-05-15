import React, { useRef, useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions } from '@utils';
import { Cell } from '@custom/Cell';
import { CountDown } from '../../Common/CountDown';

const MODE_LIST = ['关闭', '自拍补光', '无极调光', '美妆补光'];

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
      '开关',
      'switch',
      onSwitchChange,
      !!power_switch,
    ],
    [
      '倒计时',
      'countdown',
      power_switch && (() => { countRef.current.onOpen(); }),
      !!power_switch
    ]
    // [
    //   '定时',
    //   isSwitchOff ? 'timing' : 'timing-checked',
    //   push.bind(null, PATH.TIMER_COUNTDOWN, { isModule: true }),
    //   isExistTimer,
    // ],
  ];

  return (
    <>
      <div className={`action action-off`}>
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
        <Cell
          className="cell-settings mode-btn-settings"
          title="补光模式"
          isLink={true}
          prefixIcon={<Icon name="mode" />}
          onClick={() => { power_switch && setModeVisible(true) }}
          subTitle={MODE_LIST[working_mode - 1 || 0]}
        >
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
        </Cell>
        <CountDown ref={countRef} {...props} onChange={(count_down) => {
          setCountDown && setCountDown(count_down)
        }} />
      </div>
    </>
  );
};

export default Action;
