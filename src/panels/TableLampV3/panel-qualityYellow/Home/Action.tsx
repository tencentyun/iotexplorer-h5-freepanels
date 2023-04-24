import React, { useRef, useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions } from '@utils'
import { CountDown } from '../../Common/CountDown';

const colorList = ['#F9D276', '#FCF0D2', '#FEFFFF', '#BDD0FA'];
const Action = (props) => {
  const {
    templateMap,
    deviceData,
    history: { PATH, push },
    timer: { isExistTimer },
    doControlDeviceData,
    setCountDown
  } = { ...props }
  const { power_switch, working_mode } = deviceData;
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
      push.bind(null, PATH.TIMER_LIST, { isModule: true }),
      isExistTimer,
      ''
    ],
    // [
    //   '补光模式',
    //   'mode',
    //   () => { setModeVisible(true) },
    //   !!power_switch
    // ],
    [
      '倒计时',
      'countdown',
      power_switch && (() => { countRef.current.onOpen(); }),
      !!power_switch
    ],
  ];

  const onChange = (attr, operator) => {
    let value = !deviceData[attr] ? 0 : parseInt(deviceData[attr]);
    let { max, step } = templateMap[attr].define;
    max = !max ? 0 : parseInt(max);
    step = !step ? 0 : parseInt(step);
    if (operator === '+') {
      value = value + step;
    } else {
      value = value - step;
    }
    value = value <= 0 ? 0 : (value >= max ? max : value);
    doControlDeviceData(attr, value);
  }


  return (
    <div className="action-list">
      <div className="mode-btn" onClick={() => { setModeVisible(true) }}>
        <span style={{ marginRight: 8 }}>补光模式</span>
        <span>&gt;</span>
      </div>
      <div className='custom-mask'></div>
      <div className="mode-list">
        {getOptions(templateMap, 'color_mode').map(({ label, value }, index) => (
          <div
            key={index}
            className="mode-item"
            onClick={() => doControlDeviceData('color_mode', parseInt(value))}>
            <div className="item-color" style={{ background: `${colorList[index]}` }}></div>
            <div className="title">{label}</div>
          </div>
        ))}
      </div>
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
      <div className="operator-list">
        <div className="operator-item">
          <div className="title">冷暖调节</div>
          <div className="btn-list">
            <div className="operator-btn" onClick={() => onChange('color_temp', '+')}>
              <Icon name="plus"></Icon>
            </div>
            <div className="operator-btn" onClick={() => onChange('color_temp', '-')}>
              <Icon name="minus"></Icon>
            </div>
          </div>
        </div>
        <div className="operator-item">
          <div className="title">亮度调节</div>
          <div className="btn-list">
            <div className="operator-btn" onClick={() => onChange('brightness', '+')}>
              <Icon name="plus"></Icon>
            </div>
            <div className="operator-btn" onClick={() => onChange('brightness', '-')}>
              <Icon name="minus"></Icon>
            </div>
          </div>
        </div>
      </div>
      <OptionDialog
        visible={modeVisible}
        title="补光模式"
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
    </div>
  );
};

export default Action;
