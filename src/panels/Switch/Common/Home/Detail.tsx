import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import { TimePicker } from '@custom/TimePicker';

export const Detail = ({
  deviceData,
  doControlDeviceData,
  timer: { isExistTimer },
  context: { switchNum },
  currentSwitch,
  history: { PATH, push }
}) => {
  const SWITCH = { OPEN: 1, CLOSE: 0 };
  const getStatusData = (status) => currentSwitch.filter(([key]) => deviceData[key] !== status);
  const [isChecked, setChecked] = useState(false);
  const isAll = (status) => !getStatusData(status).length;
  const isAllOpen = isAll(SWITCH.OPEN);
  const isAllClose = isAll(SWITCH.CLOSE);
  const getSwitchData = (status) => {
    const res = {};
    currentSwitch.forEach(([key]) => (res[key] = status));
    return res;
  };
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
    isOneSwitch ? null : ['全开', isAllOpen ? 'on' : 'on-checked', onClick, isAllOpen],
    ['定时', isExistTimer ? 'timing-checked' : 'timing', push.bind(null, PATH.TIMER_LIST, { switchNum })],
    isOneSwitch ? null : ['全关', isAllClose ? 'off' : 'off-checked', offClick, isAllClose],
    ['倒计时', countdownTime.length ? 'count-down-checked' : 'count-down', setVisible.bind(null, true)]
  ].filter((v) => v);

  return (
    <div className={`detail  action action-${switchNum}`}>
      <div className="environment">
        {actions.map(([label, name, onClick, isChecked], index) => (
          <div
            key={name}
            onClick={onClick}
            className={`action-item  ${isChecked ? 'checked' : ''} action-item-${index + 1}`}
          >
            <div className={`action-ele action-ele-${index}`}>
              <Icon name={name} />
              <div>{label}</div>
            </div>
          </div>
        ))}

        {isOneSwitch ? null : (
          <>
            <div className="line-v" />
            <div className="line-h" />
          </>
        )}

        <TimePicker
          showSemicolon={false}
          value={countdownTime}
          showUnit={true}
          showTime={false}
          showTwoDigit={false}
          title={`倒计时${isChecked ? '开启' : '关闭'}`}
          switchIsOpen={countdownTime.length ? isChecked : false}
          onCancel={setVisible.bind(null, false)}
          onConfirm={submitCountDown}
          visible={visible}
        />
      </div>
    </div>
  );
};
