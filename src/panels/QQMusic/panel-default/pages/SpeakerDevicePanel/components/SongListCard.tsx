import React from 'react';

import './SongListCard.less';

export function SongListCard({
  coverUrl,
  songs,
  onClick,
}: {
  coverUrl: string;
  songs: Array<{ title: string; artist: string; }>;
  onClick?: () => void;  
}) {
  return (
    <div className="song-list-card" onClick={onClick}>
      <div className="song-list-card__cover">
        <div className="song-list-card__cover-img" style={{ backgroundImage: `url(${coverUrl})`}} />
      </div>
      <div className="song-list-card__songs">
        {songs.map((song, index) => (
          <div className="song-list-card__song" key={index}>
            <span className="song-list-card__text-primary song-list-card__text-title">{index + 1}.{' '}{song.title}</span>
            <span className="song-list-card__text-secondary">-</span>
            <span className="song-list-card__text-secondary song-list-card__text-artist">{song.artist}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
