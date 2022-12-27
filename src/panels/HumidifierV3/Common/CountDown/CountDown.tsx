
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { useTitle } from '@hooks/useTitle';
import { TimePicker } from '@custom/TimePicker';

export const CountDown = forwardRef((props, ref) => {
  const {
    deviceData,
    doControlDeviceData,
    isJumpRoute = true,
    history: { PATH, push }
  } = props;
  const onChange = (count_down) => {
    doControlDeviceData({ count_down });
    timerRef.current.close();
  };

  const timerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    onOpen: () => {
      timerRef.current.open();
    },
    onClose: () => {
      timerRef.current.close();
    }
  }))

  return (
    <div id="current-time">
      <Timer
        {...props}
        ref={timerRef}
        value={deviceData.count_down}
        onChange={onChange}
      ></Timer>
    </div>
  );
});


const Timer = forwardRef(({ value, onChange, isModal, isPopUp }, ref) => {

  const [visible, setVisible] = useState(false);
  useTitle('倒计时');

  const submitCountDown = ([hour, minute, second = 0]) => {
    setVisible(false);
    const times = hour * 3600 + minute * 60 + 1 * second;
    onChange && onChange(times);
  };

  const getCountdownTime = (value) => {
    if (value) {
      const hour = `${Math.floor(value / 3600)}`;
      const minute = `${Math.floor((value % 3600) / 60)}`;
      const second = `${Math.floor((value % 3600) % 60)}`;
      return [hour, minute];
    }
    return ['00', '00'];
  };


  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    }
  }))

  const countdownTime = getCountdownTime(value).map((v: string) => (parseInt(v, 10) < 10 ? `0${parseInt(v, 10)}` : v));
  return (
    <div className="cus-time-picker">
      <TimePicker
        showSemicolon={false}
        value={countdownTime}
        showUnit={true}
        mask={false}
        showTime={false}
        itemHeight={58}
        height={248}
        isModal={isModal}
        isPopUp={isPopUp}
        showTwoDigit={true}
        title={'倒计时关闭'}
        switchIsOpen={false}
        onCancel={setVisible.bind(null, false)}
        onConfirm={submitCountDown}
        confirmText="确认"
        visible={visible}
        // isSecond={true}
      />
    </div>
  );
});

