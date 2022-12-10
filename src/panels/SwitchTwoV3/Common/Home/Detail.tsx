import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@custom/Icon';
import { TimePicker } from '@custom/TimePicker';
import { Cell } from '@custom/Cell';
import { Modal } from '@custom/Modal';
import { Btn as Button, BtnGroup } from '@custom/Btn';
import { Dropdown } from '@custom/DropDown';
import { DropdownRef } from 'antd-mobile/es/components/dropdown'

export const Detail = ({
  deviceData,
  doControlDeviceData,
  context: { switchNum },
  currentSwitch,
  currentMode,
  history: { PATH, push },
  timerHeight,
  isModal,
  isPopUp
}) => {

  const SWITCH = { OPEN: 1, CLOSE: 0 };
  const getStatusData = status => currentSwitch.filter(([key]) => deviceData[key] !== status);
  const [isChecked, setChecked] = useState(false);
  const isAll = status => !getStatusData(status).length;
  const isAllOpen = isAll(SWITCH.OPEN);
  const isAllClose = isAll(SWITCH.CLOSE);
  const getSwitchData = (status) => {
    const res = {};
    currentSwitch.forEach(([key]) => (res[key] = status));
    return res;
  };
  const initData = currentMode.map(([value, code, text], index) => {
    const obj = {};
    obj.label = deviceData[code] || text;
    obj.code = value;
    obj.value = deviceData[value]?.mode ? 1 : 0;
    return obj;
  });

  const [modeVisible, setModeVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [modeCache, setModeCache] = useState([]);

  // 倒计时
  const [visible, setVisible] = useState(false);

  const isOneSwitch = switchNum === 1;

  const getCountdownTime = () => {
    if (isAllClose) return [];
    let res = [] as string[];
    currentSwitch.forEach(([key]) => {
      if (deviceData[key] === SWITCH.OPEN) {
        const countdownKey = key.replace('switch', 'count_down');
        const time = deviceData[countdownKey];
        if (time) {
          const hour = `${Math.floor(time / 3600)}`;
          const minute = `${Math.floor((time % 3600) / 60)}`;
          res = [hour, minute];
        }
      }
    });
    return res;
  };

  // 开启状态 并且存在倒计时记录
  const countdownTime = getCountdownTime();
  const onClick = () => doControlDeviceData(getSwitchData(SWITCH.OPEN));
  const offClick = () => doControlDeviceData(getSwitchData(SWITCH.CLOSE));

  const submitCountDown = ([hour, minute], isChecked) => {
    setVisible(false);
    setChecked(isChecked);
    const times = hour * 3600 + minute * 60;
    const openSwitch = getStatusData(SWITCH.CLOSE);
    if (!openSwitch.length) return;
    const countDownData = {};
    openSwitch.forEach(([key]) => {
      countDownData[key.replace('switch', 'count_down')] = times;
    });
    doControlDeviceData(countDownData);
  };

  const actions = [
    isOneSwitch
      ? null
      : [
        isAllOpen ? '全开' : '全关',
        'on',
        () => ({}),
        isAllOpen,
        isChecked => (isChecked ? onClick() : offClick()),
      ],
    [
      '转无线开关', '模式', () => { setModeVisible(true) },
    ],
    [
      '定时',
      'timing',
      push.bind(null, PATH.TIMER_LIST, { switchNum, isModule: true }),
    ],
    ['倒计时', 'count-down', setVisible.bind(null, true)],
  ].filter(v => v);

  const onRadioClick = (value) => {
    let data = [...modeCache];
    data[selected].value = value;
    setModeCache(data);
  };

  const modeList = [{
    label: '常规模式',
    value: 0,
  }, {
    label: '转无线开关',
    value: 1,
  }];

  const options = currentMode.map(([value, code, text]) => ({ text: deviceData[code] || text, value }));
  const dropdownRef = useRef<DropdownRef>(null);

  useEffect(() => {
    setModeCache(initData);
  }, [currentMode])

  return (
    <div className={`detail  action action-${switchNum}`}>
      <div className="environment">
        {actions.map(([title, name, onClick, isChecked, onChange], index) => (
          <div className="box" key={index}>
            <div className="content">
              <div className="box-content">
                {/^[\u4e00-\u9fa5]+$/.test(name) ? <div className="title">{name}</div> : <Icon name={name} />}
                {/* <div className="link">
                  <div className="link-title">{title}</div>
                </div> */}
                <Cell
                  title={title}
                  onClick={onClick}
                  ele={onChange ? 'switch' : ''}
                  eleValue={isChecked}
                  onChange={onChange}
                  isLink={!onChange}
                  className="border"
                ></Cell>
              </div>
            </div>
          </div>
        ))}

        <TimePicker
          className="switch-timer-cloud"
          showSemicolon={false}
          value={countdownTime}
          showUnit={true}
          isModal={isModal}
          mask={false}
          showTime={false}
          itemHeight={58}
          isPopUp={isPopUp}
          height={timerHeight ? timerHeight : 175}
          showTwoDigit={true}
          title={`倒计时${isChecked ? '开启' : '关闭'}`}
          switchIsOpen={countdownTime.length ? isChecked : false}
          onCancel={setVisible.bind(null, false)}
          onConfirm={submitCountDown}
          confirmText="确认"
          visible={visible}
        // visible={true}
        />
      </div>

      <div className='custom-modal'>
        <Modal
          visible={modeVisible}
        // title='模式'
        >
          <div className="modal-title">
            <div className="title">模式</div>
            <div className="selector">
              <Dropdown className="custom-dropdown" ref={dropdownRef}>
                <Dropdown.Item key='selector' title={modeCache[selected]?.label} className="dropdown-items">
                  {options.map((item, index) => <div className="item" key={index} onClick={() => {
                    setSelected(index);
                    dropdownRef.current?.close()
                  }}>{item.text}</div>)}
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="custom-radio">
            {modeList.map((item, index) => (
              <label
                className="radio-item"
                htmlFor={`label-${item.value}`}
                key={index}
                onClick={() => {
                  onRadioClick(item.value);
                }}>
                <input
                  className="radio-item-radio"
                  type="radio"
                  id={`label-${item.value}`}
                  name="mode"
                  checked={modeCache[selected]?.value === item.value}
                />
                <span className="radio-item-label">{item.label}</span>
              </label>
            ))}
          </div>

          <div className='modal-footer'>
            <BtnGroup
              layout='flex'
            >
              <Button
                className="btn-cancel"
                onClick={() => {
                  setSelected(0);
                  setModeCache(initData);
                  setModeVisible(false);
                }}
              >
                取消
              </Button>
              <Button
                className="btn-save"
                onClick={() => {
                  let obj = {};
                  modeCache.map(item => {
                    obj[item.code] = { mode: item.value }
                  })
                  doControlDeviceData(obj);
                  setSelected(0);
                  setModeVisible(false);
                }}
              >
                确定
              </Button>

            </BtnGroup>
          </div>

        </Modal>
      </div>
    </div>
  );
};
