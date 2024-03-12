import React, { useState } from 'react';
import { QQMusicPlayListType } from '../lib/qqMusicTypes';
import { PlayList } from './PlayList';
import './PlayListEntry.less';

export function PlayListEntry({
  type,
  id,
  title,
  coverUrl,
  desc,
  onClick,
}: {
  type: QQMusicPlayListType;
  id: number;
  title: string;
  coverUrl: string;
  desc: string;
  onClick?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="play-list-entry" onClick={() => {
        if (onClick) {
          onClick();
        } else {
          setExpanded(value => !value)
        }
      }}>
        <div className="play-list-entry__cover" style={{ backgroundImage: coverUrl ? `url(${coverUrl})` : undefined }}></div>
        <div className="play-list-entry__text">
          <div className="play-list-entry__title">{title}</div>
          <div className="play-list-entry__desc">{desc}</div>
        </div>
      </div>
      {expanded ? (
        <div className="album-detail">
          <PlayList type={type} id={id} />
        </div>
      ) : null}
    </>
  );
};
