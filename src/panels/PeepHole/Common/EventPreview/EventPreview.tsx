import React, { useState } from 'react';
import { Tabs } from '@custom/Tabs';
import { useTitle } from '@hooks/useTitle';
import { Photos } from './Photos';
import { Videos } from './Videos';
const { Tab } = Tabs;

export function EventPreview(props) {
  useTitle('事件回看');
  const [activeKey, setActiveKey] = useState('photo');
  return (
    <div className="event-preview">
      <Tabs activeKey={activeKey} onChange={setActiveKey}>
        <Tab title="相册" key="photo">
          <Photos {...props} />
        </Tab>
        <Tab title="视频" key="video">
          <Videos {...props} />
        </Tab>
      </Tabs>
    </div>
  );
}
