import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import { TimePicker } from '@custom/TimePicker';
import { Cell } from '@custom/Cell';
import { Switch } from '@custom/Switch';

export const Detail = ({
  deviceData,
  doControlDeviceData,
  context: { switchNum },
  currentSwitch,
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
      '定时',
      'timing',
      push.bind(null, PATH.TIMER_LIST, { switchNum, isModule: true }),
    ],
    ['倒计时', 'count-down', setVisible.bind(null, true)],
  ].filter(v => v);

  const switchs = [
    ['模式', '常规', !deviceData?.mode_swtch1?.mode, (checked) => { onSwitchChange(checked ? 0 : 1) }],
    ['模式', '转无线开关', !!deviceData?.mode_swtch1?.mode, (checked) => { onSwitchChange(checked ? 1 : 0) }],
  ].filter(v => v);

  const onSwitchChange = (value) => {
    doControlDeviceData({ mode_swtch1: { mode: value } })
  }


  return (
    <div className={`detail  action action-${switchNum}`}>
      <div className="environment">
        {switchs.map(([title, subTitle, checked, onChange], index) => (
          <div className="box" key={index}>
            <div className="content">
              <div className="box-content">
                <div className="title">{title}</div>
                <div className="switch">
                  <div className="switch-title">{subTitle}</div>
                  <Switch className="custom-switch" checked={checked} onChange={onChange}></Switch>
                </div>
              </div>
            </div>
          </div>
        ))}
        {actions.map(([title, name, onClick, isChecked, onChange], index) => (
          <div className="box" key={index}>
            <div className="content">
              <div className="box-content">
                <Icon name={name} />
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

        {/* <div className='theme-qualityBlue'>
          {actions.map(([title, name, onClick, isChecked, onChange], index) => (
            <div className="box" key={index}>
              <div className="content">
                <div className="box-content">
                  <Icon name={name} />
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
          <div className="switch-btn" >
            <Icon name="switch" />
          </div>
        </div> */}

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
          height={timerHeight ? timerHeight:175}
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
    </div>
  );
};
