import React from 'react';
import { useTitle } from '@hooks/useTitle';
import { Video } from '@custom/Video';
import './VideoHistory.less';

// const actions = [ACTION.VOLUME, ACTION.CAPTURE, ACTION.RECORD, ACTION.FULL];

export function VideoHistory() {
  useTitle('录像回放');
  return (
    <div className="video-monitor">
      <div className="history-video">
        <Video />
      </div>
    </div>
  );
}
