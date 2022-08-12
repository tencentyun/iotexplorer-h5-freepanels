import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import { DatePicker } from '@custom/DatePicker';
import { Tabs } from '@custom/Tabs';
import { LogList } from './LogList';
import { useTitle } from '@hooks/useTitle';
const { Tab } = Tabs;

const getStartDate = () => {
  const date = new Date();
  date.setHours(0);
  return date;
};

export function Log(props) {
  useTitle('日志');
  const [dateTime, setDateTime] = useState([getStartDate(), new Date()]);
  const [visible, setVisible] = useState(false);
  const TABS = [
    // TODO 后端接口确认 具体获取方式
    ['action', '使用记录'],
    ['event', '报警事件'],
  ];
  const [activeKey, setActiveKey] = useState(TABS[0][0]);

  return (
    <div className="log">
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {TABS.map(([key, name]) => (
          <Tab title={name} key={key}>
            <LogList {...props} dateTime={dateTime} logType={key} activeKey={activeKey} />
          </Tab>
        ))}
      </Tabs>
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
