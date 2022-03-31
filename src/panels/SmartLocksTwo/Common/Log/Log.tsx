import React, { useState } from 'react';
import { Tabs } from '@custom/Tabs';
import { LogList } from './LogList';
import { useTitle } from '@hooks/useTitle';
const Tab = Tabs.Tab;

export function Log(props) {
  useTitle('日志');
  const TABS = [
    // TODO 后端接口确认 具体获取方式
    ['ke1', '使用记录'],
    ['ke2', '报警事件']
  ];
  const [activeKey, setActiveKey] = useState(TABS[0][0]);

  return (
    <div className="log">
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        {TABS.map(([key, name]) => (
          <Tab title={name} key={key}>
            <LogList {...props} logType={key} activeKey={activeKey} />
          </Tab>
        ))}
      </Tabs>
      ;
    </div>
  );
}
