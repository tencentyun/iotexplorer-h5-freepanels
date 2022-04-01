import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { requestTokenApi } from '@src/hooks/useDevice';
import { List } from 'antd-mobile';
import { TimePicker } from '@custom/TimePicker';

export const arrWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const AddTimer = ({
  children,
  isPopup = true,
  history: { PATH, goBack, push },
  setContext,
  context: { Days = [0, 0, 0, 0, 0, 0, 0], TimePoint = '00:00', ...timerData }
}) => {
  const timer = TimePoint.split(':');
  const handleSubmit = async (timer) => {
    const weekStr = Days.join('');
    const weekNew = [...Days];
    // 用户无选择重复周几时，默认当前系统时间的周几
    if (+weekStr === 0) {
      const currWeek = new Date().getDay();
      weekNew[currWeek] = 1;
    }
    // 清空无效报文
    const data = { ...timerData };
    delete data.contextDefaultValue;
    delete data.switchNum;

    const Timer = {
      Data: JSON.stringify(data),
      Days: weekNew.join(''),
      TimePoint: timer.join(':'),
      TimerName: Date.now().toString(),
      Repeat: +weekStr ? 1 : 0
    };
    await requestTokenApi('AppCreateTimer', Timer);
    sdk.tips.showSuccess('定时添加成功');
    setContext({}, false);
    goBack();
  };

  const checkedDays = Days.map((day, index) => (day ? arrWeek[index] : '')).filter((v) => v);
  const checkedDaysLabel = checkedDays.length ? checkedDays.join(' ') : '仅限一次';

  const onClose = () => {
    goBack();
    setContext({}, false);
  };

  return (
    <div className="cus-add-timer">
      <div className="time-picker-body">
        <div className="list-card-timer">
          <List>
            {children}
            <List.Item
              className={`week-repeat ${checkedDays.length > 5 ? 'week-small' : ''}`}
              prefix={'重复'}
              extra={checkedDaysLabel}
              onClick={() => {
                push(PATH.TIMER_ACTION_REPEAT);
              }}
            />
          </List>
        </div>
        {isPopup ? (
          <TimePicker
            showSemicolon={true}
            value={timer}
            mask={false}
            onCancel={onClose}
            onChange={(TimePoint) => setContext({ TimePoint: TimePoint.join(':') })}
            onConfirm={handleSubmit}
            visible={true}
            isPopUp={false}
          />
        ) : (
          <div className="pick-time-view">
            <div className="timer-cloud-picker-header">{timer.join(':')}</div>
            <TimePicker value={timer} onCancel={onClose} onConfirm={handleSubmit} className="timer-cloud-picker" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTimer;
