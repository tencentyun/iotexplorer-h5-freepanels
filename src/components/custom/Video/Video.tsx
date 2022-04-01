import React, { useState } from 'react';
import { Icon } from '@custom/Icon';
import dayjs from 'dayjs';
import { DatePicker } from '@custom/DatePicker';

// 内置的操作动作
export const ACTION = {
  SPEED: 'speed', // 播放倍
  PLAY: 'play', // 停止播放
  VOICE: 'voice', // 静音
  VOLUME: 'volume', // 音量   // TODO 设计确认
  CAPTURE: 'capture', // 截屏
  RECORD: 'record', // 视频录制
  FULL: 'full', // 全屏
};

export function Video({ actions = Object.entries(ACTION).map(([key, value]) => value), showDateTime = true }) {
  const onActionClick = (actionName) => {
    console.log('onActionClick', actionName);
  };
  const now = new Date();
  const [dateTime, setDateTime] = useState(now);
  const [visible, setVisible] = useState(false);

  return (
    <div className="cus-video">
      <div className="video">视频内容</div>
      <div className="action">
        {actions.map(actionName => (
          <div key={actionName} onClick={onActionClick.bind(null, actionName)}>
            <Icon name={`action-icon action-${actionName}`} />
          </div>
        ))}
      </div>
      {showDateTime ? (
        <div className="content">
          <div className="time-pick">
            <div className="show-date">
              <span>
                <Icon name="action-left" />
              </span>
              <span>{dayjs(dateTime).format('YYYY.MM.DD')}</span>
              <span>
                <Icon name="action-right" />
              </span>
            </div>
            <div className="date" onClick={() => setVisible(true)}>
              <Icon name="action-date" />
            </div>
          </div>
          <div className="time-progress"></div>
        </div>
      ) : null}
      <DatePicker
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onConfirm={setDateTime}
        // max={now}
      />
    </div>
  );
}
