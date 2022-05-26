import React from 'react';
import { TimePickerList } from '@custom/TimePickerList';

export const CountDown = (props) => {
  const { deviceData, doControlDeviceData } = props;
  const onChange = (count_down) => {
    doControlDeviceData({ count_down });
  };

  return (
    <div>
      <TimePickerList
        value={deviceData.count_down}
        onChange={onChange}
        emptyTitle="设置倒计时关灯时间"
      ></TimePickerList>
    </div>
  );
};
