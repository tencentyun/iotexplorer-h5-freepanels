import React from 'react';
import { useTitle } from '@hooks/useTitle';
import { Video, ACTION } from '@custom/Video';
import { Cell } from '@custom/Cell';
import './VideoMonitor.less';

const actions = [ACTION.VOLUME, ACTION.CAPTURE, ACTION.RECORD, ACTION.FULL];

export function VideoMonitor({ history: { push, PATH } }) {
  useTitle('视频监控');
  return (
    <div className="video-monitor">
      <div className="history-video">
        <Video actions={actions} showDateTime={false} />
      </div>
      <div className="action-cell">
        <Cell title="事件回看" className="cell-settings" onClick={() => push(PATH.EVENT_PREVIEW)}></Cell>
        <Cell title="录像回放" className="cell-settings" onClick={() => push(PATH.VIDEO_HISTORY)}></Cell>
      </div>
    </div>
  );
}
