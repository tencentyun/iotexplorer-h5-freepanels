import React, { useState } from 'react';
import { Btn } from '@custom/Btn';
import { NumberSlider } from '@custom/NumberSlider';
import { Record } from './Record';

export const Feed = (props) => {
  const {
    deviceData: { power_switch, manual_feed },
    doControlDeviceData,
    tips,
  } = props;
  const [feedNum, setFeedNum] = useState(manual_feed);
  return (
    <div className="feed">
      <div className="feed-speed">
        <span>喂食份数</span>
        <Btn
          type="reverse"
          onClick={() => {
            if (!power_switch) return;
            doControlDeviceData({ manual_feed: feedNum });
            tips.showSuccess('喂食成功');
          }}
        >
          快速喂食
        </Btn>
      </div>
      <NumberSlider className="measure" value={feedNum} onChange={setFeedNum} />
      <Record {...props} />
    </div>
  );
};
