import React, { useState } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}
const formatTime = (time: string | number) => {
  const date = dayjs(Number(time));
  return date.format('YYYY.MM.DD HH:mm');
};
const feedStateLabel: HashMap = {
  standby: '准备中',
  feeding: '喂食中',
  done: '结束',
};
export function Position({
  deviceData: { battery_percentage, feed_state, meet_plan },
}) {
  return (
    <div className="position_card">
      <div className="main-bg center">
        <Circular
          max={330}
          min={30}
          process={true}
          touch={false}
          value={battery_percentage * 30 || 6 * 30}
        >
          <div className="circle-ring">
            <div className="bg">
              <div className="bg-img center">
                <h2 className="device-status">
                  <div className="feed-status">
                    {feed_state ? feedStateLabel[feed_state] : '待机中'}
                  </div>
                  {/* TODO 目前无字段 */}
                  <div className="feed-num">50%</div>
                  <div>余粮剩余</div>
                  <div className="next-feed">下次喂食</div>
                  <div className="next-feed">
                    {meet_plan ? formatTime(meet_plan?.time) : '暂无数据'}
                  </div>
                </h2>
              </div>
            </div>
          </div>
        </Circular>
      </div>
    </div>
  );
}
