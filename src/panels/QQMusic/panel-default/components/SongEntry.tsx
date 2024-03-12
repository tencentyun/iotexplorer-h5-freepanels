import React, { useContext } from 'react';
import { MusicPlayerContext } from '../context';

import './SongEntry.less';

export function SongEntry({
  title,
  coverUrl,
  artist,
  onClick,
  unplayable,
  hasTryPlay,
  unplayableCode,
  unplayableMsg,
  size = 'default',
  songId,
}: {
  title: string;
  coverUrl: string;
  artist: string;
  onClick?: () => void;
  unplayable?: boolean;
  hasTryPlay?: boolean;
  unplayableCode?: number;
  unplayableMsg?: string;
  size?: 'default' | 'big';
  songId?: number;
}) {
  const { playingSongId } = useContext(MusicPlayerContext);
  const isPlaying = songId === playingSongId;

  const handleClick = () => {
    if (unplayable && !hasTryPlay) {
      window.h5PanelSdk.tips.showError({
        msg: unplayableMsg,
        code: 'SONG_UNPLAYABLE',
        unplayableCode,
      });
      return;
    }

    onClick?.();
  };

  return (
    <div className={`song-entry is-${size} ${isPlaying ? 'is-playing' : ''}`} onClick={handleClick}>
      <div className="song-entry__cover" style={{ backgroundImage: coverUrl ? `url(${coverUrl})` : undefined }}></div>
      <div className="song-entry__text">
        <div className="song-entry__title">{title}</div>
        <div className="song-entry__artist">{artist}</div>
        {!!unplayableCode && (
          <div className="song-entry__msg">
            {hasTryPlay ? '[仅试听]' : ''}
            {unplayableMsg}
          </div>
        )}
      </div>
    </div>
  );
};
