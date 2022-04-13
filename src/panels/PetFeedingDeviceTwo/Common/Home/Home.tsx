import React from 'react';
import { Battery } from '@custom/Battery';
import { Position } from './Position';
import { Action } from './Action';
import { Feed } from './Feed';
export function Home(props) {
  const {
    deviceData: { battery_percentage },
  } = props;
  return (
    <div className="home">
      <div className="header">
        <Battery
          value={battery_percentage || 50}
          isShowPercent={true}
          isShowTip={false}
        />
      </div>
      <div className="panel center">
        <Position {...props}></Position>
      </div>
      {/* TODO 带确认数据来源 */}
      <div className="today-info">
        <div className="v-center">
          <div>
            <span className="num">5</span>
            <span className="tip">份</span>
          </div>
          <div> 今日已喂食</div>
        </div>
        <div className="v-center">
          <div>
            <span className="num">3</span>
            <span className="tip">份</span>
          </div>
          <div> 下次喂食</div>
        </div>
      </div>
      <div className="home-action">
        <Action {...props}></Action>
      </div>
      <div className="feed-panel">
        <Feed {...props}></Feed>
      </div>
    </div>
  );
}
