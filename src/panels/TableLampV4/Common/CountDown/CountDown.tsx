
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { TimePicker } from '@custom/TimePicker';

export const CountDown = forwardRef((props, ref) => {
  const {
    deviceData,
    doControlDeviceData,
    history: { PATH, push }
  } = props;
  const onChange = (count_down) => {
    // 16进制字符串形式下发 
    doControlDeviceData({ count_down: count_down.toString(16)});
    props.onChange && props.onChange(count_down)
    // isJumpRoute && push(PATH.TIMER_COUNTDOWNPAGE, { value: count_down })
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
    <div>
      <Timer
        {...props}
        ref={timerRef}
        _value={deviceData.count_down}
        // value={deviceData.count_down}
        onChange={onChange}
      ></Timer>
    </div>
  );
});


const Timer = forwardRef(({ _value, onChange, isModal, isPopUp }, ref) => {

  const [value] = useState(_value)

  const [visible, setVisible] = useState(false);
  // useTitle('倒计时');

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
        height={175}
        isModal={isModal}
        isPopUp={isPopUp}
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
});

