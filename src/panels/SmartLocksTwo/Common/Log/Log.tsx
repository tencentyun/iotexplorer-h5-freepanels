import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import { DatePicker } from '@custom/DatePicker';
import { LogList } from './LogList';
import { useTitle } from '@hooks/useTitle';

const getStartDate = () => {
  const date = new Date();
  date.setHours(0);
  return date;
};

export function Log(props) {
  useTitle('日志');
  const [dateTime, setDateTime] = useState([getStartDate(), new Date()]);
  const [visible, setVisible] = useState(false);

  return (
    <div className="log">
      <LogList
        {...props}
        dateTime={dateTime}
        logType={'event'}
        onSelectLog={() => setVisible(false)}
      />
      <div className="date-pick" onClick={setVisible.bind(null, true)}>
        <Icon name="date" size="large"></Icon>
      </div>

      <DatePicker
        visible={visible}
        value={dateTime[0]}
        showUnit={true}
        mask={false}
        itemHeight={58}
        height={175}
        max={new Date}
        onConfirm={(startDate) => {
          setDateTime([startDate, new Date()]);
          setVisible(false);
        }}
        onCancel={setVisible.bind(null, false)}
      />
    </div>
  );
}
