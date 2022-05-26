import React, { useState } from 'react';
import { useTitle } from '@hooks/useTitle';
import { Btn } from '@custom/Btn';
import { TimePicker } from '@custom/TimePicker';
import { Circle } from '@custom/Circle';

export const TimePickerList = ({ value, onChange, emptyTitle }) => {
  const [visible, setVisible] = useState(false);
  useTitle('倒计时');

  const submitCountDown = ([hour, minute, second]) => {
    setVisible(false);
    const times = hour * 3600 + minute * 60 + 1 * second;
    onChange && onChange(times);
  };

  const getCountdownTime = (value) => {
    if (value) {
      const hour = `${Math.floor(value / 3600)}`;
      const minute = `${Math.floor((value % 3600) / 60)}`;
      const second = `${Math.floor((value % 3600) % 60)}`;
      return [hour, minute, second];
    }
    return ['00', '00', '00'];
  };

  const countdownTime = getCountdownTime(value).map((v: string) => (parseInt(v, 10) < 10 ? `0${parseInt(v, 10)}` : v));
  return (
    <div className="cus-time-picker-list">
      {value ? (
        <div className="count-page">
          <div className="count-panel">
            <Circle className="count-circle v-center">
              <div className="count-down-tips" onClick={() => setVisible(true)}>
                <div>
                  <span className="num">{countdownTime[0]}</span>
                  <span>时</span>
                  <span className="num">{countdownTime[1]}</span>
                  <span>分</span>
                  <span className="num">{countdownTime[2]}</span>
                  <span>秒</span>
                </div>
                <div>
                  <span>点击重新设定</span>
                </div>
              </div>
            </Circle>
          </div>
        </div>
      ) : (
        <div className="empty-title">{emptyTitle}</div>
      )}

      <div>
        {value ? (
          <div className="fix-bottom-btn">
            <Btn btnText="关闭定时" type="danger" onClick={() => onChange(0)} />
          </div>
        ) : (
          <div className="fix-bottom-btn">
            <Btn
              btnText="添加"
              type="primary"
              onClick={() => setVisible(true)}
            />
          </div>
        )}
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
        title={'倒计时关闭'}
        switchIsOpen={false}
        onCancel={setVisible.bind(null, false)}
        onConfirm={submitCountDown}
        confirmText="确认"
        visible={visible}
        isSecond={true}
      />
    </div>
  );
};
