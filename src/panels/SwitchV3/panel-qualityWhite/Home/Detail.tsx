import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { TimePicker } from '@custom/TimePicker';
import { Cell } from '@custom/Cell';
import { Modal } from '@custom/Modal';
import { Btn as Button, BtnGroup } from '@custom/Btn';

export const Detail = ({
  deviceData,
  doControlDeviceData,
  context: { switchNum },
  currentSwitch,
  history: { PATH, push },
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
  // 倒计时
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentName, setCurrentName] = useState('');

  const [modeVisible, setModeVisible] = useState(false);
  const [radioData, setRadioData] = useState(0);

  useEffect(() => {
    setRadioData(!deviceData?.mode_swtch1?.mode ? 0 : 1);
  }, [deviceData?.mode_swtch1?.mode]);

  useEffect(() => {
    setCurrentName(deviceData?.name_button1);
  }, [deviceData?.name_button1]);

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
      '定时',
      'timing',
      push.bind(null, PATH.TIMER_LIST, { switchNum, isModule: true }),
    ],
    ['倒计时', 'count-down', setVisible.bind(null, true)],
  ].filter(v => v);

  const onRadioClick = (value) => {
    setRadioData(value);
  };

  const modeList = [{
    label: '常规模式',
    value: 0,
  }, {
    label: '转无线开关',
    value: 1,
  }];

  return (
    <div className={`detail action action-${switchNum}`}>
      <div className="operator">
        <div className="operator-btn editor" onClick={() => setModalVisible(true)}>
          <Icon className="operator-icon" name="editor" size="large" />
        </div>
        <div className="operator-btn setting"></div>
      </div>
      <div className="environment">
        {actions.map((item, index) => {
          const [title, name, onClick] = [...item];
          return (
            <div className="box" key={index} onClick={onClick}>
              <div className="content">
                <div className="box-content">
                  <Icon name={name} />
                  <Cell
                    title={title}
                    className="border"
                    onClick={onClick}
                  ></Cell>
                </div>
              </div>
            </div>
          );
        })}
        <div className="switch-btn" onClick={() => {
          currentSwitch.forEach((item) => {
            const [key] = [...item];
            !deviceData[key] ? onClick() : offClick();
          });
        }}>
          <Icon name="switch" />
        </div>
        <Cell
          prefixIcon={<Icon name="mode"></Icon>}
          title={'模式选择'}
          subTitle={!deviceData?.mode_swtch1?.mode ? '常规' : '无线'}
          onClick={() => setModeVisible(true)}
          className="modeBtn"
        ></Cell>
      </div>
      <TimePicker
        className="switch-timer-cloud"
        showSemicolon={false}
        value={countdownTime}
        showUnit={true}
        mask={false}
        showTime={false}
        itemHeight={58}
        height={175}
        isModal={isModal}
        isPopUp={isPopUp}
        showTwoDigit={true}
        title={`倒计时${isChecked ? '开启' : '关闭'}`}
        switchIsOpen={countdownTime.length ? isChecked : false}
        onCancel={setVisible.bind(null, false)}
        onConfirm={submitCountDown}
        confirmText="确认"
        visible={visible}
      // visible={true}
      />
      <div className='custom-modal'>
        <Modal
          visible={modalVisible}
          title='修改名称'
        >
          <input
            value={currentName}
            autoFocus
            className='edit-name-modal'
            placeholder='请输入名称'
            onChange={(event) => {
              setCurrentName(event.currentTarget.value);
            }}
          />

          <div className='modal-footer'>
            <BtnGroup
              layout='flex'
            >
              <Button
                className="btn-cancel"
                onClick={() => {
                  setCurrentName(deviceData?.name_button1 || '');
                  setModalVisible(false);
                }}
              >
                取消
              </Button>
              <Button
                className="btn-save"
                onClick={() => {
                  currentName && doControlDeviceData('name_button1', currentName);
                  setModalVisible(false);
                }}
              >
                确定
              </Button>

            </BtnGroup>
          </div>

        </Modal>
      </div>

      <div className='custom-modal'>
        <Modal
          visible={modeVisible}
          title='模式'
        >
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
                  checked={radioData === item.value}
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
                  setRadioData(!deviceData?.mode_swtch1?.mode ? 0 : 1);
                  setModeVisible(false);
                }}
              >
                取消
              </Button>
              <Button
                className="btn-save"
                onClick={() => {
                  doControlDeviceData({ mode_swtch1: { mode: radioData } });
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
