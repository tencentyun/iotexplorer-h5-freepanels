import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { TimePicker } from '@custom/TimePicker';
import { Cell } from '@custom/Cell';
import { Modal } from '@custom/Modal';
import { Btn as Button, BtnGroup } from '@custom/Btn';
// import { Input } from '@custom/Input';
import { Switch } from '@custom/Switch';

const defaultIconName = {
  editor: 'editor',
  setting: 'setting',
  timing: 'timing',
  ['count-down']: 'count-down',
  mode: 'mode',
};

export const Detail = ({
  currentItem,
  currentIndex,
  deviceData,
  doControlDeviceData,
  context: { switchNum },
  currentSwitch,
  history: { PATH, push },
  goMore,
  isModal,
  isPopUp,
}) => {
  const [switchName, modeName, btnName] = currentItem;
  const [isChecked] = useState(false);
  // 倒计时
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentName, setCurrentName] = useState('');

  const [modeVisible, setModeVisible] = useState(false);
  const [radioData, setRadioData] = useState(0);


  useEffect(() => {
    setCurrentName(deviceData[btnName] || currentSwitch[currentIndex][1]);
    setRadioData(!deviceData[modeName]?.mode ? 0 : 1);
  }, [currentItem]);


  const getCountdownTime = () => {
    let res = [] as string[];
    const time = deviceData[`count_down${currentIndex + 1}`];
    if (time) {
      const hour = `${Math.floor(time / 3600)}`;
      const minute = `${Math.floor((time % 3600) / 60)}`;
      res = [hour, minute];
    }
    return res;
  };

  // 开启状态 并且存在倒计时记录
  const countdownTime = getCountdownTime();

  const submitCountDown = ([hour, minute]) => {
    setVisible(false);
    const times = hour * 3600 + minute * 60;
    doControlDeviceData({ [`count_down${currentIndex + 1}`]: times });
  };

  const actions = [

    [
      '定时',
      'timing',
      push.bind(null, PATH.TIMER_LIST, { switchNum, isModule: true }),
    ],
    ['倒计时', 'count-down', setVisible.bind(null, true)],
    ['模式', 'mode', setModeVisible.bind(null, true)],
    ['设置', 'setting', () => goMore()],
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
    <div className={`detail action action-${1} ${!deviceData[switchName] ? '' : 'on'}`}>
      <div className="switch-total">
        <div className="switch-title"></div>
        <Switch
          className="reverse custom-switch"
          checked={!!deviceData[switchName] || !!deviceData.power_switch}
          onChange={() => doControlDeviceData(switchName, !deviceData[switchName])}
        />
        <div className="operator-btn editor" onClick={() => setModalVisible(true)}>
          <Icon className="operator-icon" name="editor" size="normal" />
        </div>
      </div>
      <div className="operator">
        <div className="operator-content">{`模式：${!deviceData[modeName]?.mode ? '常规' : '无线'}模式`}</div>
      </div>
      <div className="environment">
        {actions.map((item, index) => {
          const [title, name, onClick] = [...item];
          return (
            <div className="box" key={index} onClick={onClick}>
              <div className="content">
                <div className="box-content">
                  <Icon name={defaultIconName[name]} />
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
      <div className='socket-container-modal'>
        <Modal
          visible={modalVisible}
          title='修改名称'
          className="edit-name-modal"
        >
          <input
            value={currentName}
            autoFocus
            className="edit-name-modal-input"
            maxLength={16}
            placeholder='请输入名称'
            onChange={(event) => {
              setCurrentName(event.currentTarget.value);
            }}
          />
          <div className='footer'>
            <Button
              className="btn cancel"
              type="cancel"
              onClick={() => {
                setCurrentName(deviceData[btnName]);
                setModalVisible(false);
              }}
            >
              取消
            </Button>
            <Button

              className="btn save"
              onClick={() => {
                currentName && doControlDeviceData(btnName, currentName);
                setModalVisible(false);
              }}
            >
              保存
            </Button>
          </div>
        </Modal>
      </div >

      <div className="custom-modal">
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
                  setRadioData(!deviceData[modeName]?.mode ? 0 : 1);
                  setModeVisible(false);
                }}
              >
                取消
              </Button>
              <Button
                className="btn-save"
                onClick={() => {
                  const obj = {};
                  obj[modeName] = { mode: radioData };
                  doControlDeviceData(obj);
                  setModeVisible(false);
                }}
              >
                确定
              </Button>

            </BtnGroup>
          </div>
        </Modal>
      </div>
    </div >
  );
};
