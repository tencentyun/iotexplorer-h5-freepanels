import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import { TimePicker } from '@custom/TimePicker';
export const ConfigAction = (props) => {
  const {
    deviceData: {
      light_switch,
      disinfect_switch,
      air_dry_switch,
      drying_switch,
    },
    doControlDeviceData,
  } = props;
  // 倒计时
  const [visible, setVisible] = useState(false);

  // const  countFiled = [
  //   'set_disinfection',
  //   'set_drying',
  //   'set_air_dry'
  // ]

  const countFiled = [
    'disinfect_switch', //  "消毒开关",
    'air_dry_switch', // "风干开关",
    'drying_switch', // 烘干开关
  ];

  // 获取可设置定时的字段
  const getStatusData = () => countFiled
    .filter(key => props.deviceData[key])
    .map(filed => `set_${filed}`.replace('_switch', ''));

  const submitCountDown = ([hour, minute]) => {
    setVisible(false);
    const times = hour * 3600 + minute * 60;
    const fields = getStatusData();
    if (!fields.length) return;
    const data = {};
    fields.forEach((key) => {
      data[key] = times;
    });
    doControlDeviceData(data);
  };

  const getCountdownTime = () => {
    let res = [] as string[];
    // 获取第一个设置有定时的值
    const timeField = getStatusData().filter(key => props.deviceData[key])[0];
    const time = props.deviceData[timeField];
    if (time) {
      const hour = `${Math.floor(+time / 3600)}`;
      const minute = `${Math.floor((+time % 3600) / 60)}`;
      res = [hour, minute];
    }
    return res;
  };

  const countdownTime = getCountdownTime();

  const actions = [
    [
      '灯光',
      'light',
      () => doControlDeviceData({ light_switch: light_switch ? 0 : 1 }),
      light_switch,
    ],
    [
      '消毒',
      'disinfect',
      () => doControlDeviceData({ disinfect_switch: disinfect_switch ? 0 : 1 }),
      disinfect_switch,
    ],
    [
      '风干',
      'dry',
      () => doControlDeviceData({ air_dry_switch: air_dry_switch ? 0 : 1 }),
      air_dry_switch,
    ],
    [
      '烘干',
      'drying',
      () => doControlDeviceData({ drying_switch: drying_switch ? 0 : 1 }),
      drying_switch,
    ],
    ['定时', 'timing', () => setVisible(true), countdownTime.length],
  ];

  return (
    <div className="bottom-action">
      <div className={'config-action'}>
        {actions.map(([label, name, onClick, isChecked], index) => (
          <div
            key={index}
            className={`item v-center  ${isChecked ? 'checked' : ''}`}
          >
            <div
              onClick={onClick}
              className={`action-item  action-item-${index + 1}`}
            >
              <div className={`action-ele action-ele-${index}`}>
                <Icon name={isChecked ? `${name}-checked` : name} />
              </div>
            </div>
            <div>{label}</div>
          </div>
        ))}
      </div>
      <TimePicker
        showSemicolon={false}
        value={countdownTime}
        showUnit={true}
        mask={false}
        showTime={false}
        itemHeight={58}
        height={175}
        showTwoDigit={true}
        title="倒计时"
        onCancel={setVisible.bind(null, false)}
        onConfirm={submitCountDown}
        confirmText="确认"
        visible={visible}
        // visible={true}
      />
    </div>
  );
};
